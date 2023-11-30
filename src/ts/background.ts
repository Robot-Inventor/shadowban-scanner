import { ONBOARDING_URL } from "./common/constants";
import browser from "webextension-polyfill";
import { migrateFromV2ToV2Dot1 } from "./migrator";

/**
 * This function is called when the extension is updated.
 * - If the extension is updated from v1 to v2, migrate settings from v1 to v2.
 * - If the extension is updated from v2 to v2.1, migrate settings from v2 to v2.1.
 * - If the extension is not under development, open the release note page.
 * @param details details of the update
 * @param isJapanese if the user's language is Japanese
 */
const onUpdated = (details: browser.Runtime.OnInstalledDetailsType, isJapanese: boolean): void => {
    void migrateFromV2ToV2Dot1();

    // Do nothing while development
    if (details.previousVersion === browser.runtime.getManifest().version) return;

    const aboutPermissionsURL = {
        en: browser.runtime.getURL("dist/html/aboutPermissions.en.html"),
        ja: browser.runtime.getURL("dist/html/aboutPermissions.ja.html")
    };

    const releaseNoteURL = isJapanese ? aboutPermissionsURL.ja : aboutPermissionsURL.en;
    void browser.tabs.create({ url: releaseNoteURL });
};

/**
 * This function is called when the extension is installed.
 * This function opens the onboarding page.
 * @param isJapanese if the user's language is Japanese
 */
const onInstalled = (isJapanese: boolean): void => {
    // Temporary disable onboarding page until it is created
    return;
    const welcomeURL = isJapanese ? ONBOARDING_URL.ja : ONBOARDING_URL.en;
    void browser.tabs.create({ url: welcomeURL });
};

browser.runtime.onInstalled.addListener((details) => {
    const isJapanese = browser.i18n.getUILanguage().toLowerCase().startsWith("ja");

    if (details.reason === "update") {
        onUpdated(details, isJapanese);
        return;
    }

    if (details.reason === "install") {
        onInstalled(isJapanese);
    }
});
