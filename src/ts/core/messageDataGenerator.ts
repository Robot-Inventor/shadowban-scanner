import { ProfileAnalysisResult, TweetAnalysisResult } from "./propsAnalyzer";
import { SbsMessageWrapperOptionsForProfiles, SbsMessageWrapperOptionsForTweets } from "./sbsMessageWrapper";
import { Settings } from "../../types/common/settings";
import { ShareTextGenerator } from "./shareTextGenerator";
import { TranslationKeyProvider } from "./translationKeyProvider";
import type { Tweet } from "twi-ext";

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
class MessageDataGenerator {
    public static generateForProfile(
        analyzer: ProfileAnalysisResult,
        onRenderedCallback: () => void
    ): SbsMessageWrapperOptionsForProfiles {
        const translations = TranslationKeyProvider.fromProfileAnalyzer(analyzer);

        return {
            ...translations,
            isAlert: analyzer.user.hasAnyProblem,
            onRenderedCallback,
            type: "profile"
        };
    }

    // eslint-disable-next-line max-params
    public static generateForTweet(
        tweet: Tweet,
        analyzer: TweetAnalysisResult,
        onRenderedCallback: () => void,
        options: Settings
    ): SbsMessageWrapperOptionsForTweets {
        const translations = TranslationKeyProvider.fromTweetAnalyzer(analyzer);
        const tweetText = ShareTextGenerator.generateShareText(analyzer);

        return {
            ...translations,

            isAlert: analyzer.tweet.hasAnyProblem,
            isExpanded: options.alwaysDetailedView,
            isNoteShown: options.showNotesInMessages,
            isTweetButtonShown: options.showTweetButton,

            notes: ["falsePositivesAndFalseNegativesOccur", "translatedByAI"],
            onRenderedCallback,
            tweet,
            tweetText,

            type: "tweet"
        };
    }
}

export { MessageDataGenerator };
