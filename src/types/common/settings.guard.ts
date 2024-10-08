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
        typeof typedObj["enableForOtherUsersProfiles"] === "boolean" &&
        typeof typedObj["enableForOtherUsersTweets"] === "boolean" &&
        typeof typedObj["showMessagesInUnproblematicProfiles"] === "boolean" &&
        typeof typedObj["showMessagesInUnproblematicTweets"] === "boolean" &&
        typeof typedObj["showNotesInMessages"] === "boolean" &&
        typeof typedObj["showTweetButton"] === "boolean" &&
        typeof typedObj["enableCompactMode"] === "boolean" &&
        typeof typedObj["enableOnXPro"] === "boolean" &&
        typeof typedObj["showReleaseNotes"] === "boolean"
    )
}
