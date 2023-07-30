import { TextFlow, TextFlowOptions } from "./common/textFlow";
import { DEFAULT_SETTINGS } from "./common/defaultSettings";
import { EVENT_GENERATOR_ID } from "./common/settings";

const pageScript = document.createElement("script");
pageScript.src = browser.runtime.getURL("dist/js/pageScript.js");

// eslint-disable-next-line @typescript-eslint/no-misused-promises
pageScript.addEventListener("load", async () => {
    pageScript.remove();
    const eventGenerator = document.getElementById(EVENT_GENERATOR_ID);
    if (!eventGenerator) throw new Error("Failed to get event generator");

    const settings = await browser.storage.local.get(DEFAULT_SETTINGS);

    const textFlowOptions: TextFlowOptions = {
        ...settings,
        translator: browser.i18n.getMessage
    };
    const textFlow = new TextFlow(textFlowOptions);

    eventGenerator.addEventListener("newMessage", () => {
        textFlow.run();
    });
});

document.body.appendChild(pageScript);
