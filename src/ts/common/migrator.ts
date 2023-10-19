import browser from "webextension-polyfill";

/**
 * Migrate settings from v1 to v2.
 * @returns {Promise<void>}
 */
const migrateFromV1ToV2 = async () => {
    const currentSettings = await browser.storage.local.get(null);

    if ("hasDisplayedV2UpdateBanner" in currentSettings) {
        await browser.storage.local.remove("hasDisplayedV2UpdateBanner");
    }

    if (!("showMessageInAllTweets" in currentSettings)) return;

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    await browser.storage.local.set({ showMessagesInUnproblematicTweets: currentSettings.showMessageInAllTweets });
    await browser.storage.local.remove("showMessageInAllTweets");
};

export { migrateFromV1ToV2 };
