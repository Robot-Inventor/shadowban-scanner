import type { Settings } from "../../types/common/settings";
import { isSettings } from "../../types/common/settings.guard";
import { storage } from "webextension-polyfill";

/**
 * Default settings used in the extension's initial state and user scripts.
 */
const DEFAULT_SETTINGS = {
    alwaysDetailedView: false,
    enableForOtherUsersProfiles: true,
    enableForOtherUsersTweets: true,
    enableOnXPro: true,
    showMessagesInUnproblematicProfiles: true,
    showMessagesInUnproblematicTweets: false,
    showNotesInMessages: true,
    showReleaseNotes: true,
    showTweetButton: true
} as const satisfies Settings;

/**
 * Load settings from local storage.
 * @returns settings
 */
const loadSettingsFromStorage = async (): Promise<Settings> => {
    const settings = await storage.local.get(DEFAULT_SETTINGS);
    if (!isSettings(settings)) throw new Error("Failed to get settings from storage");

    return settings;
};

/**
 * Write settings to local storage.
 * @param settings settings to write
 */
const writeSettingsToStorage = async (settings: Partial<Settings>): Promise<void> => {
    await storage.local.set(settings);
};

export { DEFAULT_SETTINGS, loadSettingsFromStorage, writeSettingsToStorage };
