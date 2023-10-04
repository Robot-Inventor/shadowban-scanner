/*
 * Generated type guards for "reactProps.d.ts".
 * WARNING: Do not manually change this file.
 */
import { menubarReactProps, TweetOuterReactPropsData, FocalTweetOuterReactPropsData, ProfileReactPropsData } from "./reactProps";

export function isMenuBarReactPropsData(obj: unknown): obj is menubarReactProps {
    const typedObj = obj as menubarReactProps
    return (
        (typedObj !== null &&
            typeof typedObj === "object" ||
            typeof typedObj === "function") &&
        Array.isArray(typedObj["children"]) &&
        (typedObj["children"][1] !== null &&
            typeof typedObj["children"][1] === "object" ||
            typeof typedObj["children"][1] === "function") &&
        (typedObj["children"][1]["props"] !== null &&
            typeof typedObj["children"][1]["props"] === "object" ||
            typeof typedObj["children"][1]["props"] === "function") &&
        (typedObj["children"][1]["props"]["retweetWithCommentLink"] !== null &&
            typeof typedObj["children"][1]["props"]["retweetWithCommentLink"] === "object" ||
            typeof typedObj["children"][1]["props"]["retweetWithCommentLink"] === "function") &&
        (typedObj["children"][1]["props"]["retweetWithCommentLink"]["state"] !== null &&
            typeof typedObj["children"][1]["props"]["retweetWithCommentLink"]["state"] === "object" ||
            typeof typedObj["children"][1]["props"]["retweetWithCommentLink"]["state"] === "function") &&
        (typedObj["children"][1]["props"]["retweetWithCommentLink"]["state"]["quotedStatus"] !== null &&
            typeof typedObj["children"][1]["props"]["retweetWithCommentLink"]["state"]["quotedStatus"] === "object" ||
            typeof typedObj["children"][1]["props"]["retweetWithCommentLink"]["state"]["quotedStatus"] === "function") &&
        (typeof typedObj["children"][1]["props"]["retweetWithCommentLink"]["state"]["quotedStatus"]["possibly_sensitive"] === "undefined" ||
            typedObj["children"][1]["props"]["retweetWithCommentLink"]["state"]["quotedStatus"]["possibly_sensitive"] === null ||
            typedObj["children"][1]["props"]["retweetWithCommentLink"]["state"]["quotedStatus"]["possibly_sensitive"] === false ||
            typedObj["children"][1]["props"]["retweetWithCommentLink"]["state"]["quotedStatus"]["possibly_sensitive"] === true) &&
        (typeof typedObj["children"][1]["props"]["retweetWithCommentLink"]["state"]["quotedStatus"]["possibly_sensitive_editable"] === "undefined" ||
            typedObj["children"][1]["props"]["retweetWithCommentLink"]["state"]["quotedStatus"]["possibly_sensitive_editable"] === null ||
            typedObj["children"][1]["props"]["retweetWithCommentLink"]["state"]["quotedStatus"]["possibly_sensitive_editable"] === false ||
            typedObj["children"][1]["props"]["retweetWithCommentLink"]["state"]["quotedStatus"]["possibly_sensitive_editable"] === true) &&
        typeof typedObj["children"][1]["props"]["retweetWithCommentLink"]["state"]["quotedStatus"]["permalink"] === "string" &&
        (typedObj["children"][1]["props"]["retweetWithCommentLink"]["state"]["quotedStatus"]["user"] !== null &&
            typeof typedObj["children"][1]["props"]["retweetWithCommentLink"]["state"]["quotedStatus"]["user"] === "object" ||
            typeof typedObj["children"][1]["props"]["retweetWithCommentLink"]["state"]["quotedStatus"]["user"] === "function") &&
        (typeof typedObj["children"][1]["props"]["retweetWithCommentLink"]["state"]["quotedStatus"]["user"]["possibly_sensitive"] === "undefined" ||
            typedObj["children"][1]["props"]["retweetWithCommentLink"]["state"]["quotedStatus"]["user"]["possibly_sensitive"] === null ||
            typedObj["children"][1]["props"]["retweetWithCommentLink"]["state"]["quotedStatus"]["user"]["possibly_sensitive"] === false ||
            typedObj["children"][1]["props"]["retweetWithCommentLink"]["state"]["quotedStatus"]["user"]["possibly_sensitive"] === true) &&
        typeof typedObj["children"][1]["props"]["retweetWithCommentLink"]["state"]["quotedStatus"]["user"]["screen_name"] === "string" &&
        (typedObj["children"][1]["props"]["retweetWithCommentLink"]["state"]["quotedStatus"]["user"]["profile_interstitial_type"] === "" ||
            typedObj["children"][1]["props"]["retweetWithCommentLink"]["state"]["quotedStatus"]["user"]["profile_interstitial_type"] === "sensitive_media" ||
            typedObj["children"][1]["props"]["retweetWithCommentLink"]["state"]["quotedStatus"]["user"]["profile_interstitial_type"] === "fake_account" ||
            typedObj["children"][1]["props"]["retweetWithCommentLink"]["state"]["quotedStatus"]["user"]["profile_interstitial_type"] === "offensive_profile_content" ||
            typedObj["children"][1]["props"]["retweetWithCommentLink"]["state"]["quotedStatus"]["user"]["profile_interstitial_type"] === "timeout")
    )
}

export function isTweetOuterReactPropsData(obj: unknown): obj is TweetOuterReactPropsData {
    const typedObj = obj as TweetOuterReactPropsData
    return (
        (typedObj !== null &&
            typeof typedObj === "object" ||
            typeof typedObj === "function") &&
        Array.isArray(typedObj["children"]) &&
        Array.isArray(typedObj["children"][0]) &&
        (typedObj["children"][0][1] !== null &&
            typeof typedObj["children"][0][1] === "object" ||
            typeof typedObj["children"][0][1] === "function") &&
        (typedObj["children"][0][1]["props"] !== null &&
            typeof typedObj["children"][0][1]["props"] === "object" ||
            typeof typedObj["children"][0][1]["props"] === "function") &&
        Array.isArray(typedObj["children"][0][1]["props"]["children"]) &&
        (typedObj["children"][0][1]["props"]["children"][0] !== null &&
            typeof typedObj["children"][0][1]["props"]["children"][0] === "object" ||
            typeof typedObj["children"][0][1]["props"]["children"][0] === "function") &&
        (typedObj["children"][0][1]["props"]["children"][0]["props"] !== null &&
            typeof typedObj["children"][0][1]["props"]["children"][0]["props"] === "object" ||
            typeof typedObj["children"][0][1]["props"]["children"][0]["props"] === "function") &&
        Array.isArray(typedObj["children"][0][1]["props"]["children"][0]["props"]["children"]) &&
        (typedObj["children"][0][1]["props"]["children"][0]["props"]["children"][1] !== null &&
            typeof typedObj["children"][0][1]["props"]["children"][0]["props"]["children"][1] === "object" ||
            typeof typedObj["children"][0][1]["props"]["children"][0]["props"]["children"][1] === "function") &&
        (typedObj["children"][0][1]["props"]["children"][0]["props"]["children"][1]["props"] !== null &&
            typeof typedObj["children"][0][1]["props"]["children"][0]["props"]["children"][1]["props"] === "object" ||
            typeof typedObj["children"][0][1]["props"]["children"][0]["props"]["children"][1]["props"] === "function") &&
        Array.isArray(typedObj["children"][0][1]["props"]["children"][0]["props"]["children"][1]["props"]["children"]) &&
        Array.isArray(typedObj["children"][0][1]["props"]["children"][0]["props"]["children"][1]["props"]["children"][1]) &&
        (typedObj["children"][0][1]["props"]["children"][0]["props"]["children"][1]["props"]["children"][1][2] !== null &&
            typeof typedObj["children"][0][1]["props"]["children"][0]["props"]["children"][1]["props"]["children"][1][2] === "object" ||
            typeof typedObj["children"][0][1]["props"]["children"][0]["props"]["children"][1]["props"]["children"][1][2] === "function") &&
        (typedObj["children"][0][1]["props"]["children"][0]["props"]["children"][1]["props"]["children"][1][2]["props"] !== null &&
            typeof typedObj["children"][0][1]["props"]["children"][0]["props"]["children"][1]["props"]["children"][1][2]["props"] === "object" ||
            typeof typedObj["children"][0][1]["props"]["children"][0]["props"]["children"][1]["props"]["children"][1][2]["props"] === "function") &&
        (typedObj["children"][0][1]["props"]["children"][0]["props"]["children"][1]["props"]["children"][1][2]["props"]["loggedInUser"] !== null &&
            typeof typedObj["children"][0][1]["props"]["children"][0]["props"]["children"][1]["props"]["children"][1][2]["props"]["loggedInUser"] === "object" ||
            typeof typedObj["children"][0][1]["props"]["children"][0]["props"]["children"][1]["props"]["children"][1][2]["props"]["loggedInUser"] === "function") &&
        typeof typedObj["children"][0][1]["props"]["children"][0]["props"]["children"][1]["props"]["children"][1][2]["props"]["loggedInUser"]["screen_name"] === "string"
    )
}

export function isFocalTweetOuterReactPropsData(obj: unknown): obj is FocalTweetOuterReactPropsData {
    const typedObj = obj as FocalTweetOuterReactPropsData
    return (
        (typedObj !== null &&
            typeof typedObj === "object" ||
            typeof typedObj === "function") &&
        Array.isArray(typedObj["children"]) &&
        Array.isArray(typedObj["children"][0]) &&
        (typedObj["children"][0][1] !== null &&
            typeof typedObj["children"][0][1] === "object" ||
            typeof typedObj["children"][0][1] === "function") &&
        (typedObj["children"][0][1]["props"] !== null &&
            typeof typedObj["children"][0][1]["props"] === "object" ||
            typeof typedObj["children"][0][1]["props"] === "function") &&
        Array.isArray(typedObj["children"][0][1]["props"]["children"]) &&
        (typedObj["children"][0][1]["props"]["children"][0] !== null &&
            typeof typedObj["children"][0][1]["props"]["children"][0] === "object" ||
            typeof typedObj["children"][0][1]["props"]["children"][0] === "function") &&
        (typedObj["children"][0][1]["props"]["children"][0]["props"] !== null &&
            typeof typedObj["children"][0][1]["props"]["children"][0]["props"] === "object" ||
            typeof typedObj["children"][0][1]["props"]["children"][0]["props"] === "function") &&
        Array.isArray(typedObj["children"][0][1]["props"]["children"][0]["props"]["children"]) &&
        (typedObj["children"][0][1]["props"]["children"][0]["props"]["children"][2] !== null &&
            typeof typedObj["children"][0][1]["props"]["children"][0]["props"]["children"][2] === "object" ||
            typeof typedObj["children"][0][1]["props"]["children"][0]["props"]["children"][2] === "function") &&
        (typedObj["children"][0][1]["props"]["children"][0]["props"]["children"][2]["props"] !== null &&
            typeof typedObj["children"][0][1]["props"]["children"][0]["props"]["children"][2]["props"] === "object" ||
            typeof typedObj["children"][0][1]["props"]["children"][0]["props"]["children"][2]["props"] === "function") &&
        Array.isArray(typedObj["children"][0][1]["props"]["children"][0]["props"]["children"][2]["props"]["children"]) &&
        (typedObj["children"][0][1]["props"]["children"][0]["props"]["children"][2]["props"]["children"][6] !== null &&
            typeof typedObj["children"][0][1]["props"]["children"][0]["props"]["children"][2]["props"]["children"][6] === "object" ||
            typeof typedObj["children"][0][1]["props"]["children"][0]["props"]["children"][2]["props"]["children"][6] === "function") &&
        (typedObj["children"][0][1]["props"]["children"][0]["props"]["children"][2]["props"]["children"][6]["props"] !== null &&
            typeof typedObj["children"][0][1]["props"]["children"][0]["props"]["children"][2]["props"]["children"][6]["props"] === "object" ||
            typeof typedObj["children"][0][1]["props"]["children"][0]["props"]["children"][2]["props"]["children"][6]["props"] === "function") &&
        (typedObj["children"][0][1]["props"]["children"][0]["props"]["children"][2]["props"]["children"][6]["props"]["loggedInUser"] !== null &&
            typeof typedObj["children"][0][1]["props"]["children"][0]["props"]["children"][2]["props"]["children"][6]["props"]["loggedInUser"] === "object" ||
            typeof typedObj["children"][0][1]["props"]["children"][0]["props"]["children"][2]["props"]["children"][6]["props"]["loggedInUser"] === "function") &&
        typeof typedObj["children"][0][1]["props"]["children"][0]["props"]["children"][2]["props"]["children"][6]["props"]["loggedInUser"]["screen_name"] === "string"
    )
}

export function isProfileReactPropsData(obj: unknown): obj is ProfileReactPropsData {
    const typedObj = obj as ProfileReactPropsData
    return (
        (typedObj !== null &&
            typeof typedObj === "object" ||
            typeof typedObj === "function") &&
        Array.isArray(typedObj["children"]) &&
        (typedObj["children"][1] !== null &&
            typeof typedObj["children"][1] === "object" ||
            typeof typedObj["children"][1] === "function") &&
        (typedObj["children"][1]["props"] !== null &&
            typeof typedObj["children"][1]["props"] === "object" ||
            typeof typedObj["children"][1]["props"] === "function") &&
        (typedObj["children"][1]["props"]["user"] !== null &&
            typeof typedObj["children"][1]["props"]["user"] === "object" ||
            typeof typedObj["children"][1]["props"]["user"] === "function") &&
        (typedObj["children"][1]["props"]["user"]["possibly_sensitive"] === null ||
            typedObj["children"][1]["props"]["user"]["possibly_sensitive"] === false ||
            typedObj["children"][1]["props"]["user"]["possibly_sensitive"] === true)
    )
}
