import { ONBOARDING_URL, RELEASE_NOTE_URL } from "./common/constants";
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
        const welcomeURL = isJapanese ? ONBOARDING_URL.ja : ONBOARDING_URL.en;
        void browser.tabs.create({ url: welcomeURL });
    }
});
