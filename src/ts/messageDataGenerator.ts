import { ProfileAnalysisResult, TweetAnalysisResult } from "./core/propsAnalyzer";
import { SbsMessageWrapperOptionsForProfiles, SbsMessageWrapperOptionsForTweets } from "./core/sbsMessageWrapper";
import { Settings } from "./@types/common/settings";
import { ShareTextGenerator } from "./core/shareTextGenerator";
import { TranslationKeyProvider } from "./core/translationKeyProvider";

class MessageDataGenerator {
    public static generateForProfile(
        analyzer: ProfileAnalysisResult,
        onRenderedCallback: () => void
    ): SbsMessageWrapperOptionsForProfiles {
        const translations = TranslationKeyProvider.fromProfileAnalyzer(analyzer);

        return {
            ...translations,
            isAlert: analyzer.user.shadowbanned,
            onRenderedCallback,
            type: "profile"
        };
    }

    public static generateForTweet(
        analyzer: TweetAnalysisResult,
        onRenderedCallback: () => void,
        options: Settings
    ): SbsMessageWrapperOptionsForTweets {
        const translations = TranslationKeyProvider.fromTweetAnalyzer(analyzer);
        const tweetText = ShareTextGenerator.generateShareText(analyzer);
        const { meta } = analyzer;

        return {
            ...translations,
            ...meta,

            isAlert: analyzer.tweet.searchability !== "searchable",
            isExpanded: options.alwaysDetailedView,
            isNoteShown: options.showNotesInMessages,
            isTweetButtonShown: options.showTweetButton,

            notes: ["falsePositivesAndFalseNegativesOccur", "translatedByAI"],
            onRenderedCallback,
            sourceTweet: meta.sourceTweet,
            sourceTweetPermalink: meta.sourceTweetPermalink,
            tweetText,

            type: "tweet"
        };
    }
}

export { MessageDataGenerator };
