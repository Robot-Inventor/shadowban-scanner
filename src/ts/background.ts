import { ONBOARDING_PATH, RELEASE_NOTE_URL } from "./common/constants";
import { type Runtime, i18n, runtime, tabs } from "webextension-polyfill";

/**
 * This function is called when the extension is updated.
 * - If the extension is not under development, open the release note page.
 * @param details details of the update
 * @param isJapanese if the user's language is Japanese
 */
const onUpdated = (details: Runtime.OnInstalledDetailsType, isJapanese: boolean): void => {
    // Temporarily disable the release note page
    return;
    // Do nothing while development
    if (details.previousVersion === runtime.getManifest().version) return;

    const releaseNoteURL = isJapanese ? RELEASE_NOTE_URL.ja : RELEASE_NOTE_URL.en;
    void tabs.create({ url: releaseNoteURL });
};

/**
 * This function is called when the extension is installed.
 * This function opens the onboarding page.
 */
const onInstalled = (): void => {
    const url = runtime.getURL(ONBOARDING_PATH);
    void tabs.create({ url });
};

runtime.onInstalled.addListener((details) => {
    const isJapanese = i18n.getUILanguage().toLowerCase().startsWith("ja");

    if (details.reason === "update") {
        onUpdated(details, isJapanese);
        return;
    }

    if (details.reason === "install") {
        onInstalled();
    }
});
