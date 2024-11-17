/*
 * Generated type guards for "reactProps.d.ts".
 * WARNING: Do not manually change this file.
 */
import { CellInnerDivProps, TombstoneGrandchildProps } from "./reactProps";

export function isCellInnerDivProps(obj: unknown): obj is CellInnerDivProps {
    const typedObj = obj as CellInnerDivProps
    return (
        (typedObj !== null &&
            typeof typedObj === "object" ||
            typeof typedObj === "function") &&
        (typedObj["children"] !== null &&
            typeof typedObj["children"] === "object" ||
            typeof typedObj["children"] === "function") &&
        (typedObj["children"]["_owner"] !== null &&
            typeof typedObj["children"]["_owner"] === "object" ||
            typeof typedObj["children"]["_owner"] === "function") &&
        typeof typedObj["children"]["_owner"]["key"] === "string"
    )
}

export function isTombstoneGrandchildProps(obj: unknown): obj is TombstoneGrandchildProps {
    const typedObj = obj as TombstoneGrandchildProps
    return (
        (typedObj !== null &&
            typeof typedObj === "object" ||
            typeof typedObj === "function") &&
        Array.isArray(typedObj["children"]) &&
        (typedObj["children"][0] !== null &&
            typeof typedObj["children"][0] === "object" ||
            typeof typedObj["children"][0] === "function") &&
        (typedObj["children"][0]["props"] !== null &&
            typeof typedObj["children"][0]["props"] === "object" ||
            typeof typedObj["children"][0]["props"] === "function") &&
        (typedObj["children"][0]["props"]["entry"] !== null &&
            typeof typedObj["children"][0]["props"]["entry"] === "object" ||
            typeof typedObj["children"][0]["props"]["entry"] === "function") &&
        typedObj["children"][0]["props"]["entry"]["type"] === "tombstone" &&
        (typedObj["children"][0]["props"]["entry"]["conversationPosition"] !== null &&
            typeof typedObj["children"][0]["props"]["entry"]["conversationPosition"] === "object" ||
            typeof typedObj["children"][0]["props"]["entry"]["conversationPosition"] === "function") &&
        typeof typedObj["children"][0]["props"]["entry"]["conversationPosition"]["showReplyContext"] === "boolean"
    )
}
