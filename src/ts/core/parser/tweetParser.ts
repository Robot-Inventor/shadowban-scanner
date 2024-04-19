import type { BasicTweetProps, Tweet } from "twi-ext";
import { getReactProps } from "./utility";
import { isFocalTweetOuterReactPropsData } from "../../../types/core/reactProps/reactProps.guard";

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

    /**
     * Check whether the tweet is focal.
     * @returns whether the tweet is focal
     */
    public get isFocal(): boolean {
        const tweetReactProps = getReactProps(this.tweet.element);
        return isFocalTweetOuterReactPropsData(tweetReactProps);
    }
}

export { TweetParser };
