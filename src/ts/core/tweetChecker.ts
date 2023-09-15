import { CHECKED_DATA_ATTRIBUTE, NO_PROBLEM_CLASS_NAME } from "../common/constants";
import { MessageElement, MessageElementTweetStatus } from "./messageElement";
import { MessageSummary, TweetStatus, TweetStatusString } from "./messageSummary";
import { Color } from "./color";
import { Settings } from "../@types/common/settings";
import { TweetReactProps } from "./reactProps/tweetReactProps";

class TweetChecker {
    private readonly tweet: Element;
    private readonly options: Settings;

    constructor(tweet: Element, options: Settings) {
        this.tweet = tweet;
        this.options = options;
    }

    private static tweetStatusToStatusData(
        tweetStatus: TweetStatus,
        messageSummary: TweetStatusString
    ): MessageElementTweetStatus {
        /* eslint-disable sort-keys */
        const statusData: MessageElementTweetStatus = {
            type: "tweet",
            summary: messageSummary,
            detail: {
                accountStatus: tweetStatus.user.possiblySensitive
                    ? "accountIsShadowbannedOrFlaggedAsSensitive"
                    : "accountIsNotFlaggedAsSensitive",
                sensitiveMediaInProfile: tweetStatus.user.sensitiveMediaInProfile
                    ? "profileContainsSensitiveMedia"
                    : "profileDoesNotContainSensitiveMedia",
                tweetSensitiveFlag: tweetStatus.tweet.possiblySensitive
                    ? "tweetIsFlaggedAsSensitive"
                    : "tweetIsNotFlaggedAsSensitive",
                tweetAgeRestriction:
                    tweetStatus.tweet.possiblySensitive && !tweetStatus.tweet.possiblySensitiveEditable
                        ? "tweetIsAgeRestricted"
                        : "tweetIsNotAgeRestricted",
                tweetSearchStatus: (() => {
                    if (
                        (tweetStatus.tweet.possiblySensitive && !tweetStatus.tweet.possiblySensitiveEditable) ||
                        tweetStatus.user.possiblySensitive
                    ) {
                        return "tweetIsNotSearchable";
                    }
                    return tweetStatus.tweet.possiblySensitive ? "tweetMayNotBeSearchable" : "tweetIsSearchable";
                })()
            }
            /* eslint-enable sort-keys */
        };
        return statusData;
    }

    private getMenuBar(): Element {
        const menuBar = this.tweet.querySelector("div[role='group'][id]");
        if (!menuBar) throw new Error("Failed to get menu bar of tweet");
        return menuBar;
    }

    private getTweetStatus(): TweetStatus {
        const tweetReactProps = new TweetReactProps(this.tweet, this.getMenuBar());
        return tweetReactProps.get();
    }

    // eslint-disable-next-line max-statements
    run() {
        this.tweet.setAttribute(CHECKED_DATA_ATTRIBUTE, "true");

        const menuBar = this.getMenuBar();
        const tweetStatus = this.getTweetStatus();

        const messageSummary = MessageSummary.fromTweetStatus(tweetStatus);

        const color = Color.textColor;
        const statusData = TweetChecker.tweetStatusToStatusData(tweetStatus, messageSummary);

        const messageElement = new MessageElement(statusData, color, this.options.alwaysDetailedView);

        if (statusData.detail.tweetSearchStatus === "tweetIsSearchable") {
            messageElement.element.classList.add(NO_PROBLEM_CLASS_NAME);

            if (!this.options.showMessagesInUnproblematicTweets) {
                messageElement.element.style.display = "none";
            }
        }

        if (!tweetStatus.tweet.isTweetByCurrentUser && this.options.enableOnlyForCurrentUsersTweets) {
            messageElement.element.style.display = "none";
        }

        menuBar.insertAdjacentElement("beforebegin", messageElement.element);
    }
}

export { TweetChecker };
