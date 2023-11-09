import "@material/web/checkbox/checkbox.js";
import { DEFAULT_SETTINGS } from "./common/defaultSettings";
import { Translator } from "./common/translator";
import browser from "webextension-polyfill";
import { isSettings } from "./@types/common/settings.guard";

const translator = new Translator((key) => browser.i18n.getMessage(key), browser.runtime.getURL("dist/image/"));
translator.translateElements();

const checkboxElements = document.querySelectorAll("md-checkbox");

for (const checkbox of checkboxElements) {
    void browser.storage.local.get(DEFAULT_SETTINGS).then((currentSettings) => {
        if (!isSettings(currentSettings))
            // eslint-disable-next-line curly, nonblock-statement-body-position
            throw new Error(`Failed to get ${checkbox.name} from storage`);
        checkbox.checked = currentSettings[checkbox.name as keyof typeof DEFAULT_SETTINGS];
    });

    checkbox.addEventListener("change", () => {
        void browser.storage.local.set({ [checkbox.name]: checkbox.checked });
    });
}

const { version } = browser.runtime.getManifest();
const versionElement = document.getElementById("version-number");
if (!versionElement) throw new Error("Failed to get #version-number element");
versionElement.textContent = `v${version}`;
versionElement.setAttribute("href", `https://github.com/Robot-Inventor/shadowban-scanner/releases/tag/v${version}`);
