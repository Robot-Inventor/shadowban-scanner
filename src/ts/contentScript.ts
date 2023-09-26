import { EVENT_GENERATOR_ID, EVENT_GENERATOR_SETTINGS_ATTRIBUTE } from "./common/constants";
import { DEFAULT_SETTINGS } from "./common/defaultSettings";
import { Translator } from "./common/translator";
import { migrateFromV1ToV2 } from "./common/migrator";

// eslint-disable-next-line max-statements
const showV2Banner = () => {
    const banner = document.createElement("div");
    banner.id = "shadowban-scanner-banner";
    banner.innerHTML = browser.i18n.getMessage("ShadowbanScannerUpdatedTov2");

    const style = document.createElement("style");
    style.textContent = `
#shadowban-scanner-banner {
    position: fixed;
    top: 0;
    text-align: center;
    width: 100vw;
    padding: 0.5rem 0;
    background-color: rgb(29, 155, 240);
    color: white;
    font-family: sans-serif;
}

#shadowban-scanner-banner a {
    color: white;
    text-decoration: underline;
}

#shadowban-scanner-banner button {
    font-size: 1.5rem;
    position: absolute;
    top: 0;
    right: 1rem;
    background-color: transparent;
    border: none;
    color: white;
    cursor: pointer;
}
    `;

    const closeButton = document.createElement("button");
    closeButton.textContent = "×";
    closeButton.addEventListener("click", () => {
        banner.remove();
    });

    banner.appendChild(closeButton);
    document.body.appendChild(style);
    document.body.appendChild(banner);
};

// eslint-disable-next-line max-statements
const main = async () => {
    await migrateFromV1ToV2();

    const settings = await browser.storage.local.get(DEFAULT_SETTINGS);

    if (!settings.hasDisplayedV2UpdateBanner) {
        showV2Banner();
        await browser.storage.local.set({ hasDisplayedV2UpdateBanner: true });
    }

    const translator = new Translator(browser.i18n.getMessage);

    const eventGenerator = document.createElement("div");
    const settingsString = JSON.stringify(settings);
    eventGenerator.setAttribute(EVENT_GENERATOR_SETTINGS_ATTRIBUTE, settingsString);
    eventGenerator.id = EVENT_GENERATOR_ID;
    eventGenerator.addEventListener("newMessage", () => {
        translator.translateElements();
    });
    document.body.appendChild(eventGenerator);

    const pageScript = document.createElement("script");
    pageScript.src = browser.runtime.getURL("dist/js/pageScript.js");
    document.body.appendChild(pageScript);
};

void main();
