import { DEFAULT_SETTINGS } from "./defaultSettings";

const translationTargets: NodeListOf<HTMLElement> = document.querySelectorAll("[data-translation]");
for (const translationTarget of translationTargets) {
    const translationAttribute = translationTarget.dataset.translation;
    if (!translationAttribute) throw new Error("Failed to get translation attribute");
    const text = browser.i18n.getMessage(translationAttribute);
    translationTarget.textContent = text;
}

const inputElements: NodeListOf<HTMLInputElement> = document.querySelectorAll("input[type='checkbox']");
for (const inputElement of inputElements) {
    browser.storage.local.get(DEFAULT_SETTINGS).then((currentSettings) => {
        if (!(inputElement.name in currentSettings)) throw new Error(`Failed to get ${inputElement.name} from storage`);
        inputElement.checked = currentSettings[inputElement.name as keyof typeof DEFAULT_SETTINGS];
    });

    inputElement.addEventListener("input", () => {
        browser.storage.local.set({ [inputElement.name]: inputElement.checked });
    });
}

const { version } = browser.runtime.getManifest();
const versionElement = document.getElementById("version-number");
if (!versionElement) throw new Error("Failed to get #version-number element");
versionElement.textContent = `v${version}`;
