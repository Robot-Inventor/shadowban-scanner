import { CHECKED_DATA_ATTRIBUTE, TRANSLATION_ATTRIBUTE } from "../common/constants";
import { MessageDataGenerator } from "./messageDataGenerator";
import { ProfileParser } from "./parser/profileParser";
import { PropsAnalyzer } from "./propsAnalyzer";
import { SbsMessageWrapper } from "./sbsMessageWrapper";
import { Settings } from "../@types/common/settings";
import { TombstoneParser } from "./parser/tombstoneParser";
import { TweetParser } from "./parser/tweetParser";
import { asyncQuerySelector } from "async-query";

/**
 * Core of the extension.
 */
class Core {
    private readonly OBSERVER_OPTIONS = {
        childList: true,
        subtree: true
    } as const;

    private readonly settings: Settings;
    private readonly onMessageCallback: () => void;

    /**
     * Run the core process.
     * @param settings settings
     * @param onMessageCallback callback function called when the new message is inserted.
     */
    constructor(settings: Settings, onMessageCallback: () => void) {
        this.settings = settings;
        this.onMessageCallback = onMessageCallback;

        const timelineObserver = new MutationObserver(() => {
            this.timelineObserverCallback();
        });

        // eslint-disable-next-line no-magic-numbers
        void asyncQuerySelector("main", document, 10000).then((main) => {
            if (!main) throw new Error("Failed to get main element");

            timelineObserver.observe(main, this.OBSERVER_OPTIONS);
        });
    }

    private checkProfile(userName: HTMLElement): void {
        userName.setAttribute(CHECKED_DATA_ATTRIBUTE, "true");

        const isCurrentUsersProfile = Boolean(document.querySelector("[data-testid='editProfileButton']"));
        if (isCurrentUsersProfile && !this.settings.enableForOtherUsersProfiles) return;

        const profileAnalyzer = PropsAnalyzer.analyzeProfileProps(new ProfileParser(userName).parse());
        if (!profileAnalyzer.user.shadowbanned && !this.settings.showMessagesInUnproblematicProfiles) return;

        const messageData = MessageDataGenerator.generateForProfile(profileAnalyzer, this.onMessageCallback);
        const sbsMessageWrapper = new SbsMessageWrapper(messageData);

        const bioOrUserName =
            document.querySelector("[data-testid='UserDescription']") ||
            document.querySelector("[data-testid='UserName']");
        if (!bioOrUserName) throw new Error("Failed to get user description of profile");

        sbsMessageWrapper.insertAdjacentElement(bioOrUserName, "afterend");
    }

    // eslint-disable-next-line max-statements
    private checkTweet(tweet: HTMLElement): void {
        tweet.setAttribute(CHECKED_DATA_ATTRIBUTE, "true");

        const analyzer = PropsAnalyzer.analyzeTweetProps(new TweetParser(tweet));

        if (!analyzer.meta.isTweetByCurrentUser && !this.settings.enableForOtherUsersTweets) return;
        if (analyzer.tweet.searchability === "searchable" && !this.settings.showMessagesInUnproblematicTweets) return;

        const messageData = MessageDataGenerator.generateForTweet(analyzer, this.onMessageCallback, this.settings);
        const sbsMessageWrapper = new SbsMessageWrapper(messageData);

        const analyticsButton = tweet.querySelector("[data-testid='analyticsButton']");
        if (analyticsButton) {
            sbsMessageWrapper.insertAdjacentElement(analyticsButton.parentElement as Element, "beforebegin");
            return;
        }

        sbsMessageWrapper.insertAdjacentElement(analyzer.meta.menuBar, "beforebegin");
    }

    // eslint-disable-next-line max-statements
    private static necromancer(tombstone: HTMLElement): void {
        tombstone.setAttribute(CHECKED_DATA_ATTRIBUTE, "true");

        const tweetId = PropsAnalyzer.analyzeTombstoneProps(new TombstoneParser(tombstone).parse());
        const tweetURL = `https://twitter.com/i/status/${tweetId}`;
        const link = document.createElement("a");
        link.href = tweetURL;
        link.target = "_blank";
        link.setAttribute(TRANSLATION_ATTRIBUTE, "viewTweet");
        link.classList.add("shadowban-scanner-tombstone-necromancer");

        const helpLink = tombstone.querySelector("a");
        if (!helpLink) throw new Error("Failed to get help link");

        link.style.color = getComputedStyle(helpLink).color;
        helpLink.insertAdjacentElement("afterend", link);
    }

    /**
     * Callback function of the timeline observer.
     */
    // eslint-disable-next-line max-statements
    private timelineObserverCallback(): void {
        const tweets = document.querySelectorAll<HTMLElement>(`[data-testid="tweet"]:not([${CHECKED_DATA_ATTRIBUTE}])`);
        for (const tweet of tweets) {
            this.checkTweet(tweet);
        }

        const userName = document.querySelector<HTMLElement>(
            `:not([data-testid="tweet"]) [data-testid="UserName"]:not([${CHECKED_DATA_ATTRIBUTE}])`
        );
        if (userName) {
            this.checkProfile(userName);
        }

        const cellInnerDivs = document.querySelectorAll<HTMLElement>(
            `[data-testid='cellInnerDiv']:not([${CHECKED_DATA_ATTRIBUTE}])`
        );
        for (const cellInnerDiv of cellInnerDivs) {
            cellInnerDiv.setAttribute(CHECKED_DATA_ATTRIBUTE, "true");
            const isTombstone = Boolean(
                cellInnerDiv.querySelector("a[href='https://help.twitter.com/rules-and-policies/notices-on-twitter']")
            );
            if (isTombstone) {
                Core.necromancer(cellInnerDiv);
            }
        }
    }
}

export { Core };
