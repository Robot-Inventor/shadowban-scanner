import { CHECKED_DATA_ATTRIBUTE } from "../common/constants";
import { MessageDataGenerator } from "../messageDataGenerator";
import { PropsAnalyzer } from "./propsAnalyzer";
import { SbsMessageWrapper } from "./sbsMessageWrapper";
import { Settings } from "../@types/common/settings";
import { TweetParser } from "./parser/tweetParser";

/**
 * Check the tweet.
 */
class TweetChecker {
    private readonly tweet: HTMLElement;
    private readonly options: Settings;
    private readonly onMessageCallback: () => void;

    /**
     * Check the tweet.
     * @param tweet element of the tweet
     * @param options settings
     */
    constructor(tweet: HTMLElement, options: Settings, onMessageCallback: () => void) {
        this.tweet = tweet;
        this.options = options;
        this.onMessageCallback = onMessageCallback;
    }

    /**
     * Run the tweet checker.
     */
    // eslint-disable-next-line max-statements
    run(): void {
        this.tweet.setAttribute(CHECKED_DATA_ATTRIBUTE, "true");

        const parser = new TweetParser(this.tweet);
        const analyzer = PropsAnalyzer.analyzeTweetProps(parser);
        const isTweetSearchable = analyzer.tweet.searchability === "searchable";

        if (!analyzer.meta.isTweetByCurrentUser && !this.options.enableForOtherUsersTweets) return;
        if (isTweetSearchable && !this.options.showMessagesInUnproblematicTweets) return;

        const messageData = MessageDataGenerator.generateForTweet(analyzer, this.onMessageCallback, this.options);
        const sbsMessageWrapper = new SbsMessageWrapper(messageData);

        const analyticsButton = this.tweet.querySelector("[data-testid='analyticsButton']");
        if (analyticsButton) {
            sbsMessageWrapper.insertAdjacentElement(analyticsButton.parentElement as Element, "beforebegin");
            return;
        }

        sbsMessageWrapper.insertAdjacentElement(analyzer.meta.menuBar, "beforebegin");
    }
}

export { TweetChecker };
