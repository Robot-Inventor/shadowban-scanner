import type { ProfileAnalysisResult, TweetAnalysisResult } from "./propsAnalyzer";
import type { SbsMessageWrapperOptionsForProfiles, SbsMessageWrapperOptionsForTweets } from "./sbsMessageWrapper";
import { getTranslationKeyFromProfileAnalyzer, getTranslationKeyFromTweetAnalyzer } from "./translationKeyProvider";
import type { Settings } from "../../types/common/settings";
import type { Tweet } from "twi-ext";
import { generateShareText } from "./shareTextGenerator";

const generateMessageDataForProfile = (
    analyzer: ProfileAnalysisResult,
    onRenderedCallback: () => void
): SbsMessageWrapperOptionsForProfiles => {
    const translations = getTranslationKeyFromProfileAnalyzer(analyzer);

    return {
        ...translations,
        isAlert: analyzer.user.hasAnyProblem,
        onRenderedCallback,
        type: "profile"
    };
};

const generateMessageDataForTweet = (
    tweet: Tweet,
    analyzer: TweetAnalysisResult,
    onRenderedCallback: () => void,
    options: Settings
    // eslint-disable-next-line max-params
): SbsMessageWrapperOptionsForTweets => {
    const translations = getTranslationKeyFromTweetAnalyzer(analyzer);
    const tweetText = generateShareText(analyzer);

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
};

export { generateMessageDataForProfile, generateMessageDataForTweet };
