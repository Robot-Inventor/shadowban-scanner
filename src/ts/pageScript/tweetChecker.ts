import { Color } from "./color";
import { MessageElement } from "./messageElement";
import { MessageType, TweetStatus } from "./messageType";
import { TweetReactProps } from "./reactProps";
import { CHECKED_DATA_ATTRIBUTE } from "./settings";

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
                possiblySensitive: reactProps.possibly_sensitive,
                possiblySensitiveEditable: reactProps.possibly_sensitive_editable
            },
            user: {
                possiblySensitive: reactProps.user.possibly_sensitive
            }
        };

        const color = new Color().textColor;
        const messageElement = new MessageElement("tweet", color);

        const messageType = new MessageType().fromTweetStatus(tweetStatus);
        messageElement.messageType = messageType;
        if (messageType === "tweetNoProblem") {
            messageElement.element.classList.add("shadowban-scanner-message-no-problem");
        }

        menuBar.insertAdjacentElement("beforebegin", messageElement.element);
    }
}

export { TweetChecker };
