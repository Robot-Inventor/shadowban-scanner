import LanguageDetector from "i18next-browser-languagedetector";
import Swal from "sweetalert2";
import i18next from "i18next";
import translationEn from "../translations/en.json";
import translationJa from "../translations/ja.json";

void i18next.use(LanguageDetector).init({
    detection: {
        convertDetectedLanguage: (lng) => lng.split("-")[0],
        order: ["querystring", "navigator", "htmlTag", "path", "subdomain", "cookie", "localStorage", "sessionStorage"]
    },
    fallbackLng: "en",
    resources: {
        en: translationEn,
        ja: translationJa
    },
    supportedLngs: ["en", "ja"]
});

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

    button.addEventListener("click", () => {
        const isMobile = Boolean(navigator.userAgent.match(/iPhone|Android.+Mobile/u));
        if (isMobile && !isFirefox) {
            void Swal.fire({
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
            }).then((result) => {
                if (result.isConfirmed) {
                    open(downloadLink, "_blank");
                }
            });
        } else {
            open(downloadLink, "_blank");
        }
    });
});
