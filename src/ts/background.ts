chrome.runtime.onInstalled.addListener((details) => {
    const isJapanese = chrome.i18n.getUILanguage() === "ja";

    if (details.reason === chrome.runtime.OnInstalledReason.UPDATE) {
        const releaseNoteURL = isJapanese
            ? "https://robot-inventor.github.io/article/2023/09/30/shadowban-scanner-v2-release/"
            : "https://robot-inventor.github.io/article/2023/09/30/shadowban-scanner-v2-release/en/";
        void chrome.tabs.create({ url: releaseNoteURL });

        return;
    }

    if (details.reason === chrome.runtime.OnInstalledReason.INSTALL) {
        const welcomeURL = isJapanese
            ? "https://github.com/Robot-Inventor/shadowban-scanner/blob/main/README_ja.md"
            : "https://github.com/Robot-Inventor/shadowban-scanner/blob/main/README.md";
        void chrome.tabs.create({ url: welcomeURL });
    }
});
