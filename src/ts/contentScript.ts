import { EVENT_GENERATOR_ID, EVENT_GENERATOR_SETTINGS_ATTRIBUTE } from "./common/constants";
import { DEFAULT_SETTINGS } from "./common/defaultSettings";
import { Translator } from "./common/translator";

void browser.storage.local.get(DEFAULT_SETTINGS).then((settings) => {
    const pageScript = document.createElement("script");
    pageScript.src = browser.runtime.getURL("dist/js/pageScript.js");

    const translator = new Translator(browser.i18n.getMessage);

    const eventGenerator = document.createElement("div");
    const settingsString = JSON.stringify(settings);
    eventGenerator.setAttribute(EVENT_GENERATOR_SETTINGS_ATTRIBUTE, settingsString);
    eventGenerator.id = EVENT_GENERATOR_ID;
    eventGenerator.addEventListener("newMessage", () => {
        translator.translateElements();
    });

    document.body.appendChild(eventGenerator);
    document.body.appendChild(pageScript);
});
