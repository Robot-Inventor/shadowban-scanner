import "@material/web/checkbox/checkbox.js";
import { DEFAULT_SETTINGS } from "./common/defaultSettings";
import browser from "webextension-polyfill";
import { isSettings } from "./@types/common/settings.guard";
import { migrateFromV1ToV2 } from "./common/migrator";

const translationTargets: NodeListOf<HTMLElement> = document.querySelectorAll("[data-translation]");
for (const translationTarget of translationTargets) {
    const translationAttribute = translationTarget.dataset.translation;
    if (!translationAttribute) throw new Error("Failed to get translation attribute");
    const text = browser.i18n.getMessage(translationAttribute);
    translationTarget.textContent = text;
}

const translationLinks: NodeListOf<HTMLAnchorElement> = document.querySelectorAll("[data-translation-link]");
for (const translationLink of translationLinks) {
    const translationAttribute = translationLink.dataset.translationLink;
    if (!translationAttribute) throw new Error("Failed to get translation attribute");
    const url = browser.i18n.getMessage(translationAttribute);
    translationLink.setAttribute("href", url);
}

void migrateFromV1ToV2().then(() => {
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
});

const { version } = browser.runtime.getManifest();
const versionElement = document.getElementById("version-number");
if (!versionElement) throw new Error("Failed to get #version-number element");
versionElement.textContent = `v${version}`;
versionElement.setAttribute("href", `https://github.com/Robot-Inventor/shadowban-scanner/releases/tag/v${version}`);
