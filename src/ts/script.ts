import { detectBrowser, getExtensionStoreLink } from "./util";
import i18next, { changeLanguage, t as translate } from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { SUPPORTED_MOBILE_BROWSERS } from "./constants";
import Swal from "sweetalert2";
import translationEn from "../translations/en.json";
import translationJa from "../translations/ja.json";

declare global {
    interface Window {
        chrome?: {
            app?: unknown;
        };
    }
}

const isCrawler = (): boolean => {
    const crawlerUserAgents = ["googlebot", "bingbot", "google-inspectiontool", "y!j", "yahoo!"];
    const result = crawlerUserAgents.some((crawlerUserAgent) =>
        navigator.userAgent.toLowerCase().includes(crawlerUserAgent)
    );
    return result;
};

const initializeDownloadButtons = (): void => {
    const buttons = document.querySelectorAll("button.download_button");

    buttons.forEach((button) => {
        const browser = detectBrowser();
        const downloadLink = getExtensionStoreLink();
        let downloadText: string = translate("installToChrome");

        if (browser === "firefox") {
            downloadText = translate("installToFirefox");
        } else if (browser === "edge") {
            downloadText = translate("installToEdge");
        } else if (browser === "kiwiBrowser") {
            downloadText = translate("installToKiwiBrowser");
        }

        button.textContent = downloadText;

        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        button.addEventListener("click", async () => {
            const isMobile = Boolean(/iPhone|Android.+Mobile/u.exec(navigator.userAgent));
            if (
                isMobile &&
                !SUPPORTED_MOBILE_BROWSERS.includes(browser as (typeof SUPPORTED_MOBILE_BROWSERS)[number])
            ) {
                const result = await Swal.fire({
                    background: "#21272e",
                    cancelButtonColor: "#d33",
                    cancelButtonText: translate("cancel"),
                    color: "#fff",
                    confirmButtonColor: "#3085d6",
                    confirmButtonText: translate("continueAnyway"),
                    icon: "warning",
                    showCancelButton: true,
                    text: translate("smartphonesAreNotSupportedDescription"),
                    title: translate("smartphonesAreNotSupported")
                });
                if (result.isConfirmed) {
                    open(downloadLink, "_blank");
                }
            } else {
                open(downloadLink, "_blank");
            }
        });
    });
};

const onLanguageChanged = (): void => {
    if (!isCrawler()) {
        history.replaceState(null, "", `/${i18next.language}/`);
    }

    document.documentElement.lang = i18next.language;

    const translationTargets = document.querySelectorAll("[data-translation]");
    translationTargets.forEach((target) => {
        const key = target.getAttribute("data-translation");
        if (!key) {
            throw new Error("data-translation attribute is not set.");
        }
        const targetAttribute = target.getAttribute("data-translation-attribute");
        if (targetAttribute) {
            target.setAttribute(targetAttribute, translate(key));
        } else {
            target.innerHTML = translate(key);
        }
    });

    initializeDownloadButtons();
};

const initializeLanguageSwitcher = (): void => {
    const languageSwitcher = document.querySelector("#language_switcher");
    if (!languageSwitcher) {
        throw new Error("Language switcher element is not found.");
    }
    const languageSwitcherSelect = document.querySelector<HTMLSelectElement>("#language_switcher-select");
    if (!languageSwitcherSelect) {
        throw new Error("Language switcher select element is not found.");
    }
    languageSwitcherSelect.value = i18next.language;

    languageSwitcher.addEventListener("click", () => {
        languageSwitcherSelect.showPicker();
    });

    languageSwitcherSelect.addEventListener("change", () => {
        void changeLanguage(languageSwitcherSelect.value);
    });
};

const main = async (): Promise<void> => {
    const languageDetectionOrderDefault = [
        "querystring",
        "cookie",
        "localStorage",
        "sessionStorage",
        "navigator",
        "htmlTag",
        "path",
        "subdomain"
    ];

    const languageDetectionOrderCrawler = [
        "querystring",
        "path",
        "cookie",
        "localStorage",
        "sessionStorage",
        "navigator",
        "htmlTag",
        "subdomain",
        "cookie",
        "localStorage",
        "sessionStorage"
    ];

    // eslint-disable-next-line import-x/no-named-as-default-member
    await i18next.use(LanguageDetector).init({
        detection: {
            convertDetectedLanguage: (lng) => lng.split("-")[0],
            order: isCrawler() ? languageDetectionOrderCrawler : languageDetectionOrderDefault
        },
        fallbackLng: "en",
        resources: {
            en: { translation: { ...translationEn } },
            ja: { translation: { ...translationJa } }
        },
        supportedLngs: ["en", "ja"]
    });

    onLanguageChanged();
    i18next.on("languageChanged", onLanguageChanged);

    initializeLanguageSwitcher();
};

void main();
