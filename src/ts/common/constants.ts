const CHECKED_DATA_ATTRIBUTE = "data-shadowban-checked";
const EVENT_GENERATOR_ID = "shadowban-scanner-event-generator";
const EVENT_GENERATOR_SETTINGS_ATTRIBUTE = "data-sb-settings";
const TRANSLATION_ATTRIBUTE = "data-sb-translation";
const SHADOW_TRANSLATION_ATTRIBUTE = "data-sb-shadow-translation";
const TWEMOJI_ATTRIBUTE = "data-sb-enable-twemoji";
const ALLOWED_TWEMOJI = ["✅", "🚫", "⚠️"];

const ONBOARDING_PATH = "dist/html/initialSetup.html";
const RELEASE_NOTE_URL = {
    en: "https://roboin.io/article/2023/12/10/shadowban-scanner-v3-release/en/",
    ja: "https://roboin.io/article/2023/12/10/shadowban-scanner-v3-release/"
} as const;
const INSTRUCTION_URL = {
    en: "https://roboin.io/article/2023/09/30/detect-twitter-shadowban/en/#usage",
    ja: "https://roboin.io/article/2023/09/30/detect-twitter-shadowban/#%E4%BD%BF%E3%81%84%E6%96%B9"
} as const;

export {
    CHECKED_DATA_ATTRIBUTE,
    EVENT_GENERATOR_ID,
    EVENT_GENERATOR_SETTINGS_ATTRIBUTE,
    TRANSLATION_ATTRIBUTE,
    SHADOW_TRANSLATION_ATTRIBUTE,
    TWEMOJI_ATTRIBUTE,
    ALLOWED_TWEMOJI,
    ONBOARDING_PATH,
    RELEASE_NOTE_URL,
    INSTRUCTION_URL
};
