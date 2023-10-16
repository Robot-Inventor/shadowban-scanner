import { ONBOARDING_URL, RELEASE_NOTE_URL } from "./common/constants";

chrome.runtime.onInstalled.addListener((details) => {
    const isJapanese = chrome.i18n.getUILanguage() === "ja";

    if (details.reason === chrome.runtime.OnInstalledReason.UPDATE) {
        const releaseNoteURL = isJapanese ? RELEASE_NOTE_URL.ja : RELEASE_NOTE_URL.en;
        void chrome.tabs.create({ url: releaseNoteURL });

        return;
    }

    if (details.reason === chrome.runtime.OnInstalledReason.INSTALL) {
        const welcomeURL = isJapanese ? ONBOARDING_URL.ja : ONBOARDING_URL.en;
        void chrome.tabs.create({ url: welcomeURL });
    }
});
