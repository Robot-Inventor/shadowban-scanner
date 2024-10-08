import { runtime } from "webextension-polyfill";

const loadVersion = (): void => {
    const { version } = runtime.getManifest();
    const versionElement = document.getElementById("version-number");
    if (!versionElement) throw new Error("Failed to get #version-number element");

    versionElement.textContent = `v${version}`;
    versionElement.setAttribute("href", `https://github.com/Robot-Inventor/shadowban-scanner/releases/tag/v${version}`);
};

export { loadVersion };
