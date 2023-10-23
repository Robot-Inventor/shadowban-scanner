import { OFFBOARDING_URL, ONBOARDING_URL, RELEASE_NOTE_URL } from "./common/constants";
import browser from "webextension-polyfill";
import { migrateFromV1ToV2 } from "./migrator";

browser.runtime.onInstalled.addListener((details) => {
    const isJapanese = browser.i18n.getUILanguage() === "ja";

    if (details.reason === "update") {
        void migrateFromV1ToV2();

        const releaseNoteURL = isJapanese ? RELEASE_NOTE_URL.ja : RELEASE_NOTE_URL.en;
        void browser.tabs.create({ url: releaseNoteURL });

        return;
    }

    if (details.reason === "install") {
        void browser.tabs.create({ url: ONBOARDING_URL });
    }
});

void browser.runtime.setUninstallURL(OFFBOARDING_URL);
