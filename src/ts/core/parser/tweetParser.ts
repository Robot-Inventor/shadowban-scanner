import type { BasicTweetProps, Tweet } from "twi-ext";
import { ParserBase } from "./parserBase";
import { isFocalTweetOuterReactPropsData } from "../../../types/core/reactProps/reactProps.guard";

/**
 * React props of the tweet.
 */
class TweetParser extends ParserBase {
    private readonly basicTweetProps: BasicTweetProps;

    /**
     * Parse the React props of the tweet.
     * @param tweet element of the tweet
     */
    public constructor(tweet: Tweet) {
        super(tweet.element);
        this.basicTweetProps = tweet.props;
    }

    /**
     * Get the React props of the tweet.
     * @returns React props of the tweet
     */
    public parse(): BasicTweetProps {
        const basicProps = this.basicTweetProps;

        return basicProps;
    }

    /**
     * Check whether the tweet is focal.
     * @returns whether the tweet is focal
     */
    public get isFocal(): boolean {
        const tweetReactProps = this.getProps();
        return isFocalTweetOuterReactPropsData(tweetReactProps);
    }
}

export { TweetParser };
