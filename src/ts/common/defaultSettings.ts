import { Settings } from "../@types/common/settings";

/**
 * Default settings used in the extension's initial state and user scripts.
 */
const DEFAULT_SETTINGS = {
    alwaysDetailedView: false,
    enableForOtherUsersProfiles: true,
    enableForOtherUsersTweets: true,
    showMessagesInUnproblematicProfiles: true,
    showMessagesInUnproblematicTweets: false,
    showNotesInMessages: true,
    showTweetButton: true
} as const satisfies Settings;

export { DEFAULT_SETTINGS };
