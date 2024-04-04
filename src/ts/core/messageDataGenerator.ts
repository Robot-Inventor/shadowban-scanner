import { ProfileAnalysisResult, TweetAnalysisResult } from "./propsAnalyzer";
import { SbsMessageWrapperOptionsForProfiles, SbsMessageWrapperOptionsForTweets } from "./sbsMessageWrapper";
import { Settings } from "../../types/common/settings";
import { ShareTextGenerator } from "./shareTextGenerator";
import { TranslationKeyProvider } from "./translationKeyProvider";

class MessageDataGenerator {
    public static generateForProfile(
        analyzer: ProfileAnalysisResult,
        onRenderedCallback: () => void
    ): SbsMessageWrapperOptionsForProfiles {
        const translations = TranslationKeyProvider.fromProfileAnalyzer(analyzer);

        return {
            ...translations,
            // eslint-disable-next-line no-magic-numbers
            isAlert: analyzer.user.shadowbanned || analyzer.user.withheldInCountries.length > 0,
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
