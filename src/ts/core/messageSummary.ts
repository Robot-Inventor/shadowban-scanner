import { TweetAnalysisResult } from "./propsAnalyzer";

type TweetStatusString =
    | "tweetNoProblem"
    | "accountShadowbanned"
    | "tweetShadowbanned"
    | "accountAndTweetShadowbanned"
    | "accountIsBlockedInSomeCountries"
    | "tweetFlaggedAsSensitive"
    | "accountShadowbannedAndTweetFlaggedAsSensitive";

type AccountStatusString = "thisUserIsShadowbanned" | "thisUserIsNotShadowbanned";

/**
 * Summarize the message.
 */
class MessageSummary {
    /**
     * Get the message summary from the tweet status data.
     * @param status tweet status data
     * @returns message summary
     */
    static fromTweetStatus(status: TweetAnalysisResult): TweetStatusString {
        const tweetHasProblem =
            status.user.shadowbanned ||
            status.user.sensitiveMediaInProfile ||
            Boolean(status.user.withheldInCountries.length) ||
            status.tweet.possiblySensitive;
        if (!tweetHasProblem) return "tweetNoProblem";

        if (status.user.withheldInCountries.length) return "accountIsBlockedInSomeCountries";

        if (status.user.shadowbanned || status.user.sensitiveMediaInProfile) {
            if (status.tweet.possiblySensitive) {
                return status.tweet.ageRestriction
                    ? "accountAndTweetShadowbanned"
                    : "accountShadowbannedAndTweetFlaggedAsSensitive";
            }

            return "accountShadowbanned";
        }

        return status.tweet.ageRestriction ? "tweetShadowbanned" : "tweetFlaggedAsSensitive";
    }

    /**
     * Get the message summary from the account status data.
     * @param isPossiblySensitive whether the account is possibly sensitive
     * @returns message summary
     */
    static fromAccountStatus(isPossiblySensitive: boolean): AccountStatusString {
        return isPossiblySensitive ? "thisUserIsShadowbanned" : "thisUserIsNotShadowbanned";
    }
}

export { MessageSummary };
