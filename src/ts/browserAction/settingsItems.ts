const SETTINGS_ITEMS = [
    {
        translationKey: "settingsWhereToDisplayCheckResults",
        type: "separator"
    },
    {
        settingsName: "showMessagesInUnproblematicTweets",
        translationKey: "settingsShowMessagesInUnproblematicTweets",
        type: "checkbox"
    },
    {
        settingsName: "showMessagesInUnproblematicProfiles",
        translationKey: "settingsShowMessagesInUnproblematicProfiles",
        type: "checkbox"
    },
    {
        settingsName: "enableForOtherUsersTweets",
        translationKey: "settingsEnableForOtherUsersTweets",
        type: "checkbox"
    },
    {
        settingsName: "enableForOtherUsersProfiles",
        translationKey: "settingsEnableForOtherUsersProfiles",
        type: "checkbox"
    },
    {
        translationKey: "settingsOtherSettings",
        type: "separator"
    },
    {
        settingsName: "alwaysDetailedView",
        translationKey: "settingsAlwaysDetailedView",
        type: "checkbox"
    },
    {
        settingsName: "showNotesInMessages",
        translationKey: "settingsShowNotesInMessages",
        type: "checkbox"
    },
    {
        settingsName: "showTweetButton",
        translationKey: "settingsShowTweetButton",
        type: "checkbox"
    }
] as const;

export { SETTINGS_ITEMS };
