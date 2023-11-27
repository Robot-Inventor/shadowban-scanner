import browser from "webextension-polyfill";

/**
 * Migrate settings from v2 to v2.1.
 */
const migrateFromV2ToV2Dot1 = async (): Promise<void> => {
    const currentSettings = await browser.storage.local.get(null);

    if ("hasDisplayedV2UpdateBanner" in currentSettings) {
        await browser.storage.local.remove("hasDisplayedV2UpdateBanner");
    }

    if ("enableOnlyForCurrentUsersTweets" in currentSettings) {
        await browser.storage.local.remove("enableOnlyForCurrentUsersTweets");

        if (currentSettings.enableOnlyForCurrentUsersTweets) {
            await browser.storage.local.set({ enableForOtherUsersTweets: false });
        }
    }
};

export { migrateFromV2ToV2Dot1 };
