// eslint-disable-next-line import-x/no-unassigned-import
import "../components/settingsItem";
// eslint-disable-next-line import-x/no-unassigned-import
import "../components/settingsDescription";
// eslint-disable-next-line import-x/no-unassigned-import
import "../components/settingsGroupTitle";
import { SETTINGS_ITEMS, type SettingsData, type SettingsItemData } from "./settingsItems";
import { i18n, runtime } from "webextension-polyfill";
import { loadSettingsFromStorage, writeSettingsToStorage } from "../common/settings";
import type { Settings } from "../../types/common/settings";
// eslint-disable-next-line no-duplicate-imports
import type { SettingsDescription } from "../components/settingsDescription";
// eslint-disable-next-line no-duplicate-imports
import type { SettingsGroupTitle } from "../components/settingsGroupTitle";
// eslint-disable-next-line no-duplicate-imports
import type { SettingsItem } from "../components/settingsItem";
import { TRANSLATION_ATTRIBUTE } from "../common/constants";
import { Translator } from "../common/translator";

/**
 * Create new settings group title element.
 * @param translationKey translation key
 * @returns created settings separator
 */
const createGroupTitle = (translationKey: string): SettingsGroupTitle => {
    const separator = document.createElement("settings-group-title");
    separator.setAttribute(TRANSLATION_ATTRIBUTE, translationKey);

    return separator;
};

/**
 * Create new settings description element.
 * @param translationKey translation key
 * @returns created settings description
 */
const createGroupDescription = (translationKey: string): SettingsDescription => {
    const description = document.createElement("settings-description");
    description.setAttribute(TRANSLATION_ATTRIBUTE, translationKey);

    return description;
};

/**
 * Create a new settings item element.
 * @param settingsItemData Settings item data
 * @param checked Settings status
 * @param isFirstItem Whether this is the first item
 * @param isLastItem Whether this is the last item
 * @returns The created settings item
 */
const createSettingsItem = (
    settingsItemData: SettingsItemData,
    checked: boolean,
    isFirstItem: boolean,
    isLastItem: boolean
    // eslint-disable-next-line max-params
): SettingsItem => {
    const item = document.createElement("settings-item");
    item.settingsName = settingsItemData.settingsName;
    item.setAttribute(TRANSLATION_ATTRIBUTE, settingsItemData.translationKey);
    item.checked = checked;
    item.isFirstItem = isFirstItem;
    item.isLastItem = isLastItem;
    item.addEventListener("change", () => {
        void writeSettingsToStorage({ [item.settingsName]: item.checked });
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
 * Create settings items from group.
 * @param settings settings
 * @param group settings item group
 * @returns created elements
 */
const createItemsFromGroup = (settings: Settings, group: SettingsData[number]): DocumentFragment => {
    const fragment = document.createDocumentFragment();
    fragment.appendChild(createGroupTitle(group.groupName));
    if (group.description) {
        fragment.appendChild(createGroupDescription(group.description));
    }

    for (const [index, item] of group.items.entries()) {
        // eslint-disable-next-line no-magic-numbers
        const isFirstItem = index === 0;
        // eslint-disable-next-line no-magic-numbers
        const isLastItem = index === group.items.length - 1;
        const settingsItem = createSettingsItem(item, settings[item.settingsName], isFirstItem, isLastItem);
        fragment.appendChild(settingsItem);
    }

    return fragment;
};

/**
 * Load settings UI.
 */
const loadSettings = async (): Promise<void> => {
    const settings = await loadSettingsFromStorage();

    const fieldset = document.querySelector("fieldset");
    if (!fieldset) throw new Error("Failed to get fieldset");
    const fragment = document.createDocumentFragment();

    for (const settingsGroup of SETTINGS_ITEMS) {
        const element = createItemsFromGroup(settings, settingsGroup);
        fragment.appendChild(element);
    }

    fieldset.appendChild(fragment);
    runTranslation();
};

export { loadSettings };
