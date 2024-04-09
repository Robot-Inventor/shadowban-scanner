import {
    isFocalTweetOuterReactPropsData,
    isMenuBarReactPropsData,
    isTweetOuterReactPropsData
} from "../../../types/core/reactProps/reactProps.guard";
import { BasicTweetProps } from "../../../types/core/reactProps/reactProps";
import { ParserBase } from "./parserBase";
import type { Tweet } from "twi-ext";

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
     * Get the menu bar of the tweet.
     * @returns menu bar of the tweet
     */
    public getMenuBar(): HTMLElement {
        const menuBar = this.sourceElement.querySelector<HTMLElement>("div[role='group'][id]");
        if (!menuBar) throw new Error("Failed to get menu bar of tweet");

        return menuBar;
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
     * Check whether the tweet is by the current user.
     * @returns whether the tweet is by the current user
     */
    public get isTweetByCurrentUser(): boolean {
        const tweetAuthorScreenName = this.basicTweetProps.user.screen_name;
        const tweetReactProps = this.getProps();
        // eslint-disable-next-line no-useless-assignment
        let currentUserScreenName = "";

        if (isTweetOuterReactPropsData(tweetReactProps)) {
            currentUserScreenName =
                tweetReactProps.children[0][1].props.children[0].props.children[1].props.children[1][2].props
                    .loggedInUser.screen_name;
        } else if (isFocalTweetOuterReactPropsData(tweetReactProps)) {
            currentUserScreenName =
                tweetReactProps.children[0][1].props.children[0].props.children[2].props.children[7].props.loggedInUser
                    .screen_name;
        } else {
            throw new Error("Type of tweetReactProps is invalid.");
        }

        return tweetAuthorScreenName === currentUserScreenName;
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
