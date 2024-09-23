import type { ProfileAnalysisResult, TweetAnalysisResult } from "./propsAnalyzer";

const generateShareTextForTweet = (analyzer: TweetAnalysisResult): string => {
    const isTweetSearchable = analyzer.tweet.searchability === "searchable";

    const accountSensitiveFlag = analyzer.user.shadowbanned
        ? "🚫Account flagged as sensitive or shadowbanned"
        : "✅Account not flagged as sensitive";

    const profileSensitiveFlag = analyzer.user.sensitiveMediaInProfile
        ? "🚫Sensitive flag on profile media"
        : "✅No sensitive flag on profile media";

    const withheldInCountries = analyzer.user.withheldInCountries.length
        ? `🚫Account blocked in some countries`
        : "✅Account not blocked in any countries";

    const tweetSensitiveFlag = analyzer.tweet.possiblySensitive
        ? "🚫Sensitive flag on tweet"
        : "✅No sensitive flag on tweet";

    const tweetAgeRestriction = analyzer.tweet.ageRestriction ? "🚫Age limit on tweet" : "✅No age limit on tweet";

    const tweetSearchStatus = isTweetSearchable ? "✅Tweet searchable" : "🚫Tweet may not be searchable";

    const siteURL = navigator.language.toLowerCase().startsWith("ja")
        ? "https://shadowban-scanner.roboin.io/ja/"
        : "https://shadowban-scanner.roboin.io/en/";

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
};

const generateShareTextForProfile = (analyzer: ProfileAnalysisResult): string => {
    const accountSensitiveFlag = analyzer.user.shadowbanned
        ? "🚫Account flagged as sensitive or shadowbanned"
        : "✅Account not flagged as sensitive";

    const profileSensitiveFlag = analyzer.user.sensitiveMediaInProfile
        ? "🚫Sensitive flag on profile media"
        : "✅No sensitive flag on profile media";

    const withheldInCountries = analyzer.user.withheldInCountries.length
        ? `🚫Account blocked in some countries`
        : "✅Account not blocked in any countries";

    const siteURL = navigator.language.toLowerCase().startsWith("ja")
        ? "https://shadowban-scanner.roboin.io/ja/"
        : "https://shadowban-scanner.roboin.io/en/";

    return `
Account status for @${analyzer.user.screenName}

${accountSensitiveFlag}
${profileSensitiveFlag}
${withheldInCountries}

Shadowban Scanner by ろぼいん
${siteURL}
    `.trim();
};

export { generateShareTextForTweet, generateShareTextForProfile };
