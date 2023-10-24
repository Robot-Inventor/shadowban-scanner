import browser from "webextension-polyfill";

/**
 * Migrate settings from v1 to v2.
 * @returns {Promise<void>}
 */
const migrateFromV1ToV2 = async () => {
    const currentSettings = await browser.storage.local.get(null);

    if ("showMessageInAllTweets" in currentSettings) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        await browser.storage.local.set({ showMessagesInUnproblematicTweets: currentSettings.showMessageInAllTweets });
        await browser.storage.local.remove("showMessageInAllTweets");
    }
};

const migrateFromV2ToV2Dot1 = async () => {
    const currentSettings = await browser.storage.local.get(null);

    if ("hasDisplayedV2UpdateBanner" in currentSettings) {
        await browser.storage.local.remove("hasDisplayedV2UpdateBanner");
    }

    if ("enableOnlyForCurrentUsersTweets" in currentSettings) {
        await browser.storage.local.remove("enableOnlyForCurrentUsersTweets");

        if (!currentSettings.enableOnlyForCurrentUsersTweets) {
            await browser.storage.local.set({ enableForOtherUsersTweets: true });
        }
    }
};

export { migrateFromV1ToV2, migrateFromV2ToV2Dot1 };
