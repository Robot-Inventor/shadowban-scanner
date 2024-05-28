/*
 * Generated type guards for "reactProps.d.ts".
 * WARNING: Do not manually change this file.
 */
import { CellInnerDivProps } from "./reactProps";

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
