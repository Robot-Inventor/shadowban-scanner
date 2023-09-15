const migrateFromV1ToV2 = async () => {
    const v1Settings = await browser.storage.local.get(null);
    if (!("showMessageInAllTweets" in v1Settings)) return;

    await browser.storage.local.set({ showMessagesInUnproblematicTweets: v1Settings.showMessageInAllTweets });
    await browser.storage.local.remove("showMessageInAllTweets");
};

export { migrateFromV1ToV2 };
