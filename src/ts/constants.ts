import type { BrowserType } from "./util";

const EXTENSION_STORE_LINKS = {
    chrome: "https://chromewebstore.google.com/detail/enlganfikppbjhabhkkilafmkhifadjd",
    edge: "https://microsoftedge.microsoft.com/addons/detail/kfeecmboomhggeeceipnbbdjmhjoccbl",
    firefox: "https://addons.mozilla.org/firefox/addon/{8fee6fa8-6d95-4b9e-9c51-324c207fabff}/"
} as const satisfies Partial<Record<BrowserType, string>>;

type ExtensionStoreType = keyof typeof EXTENSION_STORE_LINKS;

const SUPPORTED_MOBILE_BROWSERS = ["firefox", "kiwiBrowser"] as const satisfies BrowserType[];

const NUMBER_OF_USERS = 25000;

export { EXTENSION_STORE_LINKS, type ExtensionStoreType, SUPPORTED_MOBILE_BROWSERS, NUMBER_OF_USERS };
