import { EXTENSION_STORE_LINKS, type ExtensionStoreType } from "./constants";

type BrowserType = "chrome" | "edge" | "firefox" | "kiwiBrowser";

/**
 * Detects the type of browser the user is using.
 * If the browser is not matched with any of the known browsers, it will return `chrome`.
 * @returns The type of browser the user is using.
 */
const detectBrowser = (): BrowserType => {
    const isFirefox = navigator.userAgent.toLowerCase().includes("firefox");
    if (isFirefox) return "firefox";

    const isEdge = navigator.userAgent.toLowerCase().includes("edg");
    if (isEdge) return "edge";

    const isKiwiBrowser =
        // Ref: https://github.com/kiwibrowser/src.next/issues/164#issuecomment-1480239313
        window.chrome?.app && navigator.userAgent.toLowerCase().includes("android");
    if (isKiwiBrowser) return "kiwiBrowser";

    return "chrome";
};

/**
 * Get the extension store link for the current browser.
 * @returns The extension store link for the current browser.
 */
const getExtensionStoreLink = (): (typeof EXTENSION_STORE_LINKS)[ExtensionStoreType] => {
    const browser = detectBrowser();
    const extensionStoreType = browser === "kiwiBrowser" ? "chrome" : browser;

    return EXTENSION_STORE_LINKS[extensionStoreType];
};

export { type BrowserType, detectBrowser, getExtensionStoreLink };
