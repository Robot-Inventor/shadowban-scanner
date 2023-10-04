import {
    isFocalTweetOuterReactPropsData,
    isMenuBarReactPropsData,
    isTweetOuterReactPropsData
} from "../../@types/core/reactProps/reactProps.guard";
import { BasicTweetProps } from "../../@types/core/reactProps/reactProps";
import { ReactProps } from "./reactProps";
import { TweetStatus } from "../messageSummary";

/**
 * React props of the tweet.
 */
class TweetReactProps {
    private readonly tweet: Element;
    private readonly basicTweetProps: BasicTweetProps;

    /**
     * Parse the React props of the tweet.
     * @param tweet element of the tweet
     * @param menuBar element of the menu bar
     */
    constructor(tweet: Element, menuBar: Element) {
        this.tweet = tweet;

        const basicTweetProps = new ReactProps(menuBar).get();
        if (!isMenuBarReactPropsData(basicTweetProps)) throw new Error("Type of basicTweetProps is invalid.");
        this.basicTweetProps = basicTweetProps.children[1].props.retweetWithCommentLink.state.quotedStatus;
    }

    /**
     * Get the React props of the tweet.
     * @returns React props of the tweet
     */
    get(): TweetStatus {
        const tweetData = this.basicTweetProps;
        const result: TweetStatus = {
            tweet: {
                isTweetByCurrentUser: this.isTweetByCurrentUser,
                possiblySensitive: Boolean(tweetData.possibly_sensitive),
                // Ref: https://github.com/Robot-Inventor/shadowban-scanner/issues/16
                possiblySensitiveEditable: !(tweetData.possibly_sensitive_editable === false),
                tweetPermalink: tweetData.permalink
            },
            user: {
                possiblySensitive: Boolean(tweetData.user.possibly_sensitive),
                sensitiveMediaInProfile: tweetData.user.profile_interstitial_type === "sensitive_media"
            }
        };

        return result;
    }

    /**
     * Check whether the tweet is by the current user.
     * @returns whether the tweet is by the current user
     */
    get isTweetByCurrentUser(): boolean {
        const tweetAuthorScreenName = this.basicTweetProps.user.screen_name;

        const tweetReactProps = new ReactProps(this.tweet).get();
        let currentUserScreenName = "";
        if (isTweetOuterReactPropsData(tweetReactProps)) {
            currentUserScreenName =
                tweetReactProps.children[0][1].props.children[0].props.children[1].props.children[1][2].props
                    .loggedInUser.screen_name;
        } else if (isFocalTweetOuterReactPropsData(tweetReactProps)) {
            currentUserScreenName =
                tweetReactProps.children[0][1].props.children[0].props.children[2].props.children[6].props.loggedInUser
                    .screen_name;
        } else {
            throw new Error("Type of tweetReactProps is invalid.");
        }

        return tweetAuthorScreenName === currentUserScreenName;
    }
}

export { TweetReactProps };
