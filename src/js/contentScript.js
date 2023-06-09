const DEFAULT_SETTINGS = {
    alwaysDetailedView: false,
    showMessageInAllTweets: false
};

const pageScript = document.createElement("script");
pageScript.src = browser.runtime.getURL("src/js/pageScript.js");

pageScript.addEventListener("load", async () => {
    pageScript.remove();
    const eventGenerator = document.getElementById("shadowban-scanner-event-generator");

    const settings = await browser.storage.local.get(DEFAULT_SETTINGS);

    if (!settings.showMessageInAllTweets) {
        const style = document.createElement("style");
        style.textContent = ".shadowban-scanner-message-no-problem { display: none; }";
        document.body.appendChild(style);
    }

    eventGenerator.addEventListener("newMessage", () => {
        const target = document.querySelector(".shadowban-scanner-message:not(.text-inserted");

        target.classList.add("text-inserted");
        const { messageType } = target.dataset;

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
        pre.textContent = browser.i18n.getMessage(`${messageType}StatusMessage`);
    });
});

document.body.appendChild(pageScript);
