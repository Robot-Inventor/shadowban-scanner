import { CHECKED_DATA_ATTRIBUTE, TRANSLATION_ATTRIBUTE } from "../common/constants";
import { type Profile, Timeline, type Tweet, getColorScheme } from "twi-ext";
import { analyzeProfileProps, analyzeTombstoneProps, analyzeTweetProps } from "./propsAnalyzer";
import { generateMessageDataForProfile, generateMessageDataForTweet } from "./messageDataGenerator";
import { SbsMessageWrapper } from "./sbsMessageWrapper";
import type { Settings } from "../../types/common/settings";
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
        timeline.onNewProfile((profile) => {
            this.checkProfile(profile);
        });

        const colorScheme = getColorScheme() === "light" ? "light" : "dark";
        document.body.setAttribute("data-color-scheme", colorScheme);
    }

    private checkProfile(profile: Profile): void {
        const isCurrentUsersProfile = Boolean(document.querySelector("[data-testid='editProfileButton']"));
        if (isCurrentUsersProfile && !this.settings.enableForOtherUsersProfiles) return;

        const profileAnalyzer = analyzeProfileProps(profile.props);
        if (!(profileAnalyzer.user.hasAnyProblem || this.settings.showMessagesInUnproblematicProfiles)) return;

        const messageData = generateMessageDataForProfile(profileAnalyzer, this.onMessageCallback, this.settings);
        const sbsMessageWrapper = new SbsMessageWrapper(messageData);

        const bioOrUserName =
            document.querySelector("[data-testid='UserDescription']") ??
            document.querySelector("[data-testid='UserName']");
        if (!bioOrUserName) throw new Error("Failed to get user description of profile");

        sbsMessageWrapper.insertAdjacentElement(bioOrUserName, "afterend");
    }

    // eslint-disable-next-line max-statements
    private checkTweet(tweet: Tweet): void {
        const analyzer = analyzeTweetProps(new TweetParser(tweet));

        if (!tweet.metadata.isPostedByCurrentUser && !this.settings.enableForOtherUsersTweets) return;
        if (!(analyzer.tweet.hasAnyProblem || this.settings.showMessagesInUnproblematicTweets)) return;

        if (!tweet.metadata.isFocalMode && this.settings.enableCompactMode) {
            tweet.element.dataset.sbCompactMode = analyzer.tweet.hasAnyProblem ? "red" : "green";
            return;
        }

        const messageData = generateMessageDataForTweet(tweet, analyzer, this.onMessageCallback, this.settings);
        const sbsMessageWrapper = new SbsMessageWrapper(messageData);

        const landmarkElement =
            tweet.element.querySelector<HTMLElement>("[data-testid='analyticsButton']")?.parentElement ??
            tweet.element.querySelector<HTMLElement>("div[role='group'][id]");

        if (!landmarkElement) throw new Error("Failed to get landmark element of tweet");
        sbsMessageWrapper.insertAdjacentElement(landmarkElement, "beforebegin");
    }

    // eslint-disable-next-line max-statements
    private necromancer(tombstone: HTMLElement): void {
        tombstone.setAttribute(CHECKED_DATA_ATTRIBUTE, "true");

        const tweetId = analyzeTombstoneProps(new TombstoneParser(tombstone).parse());
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
