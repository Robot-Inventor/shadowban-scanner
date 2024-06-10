/*
 * Generated type guards for "reactProps.d.ts".
 * WARNING: Do not manually change this file.
 */
import { CellInnerDivProps, TombstoneGrandchildPropsSimpleChildren, TombstoneGrandchildPropsArrayChildren, TombstoneGrandchildProps } from "./reactProps";

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

export function isTombstoneGrandchildPropsSimpleChildren(obj: unknown): obj is TombstoneGrandchildPropsSimpleChildren {
    const typedObj = obj as TombstoneGrandchildPropsSimpleChildren
    return (
        (typedObj !== null &&
            typeof typedObj === "object" ||
            typeof typedObj === "function") &&
        (typedObj["children"] !== null &&
            typeof typedObj["children"] === "object" ||
            typeof typedObj["children"] === "function") &&
        (typedObj["children"]["props"] !== null &&
            typeof typedObj["children"]["props"] === "object" ||
            typeof typedObj["children"]["props"] === "function") &&
        (typedObj["children"]["props"]["entry"] !== null &&
            typeof typedObj["children"]["props"]["entry"] === "object" ||
            typeof typedObj["children"]["props"]["entry"] === "function") &&
        typedObj["children"]["props"]["entry"]["type"] === "tombstone" &&
        (typedObj["children"]["props"]["entry"]["conversationPosition"] !== null &&
            typeof typedObj["children"]["props"]["entry"]["conversationPosition"] === "object" ||
            typeof typedObj["children"]["props"]["entry"]["conversationPosition"] === "function") &&
        typeof typedObj["children"]["props"]["entry"]["conversationPosition"]["showReplyContext"] === "boolean"
    )
}

export function isTombstoneGrandchildPropsArrayChildren(obj: unknown): obj is TombstoneGrandchildPropsArrayChildren {
    const typedObj = obj as TombstoneGrandchildPropsArrayChildren
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

export function isTombstoneGrandchildProps(obj: unknown): obj is TombstoneGrandchildProps {
    const typedObj = obj as TombstoneGrandchildProps
    return (
        (isTombstoneGrandchildPropsSimpleChildren(typedObj) as boolean ||
            isTombstoneGrandchildPropsArrayChildren(typedObj) as boolean)
    )
}
