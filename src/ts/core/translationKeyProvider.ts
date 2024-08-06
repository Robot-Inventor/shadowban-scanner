import type { ProfileAnalysisResult, TweetAnalysisResult } from "./propsAnalyzer";
import type { SbsMessageWrapperOptionsForProfiles, SbsMessageWrapperOptionsForTweets } from "./sbsMessageWrapper";
import type { SbsMessageDetails } from "../components/sbsMessage";
import type { TranslationKey } from "../../types/common/translator";

const getTranslationKeyFromProfileAnalyzer = (
    analyzer: ProfileAnalysisResult
): Pick<SbsMessageWrapperOptionsForProfiles, "summary"> => {
    // eslint-disable-next-line no-useless-assignment
    let summary: TranslationKey | null = null;
    if (analyzer.user.shadowbanned) {
        summary = "thisUserIsShadowbanned";
    } else if (analyzer.user.withheldInCountries.length) {
        summary = "accountIsBlockedInSomeCountries";
    } else {
        summary = "thisUserIsNotShadowbanned";
    }

    return {
        summary
    };
};

const summarizeForTweet = (analyzer: TweetAnalysisResult): TranslationKey => {
    const tweetHasProblem =
        analyzer.user.shadowbanned ||
        analyzer.user.sensitiveMediaInProfile ||
        Boolean(analyzer.user.withheldInCountries.length) ||
        analyzer.tweet.possiblySensitive;
    if (!tweetHasProblem) return "tweetNoProblem";

    if (analyzer.user.withheldInCountries.length) return "accountIsBlockedInSomeCountries";

    if (analyzer.user.shadowbanned || analyzer.user.sensitiveMediaInProfile) {
        if (analyzer.tweet.possiblySensitive) {
            return analyzer.tweet.ageRestriction
                ? "accountAndTweetShadowbanned"
                : "accountShadowbannedAndTweetFlaggedAsSensitive";
        }

        return "accountShadowbanned";
    }

    return analyzer.tweet.ageRestriction ? "tweetShadowbanned" : "tweetFlaggedAsSensitive";
};

const formatCountryList = (countries: string[]): string => {
    const userLanguage = navigator.language;
    const listFormatter = new Intl.ListFormat(userLanguage, {
        style: "narrow",
        type: "conjunction"
    });
    const translator = new Intl.DisplayNames([userLanguage], { type: "region" });

    const translatedCountries = countries.map((country) => translator.of(country) || "");
    const formattedText = listFormatter.format(translatedCountries);

    return formattedText;
};

const getAccountDetails = (analyzer: TweetAnalysisResult): SbsMessageDetails => {
    const accountStatus = analyzer.user.shadowbanned
        ? "accountIsShadowbannedOrFlaggedAsSensitive"
        : "accountIsNotFlaggedAsSensitive";

    const sensitiveMediaInProfile = analyzer.user.sensitiveMediaInProfile
        ? "profileContainsSensitiveMedia"
        : "profileDoesNotContainSensitiveMedia";

    const accountWithheldInCountries = analyzer.user.withheldInCountries.length
        ? ({
              messageName: "accountIsWithheldInCountries",
              substitutions: formatCountryList(analyzer.user.withheldInCountries)
          } as const)
        : "accountIsNotWithheldInCountries";

    return [accountStatus, sensitiveMediaInProfile, accountWithheldInCountries];
};

const getTweetDetails = (analyzer: TweetAnalysisResult): SbsMessageDetails => {
    const tweetSensitiveFlag = analyzer.tweet.possiblySensitive
        ? "tweetIsFlaggedAsSensitive"
        : "tweetIsNotFlaggedAsSensitive";
    const tweetAgeRestriction = analyzer.tweet.ageRestriction ? "tweetIsAgeRestricted" : "tweetIsNotAgeRestricted";
    const tweetSearchStatusTable = {
        possiblyUnsearchable: "tweetMayNotBeSearchable",
        searchable: "tweetIsSearchable",
        unsearchable: "tweetIsNotSearchable"
    } as const;
    const tweetSearchStatus = tweetSearchStatusTable[analyzer.tweet.searchability];

    return [tweetSensitiveFlag, tweetAgeRestriction, tweetSearchStatus];
};

const getTranslationKeyFromTweetAnalyzer = (
    analyzer: TweetAnalysisResult
): Pick<SbsMessageWrapperOptionsForTweets, "summary" | "details"> => {
    const summary = summarizeForTweet(analyzer);

    const accountDetails = getAccountDetails(analyzer);
    const tweetDetails = getTweetDetails(analyzer);

    return {
        details: [...accountDetails, ...tweetDetails],
        summary
    };
};

export { getTranslationKeyFromProfileAnalyzer, getTranslationKeyFromTweetAnalyzer };
