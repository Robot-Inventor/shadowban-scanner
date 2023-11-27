import { TweetAnalysisResult } from "./propsAnalyzer";

class SharedTextGenerator {
    /**
     * Generate text to share the result.
     * @param analyzer tweet status
     * @returns generated share text
     */
    public static generateShareText(analyzer: TweetAnalysisResult): string {
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

        const siteURL = navigator.language.toLowerCase().startsWith("ja")
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
}

export { SharedTextGenerator };
