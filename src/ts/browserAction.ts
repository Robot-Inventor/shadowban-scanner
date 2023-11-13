import "@material/web/checkbox/checkbox.js";
import "./components/settingsItem";
import { DEFAULT_SETTINGS } from "./common/defaultSettings";
import { Translator } from "./common/translator";
import browser from "webextension-polyfill";
import { isSettings } from "./@types/common/settings.guard";

const translator = new Translator((key) => browser.i18n.getMessage(key), browser.runtime.getURL("dist/image/"));
translator.translateElements();

const settingsItems = document.querySelectorAll("settings-item");

for (const item of settingsItems) {
    void browser.storage.local.get(DEFAULT_SETTINGS).then((currentSettings) => {
        if (!isSettings(currentSettings))
            // eslint-disable-next-line curly, nonblock-statement-body-position
            throw new Error(`Failed to get ${item.settingsName} from storage`);

        item.checked = currentSettings[item.settingsName as keyof typeof DEFAULT_SETTINGS];
    });

    item.addEventListener("change", () => {
        void browser.storage.local.set({ [item.settingsName]: item.checked });
    });
}

const { version } = browser.runtime.getManifest();
const versionElement = document.getElementById("version-number");
if (!versionElement) throw new Error("Failed to get #version-number element");
versionElement.textContent = `v${version}`;
versionElement.setAttribute("href", `https://github.com/Robot-Inventor/shadowban-scanner/releases/tag/v${version}`);
