import typia from "typia";

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

const isSettings = typia.createIs<Settings>();

export { type Settings, isSettings };
