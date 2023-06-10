import { DEFAULT_SETTINGS } from "./defaultSettings";

const pageScript = document.createElement("script");
pageScript.src = browser.runtime.getURL("dist/js/pageScript.js");

pageScript.addEventListener("load", async () => {
    pageScript.remove();
    const eventGenerator = document.getElementById("shadowban-scanner-event-generator");
    if (!eventGenerator) throw new Error("Failed to get event generator");

    const settings = await browser.storage.local.get(DEFAULT_SETTINGS);

    if (!settings.showMessageInAllTweets) {
        const style = document.createElement("style");
        style.textContent = ".shadowban-scanner-message-no-problem { display: none; }";
        document.body.appendChild(style);
    }

    eventGenerator.addEventListener("newMessage", () => {
        const target: HTMLElement | null = document.querySelector(".shadowban-scanner-message:not(.text-inserted");
        if (!target) return;

        target.classList.add("text-inserted");
        const { messageType } = target.dataset;
        if (!messageType) throw new Error("Failed to get message type");

        const message = browser.i18n.getMessage(messageType);
        target.insertAdjacentText("afterbegin", message);

        const button = target.querySelector("button");
        if (!button) return;

        if (settings.alwaysDetailedView) {
            button.click();
        } else {
            button.textContent = browser.i18n.getMessage("showMore");
        }

        const pre = target.querySelector("pre");
        if (!pre) return;
        pre.textContent = browser.i18n.getMessage(`${messageType}StatusMessage`);
    });
});

document.body.appendChild(pageScript);
