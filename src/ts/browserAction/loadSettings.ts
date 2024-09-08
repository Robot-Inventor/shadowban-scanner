// eslint-disable-next-line import-x/no-unassigned-import
import "../components/settingsItem";
// eslint-disable-next-line import-x/no-unassigned-import
import "../components/settingsDescription";
// eslint-disable-next-line import-x/no-unassigned-import
import "../components/settingsSeparator";
import { i18n, runtime, storage } from "webextension-polyfill";
import { DEFAULT_SETTINGS } from "../common/defaultSettings";
import { SETTINGS_ITEMS } from "./settingsItems";
import type { Settings } from "../../types/common/settings";
// eslint-disable-next-line no-duplicate-imports
import type { SettingsDescription } from "../components/settingsDescription";
// eslint-disable-next-line no-duplicate-imports
import type { SettingsItem } from "../components/settingsItem";
// eslint-disable-next-line no-duplicate-imports
import type { SettingsSeparator } from "../components/settingsSeparator";
import { TRANSLATION_ATTRIBUTE } from "../common/constants";
import { Translator } from "../common/translator";
import { isSettings } from "../../types/common/settings.guard";

/**
 * Load settings from local storage.
 * @returns settings
 */
const loadSettingsFromStorage = async (): Promise<Settings> => {
    const settings = await storage.local.get(DEFAULT_SETTINGS);
    if (!isSettings(settings)) throw new Error("Failed to get settings from storage");

    return settings;
};

/**
 * Create new settings separator element.
 * @param translationKey translation key
 * @returns created settings separator
 */
const createSettingsSeparator = (translationKey: string): SettingsSeparator => {
    const separator = document.createElement("settings-separator");
    separator.setAttribute(TRANSLATION_ATTRIBUTE, translationKey);

    return separator;
};

const createSettingsDescription = (translationKey: string): SettingsDescription => {
    const description = document.createElement("settings-description");
    description.setAttribute(TRANSLATION_ATTRIBUTE, translationKey);

    return description;
};

/**
 * Create new settings item element.
 * @param settingsName settings name
 * @param translationKey translation key
 * @param checked settings status
 * @returns created settings item
 */
const createSettingsItem = (settingsName: string, translationKey: string, checked: boolean): SettingsItem => {
    const item = document.createElement("settings-item");
    item.settingsName = settingsName;
    item.setAttribute(TRANSLATION_ATTRIBUTE, translationKey);
    item.checked = checked;
    item.addEventListener("change", () => {
        void storage.local.set({ [item.settingsName]: item.checked });
    });

    return item;
};

/**
 * Run translation.
 */
const runTranslation = (): void => {
    const translator = new Translator((key) => i18n.getMessage(key), runtime.getURL("image/"));
    translator.translateElements();
};

/**
 * Create settings item or separator element from data.
 * @param settings settings
 * @param data settings item data
 * @returns created element
 */
const createItemsFromData = (
    settings: Settings,
    data: (typeof SETTINGS_ITEMS)[number]
): SettingsSeparator | SettingsDescription | SettingsItem => {
    switch (data.type) {
        case "separator":
            return createSettingsSeparator(data.translationKey);

        case "description":
            return createSettingsDescription(data.translationKey);

        case "checkbox":
            return createSettingsItem(data.settingsName, data.translationKey, settings[data.settingsName]);

        default:
            throw new Error("Invalid type");
    }
};

/**
 * Load settings UI.
 */
const loadSettings = async (): Promise<void> => {
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
