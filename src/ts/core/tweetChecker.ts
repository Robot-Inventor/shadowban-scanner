import { MessageSummary, TweetStatus } from "./messageSummary";
import { CHECKED_DATA_ATTRIBUTE } from "../common/constants";
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
     * Returns whether the tweet is age restricted.
     * @param tweetStatus tweet status
     * @returns whether the tweet is age restricted
     */
    private static getTweetAgeRestriction(tweetStatus: TweetStatus) {
        return tweetStatus.tweet.possiblySensitive && !tweetStatus.tweet.possiblySensitiveEditable;
    }

    /**
     * Generate text to share the result.
     * @param tweetStatus tweet status
     * @returns generated share text
     */
    private static generateShareText(tweetStatus: TweetStatus) {
        const isTweetSearchable = TweetChecker.checkTweetSearchability(tweetStatus);
        const isTweetAgeRestricted = TweetChecker.getTweetAgeRestriction(tweetStatus);

        const accountSensitiveFlag = tweetStatus.user.possiblySensitive
            ? "🚫Account is flagged as sensitive or shadowbanned"
            : "✅No sensitive flag on account";
        const profileSensitiveFlag = tweetStatus.user.sensitiveMediaInProfile
            ? "🚫Sensitive flag on profile media"
            : "✅No sensitive flag on profile media";
        const withheldInCountries = tweetStatus.user.withheldInCountries.length
            ? `🚫Account is blocked in some countries`
            : "✅Account is not blocked in any countries";
        const tweetSensitiveFlag = tweetStatus.tweet.possiblySensitive
            ? "🚫Sensitive flag on tweet"
            : "✅No sensitive flag on tweet";
        const tweetAgeRestriction = isTweetAgeRestricted ? "🚫Age limit on tweet" : "✅No age limit on tweet";
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

    private static convertAccountDataToTranslationKey(accountData: TweetStatus["user"]): SbsMessageDetails {
        const accountStatus = accountData.possiblySensitive
            ? "accountIsShadowbannedOrFlaggedAsSensitive"
            : "accountIsNotFlaggedAsSensitive";

        const sensitiveMediaInProfile = accountData.sensitiveMediaInProfile
            ? "profileContainsSensitiveMedia"
            : "profileDoesNotContainSensitiveMedia";

        const accountWithheldInCountries = accountData.withheldInCountries.length
            ? ({
                  messageName: "accountIsWithheldInCountries",
                  substitutions: TweetChecker.formatCountryList(accountData.withheldInCountries)
              } as const)
            : "accountIsNotWithheldInCountries";

        return [accountStatus, sensitiveMediaInProfile, accountWithheldInCountries];
    }

    private static convertTweetDataToTranslationKey(tweetData: TweetStatus): SbsMessageDetails {
        const isTweetAgeRestricted = TweetChecker.getTweetAgeRestriction(tweetData);

        const tweetSensitiveFlag = tweetData.tweet.possiblySensitive
            ? "tweetIsFlaggedAsSensitive"
            : "tweetIsNotFlaggedAsSensitive";
        const tweetAgeRestriction = isTweetAgeRestricted ? "tweetIsAgeRestricted" : "tweetIsNotAgeRestricted";
        const tweetSearchStatus = (() => {
            if (isTweetAgeRestricted || tweetData.user.possiblySensitive) {
                return "tweetIsNotSearchable";
            }
            return tweetData.tweet.possiblySensitive ? "tweetMayNotBeSearchable" : "tweetIsSearchable";
        })();

        return [tweetSensitiveFlag, tweetAgeRestriction, tweetSearchStatus];
    }

    private static checkTweetSearchability(tweetStatus: TweetStatus): boolean {
        const isTweetAgeRestricted =
            tweetStatus.tweet.possiblySensitive && !tweetStatus.tweet.possiblySensitiveEditable;

        if (isTweetAgeRestricted || tweetStatus.user.possiblySensitive) {
            return false;
        }

        return !tweetStatus.tweet.possiblySensitive;
    }

    /**
     * Get the menu bar of the tweet.
     * @returns menu bar of the tweet
     */
    private getMenuBar(): Element {
        const menuBar = this.tweet.querySelector("div[role='group'][id]");
        if (!menuBar) throw new Error("Failed to get menu bar of tweet");
        return menuBar;
    }

    /**
     * Run the tweet checker.
     */
    // eslint-disable-next-line max-statements
    run() {
        this.tweet.setAttribute(CHECKED_DATA_ATTRIBUTE, "true");

        const menuBar = this.getMenuBar();
        const tweetReactProps = new TweetParser(this.tweet, this.getMenuBar());
        const tweetStatus = tweetReactProps.get();
        const isTweetSearchable = TweetChecker.checkTweetSearchability(tweetStatus);

        if (!tweetStatus.tweet.isTweetByCurrentUser && !this.options.enableForOtherUsersTweets) return;
        if (isTweetSearchable && !this.options.showMessagesInUnproblematicTweets) return;

        const messageSummary = MessageSummary.fromTweetStatus(tweetStatus);

        const accountTranslations = TweetChecker.convertAccountDataToTranslationKey(tweetStatus.user);
        const tweetTranslations = TweetChecker.convertTweetDataToTranslationKey(tweetStatus);

        const sbsMessageWrapper = new SbsMessageWrapper({
            details: [...accountTranslations, ...tweetTranslations],

            isAlert: !isTweetSearchable,
            isExpanded: this.options.alwaysDetailedView,
            isFocalMode: tweetReactProps.isFocal,
            isNoteShown: this.options.showNotesInMessages,
            isTweetButtonShown: this.options.showTweetButton,

            notes: ["falsePositivesAndFalseNegativesOccur", "translatedByAI"],
            onRenderedCallback: this.onMessageCallback,
            sourceTweet: this.tweet,
            sourceTweetPermalink: tweetStatus.tweet.tweetPermalink,
            summary: messageSummary,
            tweetText: TweetChecker.generateShareText(tweetStatus),

            type: "tweet"
        });

        const analyticsButton = this.tweet.querySelector("[data-testid='analyticsButton']");
        if (analyticsButton) {
            sbsMessageWrapper.insertAdjacentElement(analyticsButton.parentElement as Element, "beforebegin");
            return;
        }

        sbsMessageWrapper.insertAdjacentElement(menuBar, "beforebegin");
    }
}

export { TweetChecker };
