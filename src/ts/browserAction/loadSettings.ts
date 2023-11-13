import "../components/settingsItem";
import "../components/settingsSeparator";
import { DEFAULT_SETTINGS } from "../common/defaultSettings";
import { SETTINGS_ITEMS } from "./settingsItems";
import { Settings } from "../@types/common/settings";
import { TRANSLATION_ATTRIBUTE } from "../common/constants";
import { Translator } from "../common/translator";
import browser from "webextension-polyfill";
import { isSettings } from "../@types/common/settings.guard";

/**
 * Load settings from local storage.
 * @returns settings
 */
const loadSettingsFromStorage = async () => {
    const settings = await browser.storage.local.get(DEFAULT_SETTINGS);
    if (!isSettings(settings)) throw new Error("Failed to get settings from storage");

    return settings;
};

/**
 * Create new settings separator element.
 * @param translationKey translation key
 * @returns created settings separator
 */
const createSettingsSeparator = (translationKey: string) => {
    const separator = document.createElement("settings-separator");
    separator.setAttribute(TRANSLATION_ATTRIBUTE, translationKey);

    return separator;
};

/**
 * Create new settings item element.
 * @param settingsName settings name
 * @param translationKey translation key
 * @param checked settings status
 * @returns created settings item
 */
const createSettingsItem = (settingsName: string, translationKey: string, checked: boolean) => {
    const item = document.createElement("settings-item");
    item.settingsName = settingsName;
    item.setAttribute(TRANSLATION_ATTRIBUTE, translationKey);
    item.checked = checked;
    item.addEventListener("change", () => {
        void browser.storage.local.set({ [item.settingsName]: item.checked });
    });

    return item;
};

/**
 * Run translation.
 */
const runTranslation = () => {
    const translator = new Translator((key) => browser.i18n.getMessage(key), browser.runtime.getURL("dist/image/"));
    translator.translateElements();
};

/**
 * Create settings item or separator element from data.
 * @param settings settings
 * @param data settings item data
 * @returns created element
 */
const createItemsFromData = (settings: Settings, data: (typeof SETTINGS_ITEMS)[number]) => {
    if (data.type === "separator") {
        return createSettingsSeparator(data.translationKey);
    } else if (data.type === "checkbox") {
        return createSettingsItem(data.settingsName, data.translationKey, settings[data.settingsName]);
    }

    throw new Error("Invalid data");
};

/**
 * Load settings UI.
 */
const loadSettings = async () => {
    const settings = await loadSettingsFromStorage();

    const fieldset = document.querySelector("fieldset");
    if (!fieldset) throw new Error("Failed to get fieldset");
    const fragment = document.createDocumentFragment();

    for (const data of SETTINGS_ITEMS) {
        const element = createItemsFromData(settings, data);
        fragment.appendChild(element);
    }

    fieldset.appendChild(fragment);
    runTranslation();
};

export { loadSettings };
