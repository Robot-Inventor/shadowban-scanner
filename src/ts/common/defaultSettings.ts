import { Settings } from "../@types/common/settings";

const DEFAULT_SETTINGS = {
    alwaysDetailedView: false,
    enableOnlyForCurrentUsersTweets: false,
    showMessagesInUnproblematicTweets: false
} as const satisfies Settings;

export { DEFAULT_SETTINGS };
