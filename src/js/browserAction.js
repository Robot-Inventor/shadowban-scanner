const DEFAULT_SETTINGS = {
    alwaysDetailedView: false,
    showMessageInAllTweets: false
};

const translationTargets = document.querySelectorAll("[data-translation]");
for (const translationTarget of translationTargets) {
    const text = browser.i18n.getMessage(translationTarget.dataset.translation);
    translationTarget.textContent = text;
}

const inputElements = document.querySelectorAll("input[type='checkbox']");
for (const inputElement of inputElements) {
    browser.storage.local.get(DEFAULT_SETTINGS).then((currentSettings) => {
        inputElement.checked = currentSettings[inputElement.name];
    });

    inputElement.addEventListener("input", () => {
        browser.storage.local.set({ [inputElement.name]: inputElement.checked });
    });
}
