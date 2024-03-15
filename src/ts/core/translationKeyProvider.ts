import { ProfileAnalysisResult, TweetAnalysisResult } from "./propsAnalyzer";
import { SbsMessageWrapperOptionsForProfiles, SbsMessageWrapperOptionsForTweets } from "./sbsMessageWrapper";
import { SbsMessageDetails } from "../components/sbsMessage";
import type { TranslationKey } from "../@types/common/translator";

class TranslationKeyProvider {
    public static fromProfileAnalyzer(
        analyzer: ProfileAnalysisResult
    ): Pick<SbsMessageWrapperOptionsForProfiles, "summary"> {
        const summary = analyzer.user.shadowbanned ? "thisUserIsShadowbanned" : "thisUserIsNotShadowbanned";

        return {
            summary
        };
    }

    /**
     * Get the message summary from the tweet analysis result.
     * @param analyzer tweet analysis result
     * @returns message summary
     */
    private static summarizeForTweet(analyzer: TweetAnalysisResult): TranslationKey {
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
    }

    /**
     * Format the country list into user's language and style.
     * @param countries country codes
     * @returns formatted country list
     */
    private static formatCountryList(countries: string[]): string {
        const userLanguage = navigator.language;
        const listFormatter = new Intl.ListFormat(userLanguage, {
            style: "narrow",
            type: "conjunction"
        });
        const translator = new Intl.DisplayNames([userLanguage], { type: "region" });

        const translatedCountries = countries.map((country) => translator.of(country) || "");
        const formattedText = listFormatter.format(translatedCountries);

        return formattedText;
    }

    /**
     * Get the account details from the tweet analysis result.
     * @param analyzer tweet analysis result
     * @returns account details
     */
    private static getAccountDetails(analyzer: TweetAnalysisResult): SbsMessageDetails {
        const accountStatus = analyzer.user.shadowbanned
            ? "accountIsShadowbannedOrFlaggedAsSensitive"
            : "accountIsNotFlaggedAsSensitive";

        const sensitiveMediaInProfile = analyzer.user.sensitiveMediaInProfile
            ? "profileContainsSensitiveMedia"
            : "profileDoesNotContainSensitiveMedia";

        const accountWithheldInCountries = analyzer.user.withheldInCountries.length
            ? ({
                  messageName: "accountIsWithheldInCountries",
                  substitutions: TranslationKeyProvider.formatCountryList(analyzer.user.withheldInCountries)
              } as const)
            : "accountIsNotWithheldInCountries";

        return [accountStatus, sensitiveMediaInProfile, accountWithheldInCountries];
    }

    private static getTweetDetails(analyzer: TweetAnalysisResult): SbsMessageDetails {
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
    }

    public static fromTweetAnalyzer(
        analyzer: TweetAnalysisResult
    ): Pick<SbsMessageWrapperOptionsForTweets, "summary" | "details"> {
        const summary = TranslationKeyProvider.summarizeForTweet(analyzer);

        const accountDetails = TranslationKeyProvider.getAccountDetails(analyzer);
        const tweetDetails = TranslationKeyProvider.getTweetDetails(analyzer);

        return {
            details: [...accountDetails, ...tweetDetails],
            summary
        };
    }
}

export { TranslationKeyProvider };
