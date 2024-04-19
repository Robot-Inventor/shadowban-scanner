/*
 * Generated type guards for "reactProps.d.ts".
 * WARNING: Do not manually change this file.
 */
import { CellInnerDivProps, FocalTweetOuterReactPropsData } from "./reactProps";

export function isCellInnerDivProps(obj: unknown): obj is CellInnerDivProps {
    const typedObj = obj as CellInnerDivProps
    return (
        (typedObj !== null &&
            typeof typedObj === "object" ||
            typeof typedObj === "function") &&
        (typedObj["children"] !== null &&
            typeof typedObj["children"] === "object" ||
            typeof typedObj["children"] === "function") &&
        (typeof typedObj["children"]["_owner"] === "undefined" ||
            (typedObj["children"]["_owner"] !== null &&
                typeof typedObj["children"]["_owner"] === "object" ||
                typeof typedObj["children"]["_owner"] === "function") &&
            typeof typedObj["children"]["_owner"]["key"] === "string")
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
        (typedObj["children"][0][1]["props"]["children"][0]["props"]["children"][2]["props"]["children"][7] !== null &&
            typeof typedObj["children"][0][1]["props"]["children"][0]["props"]["children"][2]["props"]["children"][7] === "object" ||
            typeof typedObj["children"][0][1]["props"]["children"][0]["props"]["children"][2]["props"]["children"][7] === "function") &&
        (typedObj["children"][0][1]["props"]["children"][0]["props"]["children"][2]["props"]["children"][7]["props"] !== null &&
            typeof typedObj["children"][0][1]["props"]["children"][0]["props"]["children"][2]["props"]["children"][7]["props"] === "object" ||
            typeof typedObj["children"][0][1]["props"]["children"][0]["props"]["children"][2]["props"]["children"][7]["props"] === "function") &&
        (typedObj["children"][0][1]["props"]["children"][0]["props"]["children"][2]["props"]["children"][7]["props"]["loggedInUser"] !== null &&
            typeof typedObj["children"][0][1]["props"]["children"][0]["props"]["children"][2]["props"]["children"][7]["props"]["loggedInUser"] === "object" ||
            typeof typedObj["children"][0][1]["props"]["children"][0]["props"]["children"][2]["props"]["children"][7]["props"]["loggedInUser"] === "function") &&
        typeof typedObj["children"][0][1]["props"]["children"][0]["props"]["children"][2]["props"]["children"][7]["props"]["loggedInUser"]["screen_name"] === "string"
    )
}
