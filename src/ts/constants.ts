type BrowserType = "chrome" | "edge" | "firefox" | "kiwiBrowser" | "brave" | "vivaldi";

const EXTENSION_STORE_LINKS = {
    chrome: "https://chromewebstore.google.com/detail/enlganfikppbjhabhkkilafmkhifadjd",
    edge: "https://microsoftedge.microsoft.com/addons/detail/kfeecmboomhggeeceipnbbdjmhjoccbl",
    firefox: "https://addons.mozilla.org/firefox/addon/{8fee6fa8-6d95-4b9e-9c51-324c207fabff}/"
} as const satisfies Partial<Record<BrowserType, string>>;

type ExtensionStoreType = keyof typeof EXTENSION_STORE_LINKS;

const SUPPORTED_MOBILE_BROWSERS = [
    "firefox",
    "edge",
    "brave",
    "vivaldi",
    "kiwiBrowser"
] as const satisfies BrowserType[];

const NUMBER_OF_USERS = 50000;

export { EXTENSION_STORE_LINKS, type BrowserType, type ExtensionStoreType, SUPPORTED_MOBILE_BROWSERS, NUMBER_OF_USERS };
