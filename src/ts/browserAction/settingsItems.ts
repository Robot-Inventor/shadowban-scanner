import type { Settings } from "../../types/common/settings";
import type { TranslationKey } from "../../types/common/translator";

interface SettingsItemData {
    settingsName: keyof Settings;
    translationKey: TranslationKey;
    type: "checkbox";
}

interface SettingsGroup {
    groupName: TranslationKey;
    type: "group";
    description?: TranslationKey;
    items: SettingsItemData[];
}

type SettingsData = SettingsGroup[];

const SETTINGS_ITEMS = [
    {
        description: "settingsAlwaysShowMessagesIfYourAccountShadowbanned",
        groupName: "settingsWhereToDisplayCheckResults",
        items: [
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
            }
        ],
        type: "group"
    },
    {
        groupName: "settingsOtherSettings",
        items: [
            {
                settingsName: "enableCompactMode",
                translationKey: "settingsEnableCompactMode",
                type: "checkbox"
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
            },
            {
                settingsName: "enableOnXPro",
                translationKey: "settingsEnableOnXPro",
                type: "checkbox"
            },
            {
                settingsName: "showReleaseNotes",
                translationKey: "settingsShowReleaseNotes",
                type: "checkbox"
            },
            {
                settingsName: "enableColorAccessibilityMode",
                translationKey: "settingsEnableColorAccessibilityMode",
                type: "checkbox"
            }
        ],
        type: "group"
    }
] as const satisfies SettingsData;

export { type SettingsData, type SettingsItemData, SETTINGS_ITEMS };
