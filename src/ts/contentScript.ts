import { EVENT_GENERATOR_ID, EVENT_GENERATOR_SETTINGS_ATTRIBUTE } from "./common/constants";
import { i18n, runtime, storage } from "webextension-polyfill";
import { DEFAULT_SETTINGS } from "./common/settings";
import { Translator } from "./common/translator";
import { isSettings } from "../types/common/settings.guard";

// eslint-disable-next-line max-statements
const main = async (): Promise<void> => {
    const settings = await storage.local.get(DEFAULT_SETTINGS);

    if (
        ["pro.twitter.com", "pro.x.com"].includes(location.hostname) &&
        isSettings(settings) &&
        !settings.enableOnXPro
    ) {
        return;
    }

    const translator = new Translator(
        (key, substitutions) => i18n.getMessage(key, substitutions),
        runtime.getURL("image/")
    );

    const eventGenerator = document.createElement("div");
    const settingsString = JSON.stringify(settings);
    eventGenerator.setAttribute(EVENT_GENERATOR_SETTINGS_ATTRIBUTE, settingsString);
    eventGenerator.id = EVENT_GENERATOR_ID;
    eventGenerator.addEventListener("newMessage", () => {
        translator.translateElements();
    });
    document.body.appendChild(eventGenerator);

    const pageScript = document.createElement("script");
    pageScript.src = runtime.getURL("js/pageScript.js");
    document.body.appendChild(pageScript);
};

void main();
