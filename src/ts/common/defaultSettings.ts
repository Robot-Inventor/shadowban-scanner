import { Settings } from "../@types/common/settings";

/**
 * Default settings used in the extension's initial state and user scripts.
 */
const DEFAULT_SETTINGS = {
    alwaysDetailedView: false,
    enableOnlyForCurrentUsersTweets: false,
    showMessagesInUnproblematicTweets: false
} as const satisfies Settings;

export { DEFAULT_SETTINGS };
