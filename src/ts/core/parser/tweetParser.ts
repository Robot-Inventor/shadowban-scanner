import type { BasicTweetProps, Tweet } from "twi-ext";

/**
 * React props of the tweet.
 */
class TweetParser {
    private readonly tweet: Tweet;

    /**
     * Parse the React props of the tweet.
     * @param tweet element of the tweet
     */
    public constructor(tweet: Tweet) {
        this.tweet = tweet;
    }

    /**
     * Get the React props of the tweet.
     * @returns React props of the tweet
     */
    public parse(): BasicTweetProps {
        return this.tweet.props;
    }
}

export { TweetParser };
