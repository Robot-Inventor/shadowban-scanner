import { CHECKED_DATA_ATTRIBUTE } from "../common/constants";
import { PropsAnalyzer } from "./propsAnalyzer";
import { SbsMessageWrapper } from "./sbsMessageWrapper";
import { Settings } from "../@types/common/settings";
import { SharedTextGenerator } from "./sharedTextGenerator";
import { TranslationKeyProvider } from "./translationKeyProvider";
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
    run() {
        this.tweet.setAttribute(CHECKED_DATA_ATTRIBUTE, "true");

        const tweetParser = new TweetParser(this.tweet);
        const tweetReactProps = tweetParser.parse();
        const tweetAnalyzer = PropsAnalyzer.analyzeTweetProps(tweetReactProps);
        const isTweetSearchable = tweetAnalyzer.tweet.searchability === "searchable";

        if (!tweetParser.isTweetByCurrentUser && !this.options.enableForOtherUsersTweets) return;
        if (isTweetSearchable && !this.options.showMessagesInUnproblematicTweets) return;

        const translations = TranslationKeyProvider.fromTweetAnalyzer(tweetAnalyzer);

        const sbsMessageWrapper = new SbsMessageWrapper({
            ...translations,

            isAlert: !isTweetSearchable,
            isExpanded: this.options.alwaysDetailedView,
            isFocalMode: tweetParser.isFocal,
            isNoteShown: this.options.showNotesInMessages,
            isTweetButtonShown: this.options.showTweetButton,

            notes: ["falsePositivesAndFalseNegativesOccur", "translatedByAI"],
            onRenderedCallback: this.onMessageCallback,
            sourceTweet: this.tweet,
            sourceTweetPermalink: tweetAnalyzer.tweet.permalink,
            tweetText: SharedTextGenerator.generateShareText(tweetAnalyzer),

            type: "tweet"
        });

        const analyticsButton = this.tweet.querySelector("[data-testid='analyticsButton']");
        if (analyticsButton) {
            sbsMessageWrapper.insertAdjacentElement(analyticsButton.parentElement as Element, "beforebegin");
            return;
        }

        sbsMessageWrapper.insertAdjacentElement(tweetParser.getMenuBar(), "beforebegin");
    }
}

export { TweetChecker };
