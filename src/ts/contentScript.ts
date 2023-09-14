import { TextFlow, TextFlowOptions } from "./common/textFlow";
import { DEFAULT_SETTINGS } from "./common/defaultSettings";
import { EVENT_GENERATOR_ID } from "./common/settings";

const pageScript = document.createElement("script");
pageScript.src = browser.runtime.getURL("dist/js/pageScript.js");

pageScript.addEventListener("load", () => {
    pageScript.remove();
    const eventGenerator = document.getElementById(EVENT_GENERATOR_ID);
    if (!eventGenerator) throw new Error("Failed to get event generator");

    void browser.storage.local.get(DEFAULT_SETTINGS).then((settings) => {
        const textFlowOptions: TextFlowOptions = {
            ...settings,
            translator: browser.i18n.getMessage
        };
        const textFlow = new TextFlow(textFlowOptions);

        eventGenerator.addEventListener("newMessage", () => {
            textFlow.run();
        });
    });
});

document.body.appendChild(pageScript);
