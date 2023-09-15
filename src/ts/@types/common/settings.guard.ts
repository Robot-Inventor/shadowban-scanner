/*
 * Generated type guards for "settings.d.ts".
 * WARNING: Do not manually change this file.
 */
import { Settings } from "./settings";

export function isSettings(obj: unknown): obj is Settings {
    const typedObj = obj as Settings
    return (
        (typedObj !== null &&
            typeof typedObj === "object" ||
            typeof typedObj === "function") &&
        typeof typedObj["alwaysDetailedView"] === "boolean" &&
        typeof typedObj["enableOnlyForCurrentUsersTweets"] === "boolean" &&
        typeof typedObj["showMessagesInUnproblematicTweets"] === "boolean"
    )
}
