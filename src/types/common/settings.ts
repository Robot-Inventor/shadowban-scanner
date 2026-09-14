import { createIs } from "typia";

interface Settings {
    alwaysDetailedView: boolean;
    enableForOtherUsersProfiles: boolean;
    enableForOtherUsersTweets: boolean;
    showMessagesInUnproblematicProfiles: boolean;
    showMessagesInUnproblematicTweets: boolean;
    showNotesInMessages: boolean;
    showTweetButton: boolean;
    enableCompactMode: boolean;
    enableColorAccessibilityMode: boolean;
    enableOnXPro: boolean;
    showReleaseNotes: boolean;
}

const isSettings = createIs<Settings>();

export { type Settings, isSettings };
