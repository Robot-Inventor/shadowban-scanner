import { ONBOARDING_PATH, RELEASE_NOTE_URL } from "./common/constants";
import browser from "webextension-polyfill";

/**
 * This function is called when the extension is updated.
 * - If the extension is updated from v1 to v2, migrate settings from v1 to v2.
 * - If the extension is updated from v2 to v2.1, migrate settings from v2 to v2.1.
 * - If the extension is not under development, open the release note page.
 * @param details details of the update
 * @param isJapanese if the user's language is Japanese
 */
// eslint-disable-next-line max-statements
const onUpdated = (details: browser.Runtime.OnInstalledDetailsType, isJapanese: boolean): void => {
    // Temporary disable release note page
    return;
    // Do nothing while development
    if (details.previousVersion === browser.runtime.getManifest().version) return;

    const releaseNoteURL = isJapanese ? RELEASE_NOTE_URL.ja : RELEASE_NOTE_URL.en;
    void browser.tabs.create({ url: releaseNoteURL });
};

/**
 * This function is called when the extension is installed.
 * This function opens the onboarding page.
 * @param isJapanese if the user's language is Japanese
 */
const onInstalled = (): void => {
    const url = browser.runtime.getURL(ONBOARDING_PATH);
    void browser.tabs.create({ url });
};

browser.runtime.onInstalled.addListener((details) => {
    const isJapanese = browser.i18n.getUILanguage().toLowerCase().startsWith("ja");

    if (details.reason === "update") {
        onUpdated(details, isJapanese);
        return;
    }

    if (details.reason === "install") {
        onInstalled();
    }
});
