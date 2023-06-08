const translationTargets = document.querySelectorAll("[data-translation]");
for (const translationTarget of translationTargets) {
    const text = chrome.i18n.getMessage(translationTarget.dataset.translation);
    translationTarget.textContent = text;
}

const inputElements = document.querySelectorAll("input[type='checkbox']");
for (const inputElement of inputElements) {
    chrome.storage.local.get([inputElement.name]).then((currentSettings) => {
        inputElement.checked = currentSettings[inputElement.name];
    });

    inputElement.addEventListener("input", () => {
        chrome.storage.local.set({ [inputElement.name]: inputElement.checked });
    });
}
