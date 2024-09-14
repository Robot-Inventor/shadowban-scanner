import { ONBOARDING_PATH, RELEASE_NOTE_URL, SHOW_RELEASE_NOTES } from "./common/constants";
import { type Runtime, i18n, runtime, tabs } from "webextension-polyfill";
import { loadSettingsFromStorage } from "./common/settings";

/**
 * This function is called when the extension is updated.
 * - If the extension is not under development, open the release note page.
 * @param details details of the update
 * @param isJapanese if the user's language is Japanese
 */
const onUpdated = async (details: Runtime.OnInstalledDetailsType, isJapanese: boolean): Promise<void> => {
    const settings = await loadSettingsFromStorage();
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (!SHOW_RELEASE_NOTES || !settings.showReleaseNotes) return;

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
        void onUpdated(details, isJapanese);
        return;
    }

    if (details.reason === "install") {
        onInstalled();
    }
});
