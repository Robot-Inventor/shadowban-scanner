import type { ProfileAnalysisResult, TweetAnalysisResult } from "./propsAnalyzer";

/* eslint-disable sort-keys */
const TRANSLATIONS = {
    en: {
        accountFlaggedAsSensitiveOrShadowbanned: "🚫Account flagged as sensitive or shadowbanned",
        accountNotFlaggedAsSensitive: "✅Account not flagged as sensitive",
        sensitiveFlagOnProfileMedia: "🚫Sensitive flag on profile media",
        noSensitiveFlagOnProfileMedia: "✅No sensitive flag on profile media",
        accountBlockedInSomeCountries: "🚫Account blocked in some countries",
        accountNotBlockedInAnyCountries: "✅Account not blocked in any countries",
        sensitiveFlagOnTweet: "🚫Sensitive flag on tweet",
        noSensitiveFlagOnTweet: "✅No sensitive flag on tweet",
        ageLimitOnTweet: "🚫Age limit on tweet",
        noAgeLimitOnTweet: "✅No age limit on tweet",
        tweetSearchable: "✅Tweet searchable",
        tweetMayNotBeSearchable: "🚫Tweet may not be searchable",
        shadowbanScannerByRoboin: "Shadowban Scanner by roboin",
        siteURL: "https://shadowban-scanner.roboin.io/en/",
        accountStatusFor: "Account status for $1"
    },
    ja: {
        accountFlaggedAsSensitiveOrShadowbanned: "🚫アカウントにセンシティブ判定またはシャドウバンあり",
        accountNotFlaggedAsSensitive: "✅アカウントにセンシティブ判定なし",
        sensitiveFlagOnProfileMedia: "🚫プロフィールのメディアにセンシティブ判定あり",
        noSensitiveFlagOnProfileMedia: "✅プロフィールのメディアにセンシティブ判定なし",
        accountBlockedInSomeCountries: "🚫アカウントをブロックしている国あり",
        accountNotBlockedInAnyCountries: "✅アカウントをブロックしている国なし",
        sensitiveFlagOnTweet: "🚫ツイートにセンシティブ判定あり",
        noSensitiveFlagOnTweet: "✅ツイートにセンシティブ判定なし",
        ageLimitOnTweet: "🚫ツイートに年齢制限あり",
        noAgeLimitOnTweet: "✅ツイートに年齢制限なし",
        tweetSearchable: "✅ツイートは検索可能",
        tweetMayNotBeSearchable: "🚫ツイートは検索不能",
        shadowbanScannerByRoboin: "Shadowban Scanner by ろぼいん",
        siteURL: "https://shadowban-scanner.roboin.io/ja/",
        accountStatusFor: "$1 のアカウントの状態"
    }
} as const;
/* eslint-enable sort-keys */

const isJapanese = navigator.language.toLowerCase().startsWith("ja");

const generateShareTextForTweet = (analyzer: TweetAnalysisResult): string => {
    const isTweetSearchable = analyzer.tweet.searchability === "searchable";

    const translations = TRANSLATIONS[isJapanese ? "ja" : "en"];

    const accountSensitiveFlag = analyzer.user.shadowbanned
        ? translations.accountFlaggedAsSensitiveOrShadowbanned
        : translations.accountNotFlaggedAsSensitive;

    const profileSensitiveFlag = analyzer.user.sensitiveMediaInProfile
        ? translations.sensitiveFlagOnProfileMedia
        : translations.noSensitiveFlagOnProfileMedia;

    const withheldInCountries = analyzer.user.withheldInCountries.length
        ? translations.accountBlockedInSomeCountries
        : translations.accountNotBlockedInAnyCountries;

    const tweetSensitiveFlag = analyzer.tweet.possiblySensitive
        ? translations.sensitiveFlagOnTweet
        : translations.noSensitiveFlagOnTweet;

    const tweetAgeRestriction = analyzer.tweet.ageRestriction
        ? translations.ageLimitOnTweet
        : translations.noAgeLimitOnTweet;

    const tweetSearchStatus = isTweetSearchable ? translations.tweetSearchable : translations.tweetMayNotBeSearchable;

    return `
${accountSensitiveFlag}
${profileSensitiveFlag}
${withheldInCountries}
${tweetSensitiveFlag}
${tweetAgeRestriction}
${tweetSearchStatus}

${translations.shadowbanScannerByRoboin}
${translations.siteURL}
    `.trim();
};

const generateShareTextForProfile = (analyzer: ProfileAnalysisResult): string => {
    const translations = TRANSLATIONS[isJapanese ? "ja" : "en"];

    const accountSensitiveFlag = analyzer.user.shadowbanned
        ? translations.accountFlaggedAsSensitiveOrShadowbanned
        : translations.accountNotFlaggedAsSensitive;

    const profileSensitiveFlag = analyzer.user.sensitiveMediaInProfile
        ? translations.sensitiveFlagOnProfileMedia
        : translations.noSensitiveFlagOnProfileMedia;

    const withheldInCountries = analyzer.user.withheldInCountries.length
        ? translations.accountBlockedInSomeCountries
        : translations.accountNotBlockedInAnyCountries;

    const leadingText = translations.accountStatusFor.replace(
        "$1",
        analyzer.user.isLoggedInUser ? `@${analyzer.user.screenName}` : `@ ${analyzer.user.screenName}`
    );

    return `
${leadingText}

${accountSensitiveFlag}
${profileSensitiveFlag}
${withheldInCountries}

${translations.shadowbanScannerByRoboin}
${translations.siteURL}
    `.trim();
};

export { generateShareTextForTweet, generateShareTextForProfile };
