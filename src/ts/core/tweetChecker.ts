import { MessageSummary, TweetStatus } from "./messageSummary";
import { CHECKED_DATA_ATTRIBUTE } from "../common/constants";
import { Message } from "./message";
import { Settings } from "../@types/common/settings";
import { TranslationKey } from "../common/translator";
import { TweetReactProps } from "./reactProps/tweetReactProps";

/**
 * Check the tweet.
 */
class TweetChecker {
    private readonly tweet: Element;
    private readonly options: Settings;

    /**
     * Check the tweet.
     * @param tweet element of the tweet
     * @param options settings
     */
    constructor(tweet: Element, options: Settings) {
        this.tweet = tweet;
        this.options = options;
    }

    /**
     * Convert the tweet status to the status data.
     * @param tweetStatus tweet status
     * @returns status data
     */
    private static tweetStatusToStatusData(tweetStatus: TweetStatus): {
        isTweetSearchable: boolean;
        messages: TranslationKey[];
    } {
        const accountStatus = tweetStatus.user.possiblySensitive
            ? "accountIsShadowbannedOrFlaggedAsSensitive"
            : "accountIsNotFlaggedAsSensitive";
        const sensitiveMediaInProfile = tweetStatus.user.sensitiveMediaInProfile
            ? "profileContainsSensitiveMedia"
            : "profileDoesNotContainSensitiveMedia";
        const tweetSensitiveFlag = tweetStatus.tweet.possiblySensitive
            ? "tweetIsFlaggedAsSensitive"
            : "tweetIsNotFlaggedAsSensitive";
        const tweetAgeRestriction =
            tweetStatus.tweet.possiblySensitive && !tweetStatus.tweet.possiblySensitiveEditable
                ? "tweetIsAgeRestricted"
                : "tweetIsNotAgeRestricted";
        const tweetSearchStatus = (() => {
            if (
                (tweetStatus.tweet.possiblySensitive && !tweetStatus.tweet.possiblySensitiveEditable) ||
                tweetStatus.user.possiblySensitive
            ) {
                return "tweetIsNotSearchable";
            }
            return tweetStatus.tweet.possiblySensitive ? "tweetMayNotBeSearchable" : "tweetIsSearchable";
        })();

        const messages = [
            accountStatus,
            sensitiveMediaInProfile,
            tweetSensitiveFlag,
            tweetAgeRestriction,
            tweetSearchStatus
        ] satisfies TranslationKey[];
        const isTweetSearchable = tweetSearchStatus === "tweetIsSearchable";

        return {
            isTweetSearchable,
            messages
        };
    }

    /**
     * Get the menu bar of the tweet.
     * @returns menu bar of the tweet
     */
    private getMenuBar(): Element {
        const menuBar = this.tweet.querySelector("div[role='group'][id]");
        if (!menuBar) throw new Error("Failed to get menu bar of tweet");
        return menuBar;
    }

    /**
     * Get the React props of the tweet.
     * @returns React props of the tweet
     */
    private getTweetStatus(): TweetStatus {
        const tweetReactProps = new TweetReactProps(this.tweet, this.getMenuBar());
        return tweetReactProps.get();
    }

    /**
     * Run the tweet checker.
     */
    // eslint-disable-next-line max-statements
    run() {
        this.tweet.setAttribute(CHECKED_DATA_ATTRIBUTE, "true");

        const menuBar = this.getMenuBar();
        const tweetStatus = this.getTweetStatus();

        if (!tweetStatus.tweet.isTweetByCurrentUser && this.options.enableOnlyForCurrentUsersTweets) return;

        const messageSummary = MessageSummary.fromTweetStatus(tweetStatus);

        const statusData = TweetChecker.tweetStatusToStatusData(tweetStatus);

        const { isTweetSearchable } = statusData;
        if (isTweetSearchable && !this.options.showMessagesInUnproblematicTweets) return;

        const message = new Message(messageSummary);
        message.isAlert = !isTweetSearchable;
        if (this.options.alwaysDetailedView) {
            message.expand();
        }
        message.addDetails(statusData.messages);
        if (this.options.showNotesInMessages) {
            message.addNotes(["falsePositivesAndFalseNegativesOccur", "translatedByAI"]);
        }
        menuBar.insertAdjacentElement("beforebegin", message.getContainer());
    }
}

export { TweetChecker };
