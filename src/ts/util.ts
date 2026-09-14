import { type BrowserType, EXTENSION_STORE_LINKS, type ExtensionStoreType } from "./constants";

declare global {
    interface Navigator {
        brave?: {
            isBrave?: () => Promise<boolean>;
        };
    }
}

/**
 * @param userAgent The User-Agent string to inspect.
 * @returns The browser type detected from the User-Agent string.
 */
const getBrowserFromUserAgent = (userAgent: string): BrowserType | null => {
    if (userAgent.includes("firefox")) return "firefox";
    if (userAgent.includes("edg")) return "edge";
    if (userAgent.includes("vivaldi/")) return "vivaldi";
    return null;
};

const isKiwiBrowser = (userAgent: string): boolean =>
    // Ref: https://github.com/kiwibrowser/src.next/issues/164#issuecomment-1480239313
    Boolean(window.chrome?.app && userAgent.includes("android"));

/**
 * Detects the type of browser the user is using.
 * If the browser is not matched with any of the known browsers, it will return `chrome`.
 * @returns The type of browser the user is using.
 */
const detectBrowser = async (): Promise<BrowserType> => {
    const userAgent = navigator.userAgent.toLowerCase();

    const browserFromUserAgent = getBrowserFromUserAgent(userAgent);
    if (browserFromUserAgent) return browserFromUserAgent;

    const isBrave = await navigator.brave?.isBrave?.();
    if (isBrave) return "brave";

    if (isKiwiBrowser(userAgent)) return "kiwiBrowser";

    return "chrome";
};

/**
 * Get the extension store link for the current browser.
 * @param browser The type of the current browser.
 * @returns The extension store link for the current browser.
 */
const getExtensionStoreLink = (browser: BrowserType): (typeof EXTENSION_STORE_LINKS)[ExtensionStoreType] => {
    const extensionStoreType = browser === "edge" || browser === "firefox" ? browser : "chrome";

    return EXTENSION_STORE_LINKS[extensionStoreType];
};

export { detectBrowser, getExtensionStoreLink };
