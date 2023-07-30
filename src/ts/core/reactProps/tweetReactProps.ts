import {
    isFocalTweetOuterReactPropsData,
    isMenuBarReactPropsData,
    isTweetOuterReactPropsData
} from "../../@types/core/reactProps/reactProps.guard";
import { BasicTweetProps } from "../../@types/core/reactProps/reactProps";
import { ReactProps } from "./reactProps";
import { TweetStatus } from "../messageType";

class TweetReactProps {
    private readonly tweet: Element;
    private readonly basicTweetProps: BasicTweetProps;

    constructor(tweet: Element, menuBar: Element) {
        this.tweet = tweet;

        const basicTweetProps = new ReactProps(menuBar).get();
        if (!isMenuBarReactPropsData(basicTweetProps)) throw new Error("Type of basicTweetProps is invalid.");
        this.basicTweetProps = basicTweetProps.children[1].props.retweetWithCommentLink.state.quotedStatus;
    }

    get(): TweetStatus {
        const tweetData = this.basicTweetProps;
        const result: TweetStatus = {
            tweet: {
                isTweetByCurrentUser: this.isTweetByCurrentUser,
                possiblySensitive: Boolean(tweetData.possibly_sensitive),
                // Ref: https://github.com/Robot-Inventor/shadowban-scanner/issues/16
                possiblySensitiveEditable: !(tweetData.possibly_sensitive_editable === false)
            },
            user: {
                possiblySensitive: Boolean(tweetData.user.possibly_sensitive),
                sensitiveMediaInProfile: tweetData.user.profile_interstitial_type === "sensitive_media"
            }
        };

        return result;
    }

    get isTweetByCurrentUser(): boolean {
        const tweetAuthorScreenName = this.basicTweetProps.user.screen_name;

        const tweetReactProps = new ReactProps(this.tweet).get();
        let currentUserScreenName = "";
        if (isTweetOuterReactPropsData(tweetReactProps)) {
            currentUserScreenName =
                tweetReactProps.children[0][1].props.children[0].props.children[1].props.children[1][2].props.
                    children[1].props.loggedInUser.screen_name;
        } else if (isFocalTweetOuterReactPropsData(tweetReactProps)) {
            currentUserScreenName =
                tweetReactProps.children[0][1].props.children[0].props.children[2].props.children[6].props.loggedInUser.
                    screen_name;
        } else {
            throw new Error("Type of tweetReactProps is invalid.");
        }

        return tweetAuthorScreenName === currentUserScreenName;
    }
}

export { TweetReactProps };
