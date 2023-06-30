import { Color } from "./color";
import { MessageElement, MessageElementStatus } from "./messageElement";
import { MessageSummary, TweetStatus } from "./messageType";
import { TweetReactProps } from "./reactProps";
import { CHECKED_DATA_ATTRIBUTE, CURRENT_USERS_TWEET_CLASS_NAME } from "../common/settings";

class TweetChecker {
    private readonly tweet: Element;

    constructor(tweet: Element) {
        this.tweet = tweet;
    }

    run() {
        this.tweet.setAttribute(CHECKED_DATA_ATTRIBUTE, "true");
        const menuBar = this.tweet.querySelector("div[role='group'][id]");
        if (!menuBar) throw new Error("Failed to get menu bar of tweet");

        const reactProps = new TweetReactProps(menuBar).get();
        const tweetStatus: TweetStatus = {
            tweet: {
                possiblySensitive: Boolean(reactProps.possibly_sensitive),
                // ref: https://github.com/Robot-Inventor/shadowban-scanner/issues/16
                possiblySensitiveEditable: !(reactProps.possibly_sensitive_editable === false),
                isTweetByCurrentUser: reactProps.user.following === null
            },
            user: {
                possiblySensitive: Boolean(reactProps.user.possibly_sensitive)
            }
        };

        const messageSummary = new MessageSummary().fromTweetStatus(tweetStatus);

        const color = new Color().textColor;
        const statusData: MessageElementStatus = {
            type: "tweet",
            summary: messageSummary,
            detail: {
                accountStatus: tweetStatus.user.possiblySensitive
                    ? "accountIsShadowbanned"
                    : "accountIsNotShadowbanned",
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
                    )
                        return "tweetIsNotSearchable";
                    return tweetStatus.tweet.possiblySensitive ? "tweetMayNotBeSearchable" : "tweetIsSearchable";
                })()
            }
        };

        const messageElement = new MessageElement(statusData, color);

        if (statusData.detail.tweetSearchStatus === "tweetIsSearchable") {
            messageElement.element.classList.add("shadowban-scanner-message-no-problem");
        }

        if (tweetStatus.tweet.isTweetByCurrentUser) {
            messageElement.element.classList.add(CURRENT_USERS_TWEET_CLASS_NAME);
        }

        menuBar.insertAdjacentElement("beforebegin", messageElement.element);
    }
}

export { TweetChecker };
