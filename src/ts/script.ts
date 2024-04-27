import LanguageDetector from "i18next-browser-languagedetector";
import Swal from "sweetalert2";
import i18next from "i18next";
import translationEn from "../translations/en.json";
import translationJa from "../translations/ja.json";

const isCrawler = (): boolean => {
    const crawlerUserAgents = ["googlebot", "bingbot", "google-inspectiontool", "y!j", "yahoo!"];
    const result = crawlerUserAgents.some((crawlerUserAgent) =>
        navigator.userAgent.toLowerCase().includes(crawlerUserAgent)
    );
    return result;
};

const initializeDownloadButtons = (): void => {
    const buttons = document.querySelectorAll("button.download_button");

    // eslint-disable-next-line max-statements
    buttons.forEach((button) => {
        const isFirefox = navigator.userAgent.toLowerCase().includes("firefox");
        const isEdge = navigator.userAgent.toLowerCase().includes("edg");

        let downloadLink = "https://chrome.google.com/webstore/detail/enlganfikppbjhabhkkilafmkhifadjd/";
        let downloadText = i18next.t("installToChrome");

        if (isFirefox) {
            downloadLink = "https://addons.mozilla.org/firefox/addon/shadowban-scanner/";
            downloadText = i18next.t("installToFirefox");
        } else if (isEdge) {
            downloadLink =
                "https://microsoftedge.microsoft.com/addons/detail/shadowban-scanner/kfeecmboomhggeeceipnbbdjmhjoccbl";
            downloadText = i18next.t("installToEdge");
        }

        button.textContent = downloadText;

        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        button.addEventListener("click", async () => {
            const isMobile = Boolean(navigator.userAgent.match(/iPhone|Android.+Mobile/u));
            if (isMobile && !isFirefox) {
                const result = await Swal.fire({
                    background: "#21272e",
                    cancelButtonColor: "#d33",
                    cancelButtonText: i18next.t("cancel"),
                    color: "#fff",
                    confirmButtonColor: "#3085d6",
                    confirmButtonText: i18next.t("continueAnyway"),
                    icon: "warning",
                    showCancelButton: true,
                    text: i18next.t("smartphonesAreNotSupportedDescription"),
                    title: i18next.t("smartphonesAreNotSupported")
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

    const translationTargets = document.querySelectorAll("[data-translation]");
    translationTargets.forEach((target) => {
        const key = target.getAttribute("data-translation")!;
        const targetAttribute = target.getAttribute("data-translation-attribute");
        if (targetAttribute) {
            target.setAttribute(targetAttribute, i18next.t(key));
        } else {
            target.innerHTML = i18next.t(key);
        }
    });

    initializeDownloadButtons();
};

const initializeLanguageSwitcher = (): void => {
    const languageSwitcher = document.querySelector("#language_switcher")!;
    const languageSwitcherSelect = document.querySelector<HTMLSelectElement>("#language_switcher-select")!;
    languageSwitcherSelect.value = i18next.language;

    languageSwitcher.addEventListener("click", () => {
        languageSwitcherSelect.showPicker();
    });

    languageSwitcherSelect.addEventListener("change", () => {
        void i18next.changeLanguage(languageSwitcherSelect.value);
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

    await i18next.use(LanguageDetector).init({
        detection: {
            convertDetectedLanguage: (lng) => lng.split("-")[0],
            order: isCrawler() ? languageDetectionOrderCrawler : languageDetectionOrderDefault
        },
        fallbackLng: "en",
        resources: {
            en: translationEn,
            ja: translationJa
        },
        supportedLngs: ["en", "ja"]
    });

    onLanguageChanged();
    i18next.on("languageChanged", onLanguageChanged);

    initializeLanguageSwitcher();
};

void main();
