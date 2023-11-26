import { PropsAnalyzer, TweetAnalysisResult } from "./propsAnalyzer";
import { CHECKED_DATA_ATTRIBUTE } from "../common/constants";
import { MessageSummary } from "./messageSummary";
import { SbsMessageDetails } from "../components/sbsMessage";
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
     * Generate text to share the result.
     * @param analyzer tweet status
     * @returns generated share text
     */
    private static generateShareText(analyzer: TweetAnalysisResult) {
        const isTweetSearchable = analyzer.tweet.searchability === "searchable";

        const accountSensitiveFlag = analyzer.user.shadowbanned
            ? "🚫Account is flagged as sensitive or shadowbanned"
            : "✅No sensitive flag on account";
        const profileSensitiveFlag = analyzer.user.sensitiveMediaInProfile
            ? "🚫Sensitive flag on profile media"
            : "✅No sensitive flag on profile media";
        const withheldInCountries = analyzer.user.withheldInCountries.length
            ? `🚫Account is blocked in some countries`
            : "✅Account is not blocked in any countries";
        const tweetSensitiveFlag = analyzer.tweet.possiblySensitive
            ? "🚫Sensitive flag on tweet"
            : "✅No sensitive flag on tweet";
        const tweetAgeRestriction = analyzer.tweet.ageRestriction ? "🚫Age limit on tweet" : "✅No age limit on tweet";
        const tweetSearchStatus = isTweetSearchable
            ? "✅Tweet will appear in search results"
            : "🚫Tweet may not appear in search results";
        const siteURL =
            navigator.language === "ja"
                ? "https://robot-inventor.github.io/shadowban-scanner/"
                : "https://robot-inventor.github.io/shadowban-scanner/en/";

        return `
${accountSensitiveFlag}
${profileSensitiveFlag}
${withheldInCountries}
${tweetSensitiveFlag}
${tweetAgeRestriction}
${tweetSearchStatus}

Shadowban Scanner by ろぼいん
${siteURL}
        `.trim();
    }

    /**
     * Format the country list into user's language and style.
     * @param countries country codes
     * @returns formatted country list
     */
    private static formatCountryList(countries: string[]) {
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

    private static convertAccountDataToTranslationKey(analyzer: TweetAnalysisResult): SbsMessageDetails {
        const accountStatus = analyzer.user.shadowbanned
            ? "accountIsShadowbannedOrFlaggedAsSensitive"
            : "accountIsNotFlaggedAsSensitive";

        const sensitiveMediaInProfile = analyzer.user.sensitiveMediaInProfile
            ? "profileContainsSensitiveMedia"
            : "profileDoesNotContainSensitiveMedia";

        const accountWithheldInCountries = analyzer.user.withheldInCountries.length
            ? ({
                  messageName: "accountIsWithheldInCountries",
                  substitutions: TweetChecker.formatCountryList(analyzer.user.withheldInCountries)
              } as const)
            : "accountIsNotWithheldInCountries";

        return [accountStatus, sensitiveMediaInProfile, accountWithheldInCountries];
    }

    private static convertTweetDataToTranslationKey(analyzer: TweetAnalysisResult): SbsMessageDetails {
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

        const messageSummary = MessageSummary.fromTweetStatus(tweetAnalyzer);

        const accountTranslations = TweetChecker.convertAccountDataToTranslationKey(tweetAnalyzer);
        const tweetTranslations = TweetChecker.convertTweetDataToTranslationKey(tweetAnalyzer);

        const sbsMessageWrapper = new SbsMessageWrapper({
            details: [...accountTranslations, ...tweetTranslations],

            isAlert: !isTweetSearchable,
            isExpanded: this.options.alwaysDetailedView,
            isFocalMode: tweetParser.isFocal,
            isNoteShown: this.options.showNotesInMessages,
            isTweetButtonShown: this.options.showTweetButton,

            notes: ["falsePositivesAndFalseNegativesOccur", "translatedByAI"],
            onRenderedCallback: this.onMessageCallback,
            sourceTweet: this.tweet,
            sourceTweetPermalink: tweetAnalyzer.tweet.permalink,
            summary: messageSummary,
            tweetText: TweetChecker.generateShareText(tweetAnalyzer),

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
