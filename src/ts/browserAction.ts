import { DEFAULT_SETTINGS } from "./common/defaultSettings";

const migrateFromV1ToV2 = async () => {
    const v1Settings = await browser.storage.local.get(null);
    if (!("showMessageInAllTweets" in v1Settings)) return;

    await browser.storage.local.set({ showMessagesInUnproblematicTweets: v1Settings.showMessageInAllTweets });
    await browser.storage.local.remove("showMessageInAllTweets");
};

const translationTargets: NodeListOf<HTMLElement> = document.querySelectorAll("[data-translation]");
for (const translationTarget of translationTargets) {
    const translationAttribute = translationTarget.dataset.translation;
    if (!translationAttribute) throw new Error("Failed to get translation attribute");
    const text = browser.i18n.getMessage(translationAttribute);
    translationTarget.textContent = text;
}

void migrateFromV1ToV2().then(() => {
    const inputElements: NodeListOf<HTMLInputElement> = document.querySelectorAll("input[type='checkbox']");
    for (const inputElement of inputElements) {
        void browser.storage.local.get(DEFAULT_SETTINGS).then((currentSettings) => {
            if (!(inputElement.name in currentSettings))
                // eslint-disable-next-line curly, nonblock-statement-body-position
                throw new Error(`Failed to get ${inputElement.name} from storage`);
            inputElement.checked = currentSettings[inputElement.name as keyof typeof DEFAULT_SETTINGS];
        });

        inputElement.addEventListener("input", () => {
            void browser.storage.local.set({ [inputElement.name]: inputElement.checked });
        });
    }
});

const { version } = browser.runtime.getManifest();
const versionElement = document.getElementById("version-number");
if (!versionElement) throw new Error("Failed to get #version-number element");
versionElement.textContent = `v${version}`;
versionElement.setAttribute("href", `https://github.com/Robot-Inventor/shadowban-scanner/releases/tag/v${version}`);
