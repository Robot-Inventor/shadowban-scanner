import type { Settings } from "../../types/common/settings";
import type { TranslationKey } from "../../types/common/translator";

interface SettingsItem {
    settingsName: keyof Settings;
    translationKey: TranslationKey;
    type: "checkbox";
}

interface SettingsSeparator {
    translationKey: TranslationKey;
    type: "separator";
}

interface SettingsDescription {
    translationKey: TranslationKey;
    type: "description";
}

type SettingsItems = Array<SettingsItem | SettingsSeparator | SettingsDescription>;

const SETTINGS_ITEMS = [
    {
        translationKey: "settingsWhereToDisplayCheckResults",
        type: "separator"
    },
    {
        translationKey: "settingsAlwaysShowMessagesIfYourAccountShadowbanned",
        type: "description"
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
    }
] as const satisfies SettingsItems;

export { SETTINGS_ITEMS };
