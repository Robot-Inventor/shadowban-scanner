import { CHECKED_DATA_ATTRIBUTE, TRANSLATION_ATTRIBUTE } from "../common/constants";
import { Timeline, Tweet } from "twi-ext";
import { MessageDataGenerator } from "./messageDataGenerator";
import { ProfileParser } from "./parser/profileParser";
import { PropsAnalyzer } from "./propsAnalyzer";
import { SbsMessageWrapper } from "./sbsMessageWrapper";
import { Settings } from "../../types/common/settings";
import { TombstoneParser } from "./parser/tombstoneParser";
import { TweetParser } from "./parser/tweetParser";

/**
 * Core of the extension.
 */
class Core {
    private readonly settings: Settings;
    private readonly onMessageCallback: () => void;

    /**
     * Run the core process.
     * @param settings settings
     * @param onMessageCallback callback function called when the new message is inserted.
     */
    public constructor(settings: Settings, onMessageCallback: () => void) {
        this.settings = settings;
        this.onMessageCallback = onMessageCallback;

        const timeline = new Timeline();
        timeline.onNewTweet((tweet) => {
            this.checkTweet(tweet);
            this.timelineObserverCallback();
        });
    }

    private checkProfile(userName: HTMLElement): void {
        userName.setAttribute(CHECKED_DATA_ATTRIBUTE, "true");

        const isCurrentUsersProfile = Boolean(document.querySelector("[data-testid='editProfileButton']"));
        if (isCurrentUsersProfile && !this.settings.enableForOtherUsersProfiles) return;

        const profileAnalyzer = PropsAnalyzer.analyzeProfileProps(new ProfileParser(userName).parse());
        if (!(profileAnalyzer.user.hasAnyProblem || this.settings.showMessagesInUnproblematicProfiles)) return;

        const messageData = MessageDataGenerator.generateForProfile(profileAnalyzer, this.onMessageCallback);
        const sbsMessageWrapper = new SbsMessageWrapper(messageData);

        const bioOrUserName =
            document.querySelector("[data-testid='UserDescription']") ||
            document.querySelector("[data-testid='UserName']");
        if (!bioOrUserName) throw new Error("Failed to get user description of profile");

        sbsMessageWrapper.insertAdjacentElement(bioOrUserName, "afterend");
    }

    private checkTweet(tweet: Tweet): void {
        const analyzer = PropsAnalyzer.analyzeTweetProps(new TweetParser(tweet));

        if (!tweet.metadata.isPostedByCurrentUser && !this.settings.enableForOtherUsersTweets) return;
        if (!(analyzer.tweet.hasAnyProblem || this.settings.showMessagesInUnproblematicTweets)) return;

        const messageData = MessageDataGenerator.generateForTweet(
            tweet,
            analyzer,
            this.onMessageCallback,
            this.settings
        );
        const sbsMessageWrapper = new SbsMessageWrapper(messageData);

        const landmarkElement =
            tweet.element.querySelector<HTMLElement>("[data-testid='analyticsButton']") ||
            tweet.element.querySelector<HTMLElement>("div[role='group'][id]");

        if (!landmarkElement) throw new Error("Failed to get landmark element of tweet");
        sbsMessageWrapper.insertAdjacentElement(landmarkElement, "beforebegin");
    }

    // eslint-disable-next-line max-statements
    private necromancer(tombstone: HTMLElement): void {
        tombstone.setAttribute(CHECKED_DATA_ATTRIBUTE, "true");

        const tweetId = PropsAnalyzer.analyzeTombstoneProps(new TombstoneParser(tombstone).parse());
        if (!tweetId) return;
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
        this.onMessageCallback();
    }

    /**
     * Callback function of the timeline observer.
     */
    private timelineObserverCallback(): void {
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
                this.necromancer(cellInnerDiv);
            }
        }
    }
}

export { Core };
