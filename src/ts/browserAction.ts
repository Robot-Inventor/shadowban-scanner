import "@material/web/checkbox/checkbox.js";
import "./components/settingsItem";
import "./components/settingsSeparator";
import { DEFAULT_SETTINGS } from "./common/defaultSettings";
import { TRANSLATION_ATTRIBUTE } from "./common/constants";
import { Translator } from "./common/translator";
import browser from "webextension-polyfill";
import { isSettings } from "./@types/common/settings.guard";

const SETTINGS_DATA = [
    {
        translationKey: "settingsWhereToDisplayCheckResults",
        type: "separator"
    },
    {
        settingsName: "showMessagesInUnproblematicTweets",
        translationKey: "settingsShowMessagesInUnproblematicTweets",
        type: "checkbox"
    },
    {
        settingsName: "showMessagesInUnproblematicProfiles",
        translationKey: "settingsShowMessagesInUnproblematicProfiles",
        type: "checkbox"
    },
    {
        settingsName: "enableForOtherUsersTweets",
        translationKey: "settingsEnableForOtherUsersTweets",
        type: "checkbox"
    },
    {
        settingsName: "enableForOtherUsersProfiles",
        translationKey: "settingsEnableForOtherUsersProfiles",
        type: "checkbox"
    },
    {
        translationKey: "settingsOtherSettings",
        type: "separator"
    },
    {
        settingsName: "alwaysDetailedView",
        translationKey: "settingsAlwaysDetailedView",
        type: "checkbox"
    },
    {
        settingsName: "showNotesInMessages",
        translationKey: "settingsShowNotesInMessages",
        type: "checkbox"
    },
    {
        settingsName: "showTweetButton",
        translationKey: "settingsShowTweetButton",
        type: "checkbox"
    }
] as const;

// eslint-disable-next-line max-statements
const loadSettings = async () => {
    const settings = await browser.storage.local.get(DEFAULT_SETTINGS);
    if (!isSettings(settings)) throw new Error("Failed to get settings from storage");

    const fieldset = document.querySelector("fieldset");
    const fieldsetFragment = document.createDocumentFragment();

    for (const data of SETTINGS_DATA) {
        if (data.type === "separator") {
            const separator = document.createElement("settings-separator");
            separator.setAttribute(TRANSLATION_ATTRIBUTE, data.translationKey);

            fieldsetFragment.appendChild(separator);
        } else if (data.type === "checkbox") {
            const item = document.createElement("settings-item");
            item.settingsName = data.settingsName;
            item.setAttribute(TRANSLATION_ATTRIBUTE, data.translationKey);
            item.checked = settings[data.settingsName as keyof typeof DEFAULT_SETTINGS];
            item.addEventListener("change", () => {
                void browser.storage.local.set({ [item.settingsName]: item.checked });
            });

            fieldsetFragment.appendChild(item);
        }
    }

    fieldset?.appendChild(fieldsetFragment);

    const translator = new Translator((key) => browser.i18n.getMessage(key), browser.runtime.getURL("dist/image/"));
    translator.translateElements();
};

void loadSettings();

const { version } = browser.runtime.getManifest();
const versionElement = document.getElementById("version-number");
if (!versionElement) throw new Error("Failed to get #version-number element");
versionElement.textContent = `v${version}`;
versionElement.setAttribute("href", `https://github.com/Robot-Inventor/shadowban-scanner/releases/tag/v${version}`);
