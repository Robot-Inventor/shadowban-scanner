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
    constructor() {}

    static fromTweetStatus(status: TweetStatus): TweetStatusString {
        if (!status.user.possiblySensitive && !status.tweet.possiblySensitive) return "tweetNoProblem";

        if (status.user.possiblySensitive) {
            if (status.tweet.possiblySensitive) {
                return status.tweet.possiblySensitiveEditable
                    ? "accountShadowbannedAndTweetFlaggedAsSensitive"
                    : "accountAndTweetShadowbanned";
            } else {
                return "accountShadowbanned";
            }
        } else {
            return status.tweet.possiblySensitiveEditable ? "tweetFlaggedAsSensitive" : "tweetShadowbanned";
        }
    }

    static fromAccountStatus(isPossiblySensitive: boolean): AccountStatusString {
        return isPossiblySensitive ? "thisUserIsShadowbanned" : "thisUserIsNotShadowbanned";
    }
}

export { TweetStatus, TweetStatusString, MessageSummary };
