const script = document.createElement("script");
script.src = chrome.runtime.getURL("src/js/pageScript.js");
script.addEventListener("load", async () => {
    script.remove();
    const eventGenerator = document.getElementById("shadowban-scanner-event-generator");

    const settings = await chrome.storage.local.get({
        alwaysDetailedView: false,
        showMessageInAllTweets: false
    });

    if (!settings.showMessageInAllTweets) {
        const style = document.createElement("style");
        style.textContent = ".shadowban-scanner-message-no-problem { display: none; }";
        document.body.appendChild(style);
    }

    eventGenerator.addEventListener("newMessage", () => {
        const target = document.querySelector(".shadowban-scanner-message:not(.text-inserted");

        target.classList.add("text-inserted");
        const { messageType } = target.dataset;

        const message = chrome.i18n.getMessage(messageType);
        target.insertAdjacentText("afterbegin", message);

        const button = target.querySelector("button");
        if (!button) return;

        if (settings.alwaysDetailedView) {
            button.click();
        } else {
            button.textContent = chrome.i18n.getMessage("showMore");
        }

        const pre = target.querySelector("pre");
        pre.textContent = chrome.i18n.getMessage(`${messageType}StatusMessage`);
    });
});

document.body.appendChild(script);
