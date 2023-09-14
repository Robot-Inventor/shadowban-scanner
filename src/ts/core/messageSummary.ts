interface TweetStatus {
    tweet: {
        possiblySensitive: boolean;
        possiblySensitiveEditable: boolean;
        isTweetByCurrentUser: boolean;
    };
    user: {
        possiblySensitive: boolean;
        sensitiveMediaInProfile: boolean;
    };
}

type TweetStatusString =
    | "tweetNoProblem"
    | "accountShadowbanned"
    | "tweetShadowbanned"
    | "accountAndTweetShadowbanned"
    | "tweetFlaggedAsSensitive"
    | "accountShadowbannedAndTweetFlaggedAsSensitive";

type AccountStatusString = "thisUserIsShadowbanned" | "thisUserIsNotShadowbanned";

class MessageSummary {
    static fromTweetStatus(status: TweetStatus): TweetStatusString {
        const tweetHasProblem =
            status.user.possiblySensitive || status.user.sensitiveMediaInProfile || status.tweet.possiblySensitive;
        if (!tweetHasProblem) return "tweetNoProblem";

        if (status.user.possiblySensitive || status.user.sensitiveMediaInProfile) {
            if (status.tweet.possiblySensitive) {
                return status.tweet.possiblySensitiveEditable
                    ? "accountShadowbannedAndTweetFlaggedAsSensitive"
                    : "accountAndTweetShadowbanned";
            }
            return "accountShadowbanned";
        }
        return status.tweet.possiblySensitiveEditable ? "tweetFlaggedAsSensitive" : "tweetShadowbanned";
    }

    static fromAccountStatus(isPossiblySensitive: boolean): AccountStatusString {
        return isPossiblySensitive ? "thisUserIsShadowbanned" : "thisUserIsNotShadowbanned";
    }
}

export { TweetStatus, TweetStatusString, MessageSummary };
