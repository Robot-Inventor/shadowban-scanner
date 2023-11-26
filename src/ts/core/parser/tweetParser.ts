import {
    isFocalTweetOuterReactPropsData,
    isMenuBarReactPropsData,
    isTweetOuterReactPropsData
} from "../../@types/core/reactProps/reactProps.guard";
import { BasicTweetProps } from "../../@types/core/reactProps/reactProps";
import { ParserBase } from "./parserBase";
import { TweetStatus } from "../messageSummary";

/**
 * React props of the tweet.
 */
class TweetParser extends ParserBase {
    private readonly basicTweetProps: BasicTweetProps;

    /**
     * Parse the React props of the tweet.
     * @param tweet element of the tweet
     * @param menuBar element of the menu bar
     */
    constructor(element: Element) {
        super(element);

        const menuBar = this.getMenuBar();
        const menuBarProps = this.getProps(menuBar);
        if (!isMenuBarReactPropsData(menuBarProps)) throw new Error("Type of basicTweetProps is invalid.");

        this.basicTweetProps = menuBarProps.children[1].props.retweetWithCommentLink.state.quotedStatus;
    }

    /**
     * Get the menu bar of the tweet.
     * @returns menu bar of the tweet
     */
    public getMenuBar(): Element {
        const menuBar = this.element.querySelector("div[role='group'][id]");
        if (!menuBar) throw new Error("Failed to get menu bar of tweet");

        return menuBar;
    }

    /**
     * Get the React props of the tweet.
     * @returns React props of the tweet
     */
    public get(): TweetStatus {
        const basicProps = this.basicTweetProps;

        const result: TweetStatus = {
            tweet: {
                isTweetByCurrentUser: this.isTweetByCurrentUser,
                possiblySensitive: Boolean(basicProps.possibly_sensitive),
                // Ref: https://github.com/Robot-Inventor/shadowban-scanner/issues/16
                possiblySensitiveEditable: !(basicProps.possibly_sensitive_editable === false),
                tweetPermalink: basicProps.permalink
            },
            user: {
                possiblySensitive: Boolean(basicProps.user.possibly_sensitive),
                sensitiveMediaInProfile: ["sensitive_media", "offensive_profile_content"].includes(
                    basicProps.user.profile_interstitial_type
                ),
                withheldInCountries: basicProps.user.withheld_in_countries
            }
        };

        return result;
    }

    /**
     * Check whether the tweet is by the current user.
     * @returns whether the tweet is by the current user
     */
    public get isTweetByCurrentUser(): boolean {
        const tweetAuthorScreenName = this.basicTweetProps.user.screen_name;
        const tweetReactProps = this.getProps();
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
