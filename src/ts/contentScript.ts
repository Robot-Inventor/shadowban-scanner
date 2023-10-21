import { EVENT_GENERATOR_ID, EVENT_GENERATOR_SETTINGS_ATTRIBUTE } from "./common/constants";
import { DEFAULT_SETTINGS } from "./common/defaultSettings";
import { Translator } from "./common/translator";
import browser from "webextension-polyfill";

// eslint-disable-next-line max-statements
const main = async () => {
    const settings = await browser.storage.local.get(DEFAULT_SETTINGS);

    const translator = new Translator((key) => browser.i18n.getMessage(key), browser.runtime.getURL("dist/image/"));

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
