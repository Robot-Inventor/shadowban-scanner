const CHECKED_DATA_ATTRIBUTE = "data-shadowban-checked";
const EVENT_GENERATOR_ID = "shadowban-scanner-event-generator";
const EVENT_GENERATOR_SETTINGS_ATTRIBUTE = "data-sb-settings";
const MESSAGE_CLASS_NAME = "shadowban-scanner-message";
const MESSAGE_NOTE_CLASS_NAME = "shadowban-scanner-message-note";
const COLLAPSED_CONTENT_CLASS_NAME = "shadowban-scanner-collapsed-content";
const TRANSLATION_ATTRIBUTE = "data-sb-translation";
const TWEMOJI_ATTRIBUTE = "data-sb-enable-twemoji";
const NO_PROBLEM_CLASS_NAME = "shadowban-scanner-message-no-problem";
const ALLOWED_TWEMOJI = ["✅", "🚫", "⚠️"];

const ONBOARDING_URL = {
    en: "https://github.com/Robot-Inventor/shadowban-scanner/blob/main/README.md",
    ja: "https://github.com/Robot-Inventor/shadowban-scanner/blob/main/README_ja.md"
} as const;
const RELEASE_NOTE_URL = {
    en: "https://robot-inventor.github.io/article/2023/10/29/shadowban-scanner-v2-1-release/en/",
    ja: "https://robot-inventor.github.io/article/2023/10/29/shadowban-scanner-v2-1-release/"
} as const;

export {
    CHECKED_DATA_ATTRIBUTE,
    EVENT_GENERATOR_ID,
    EVENT_GENERATOR_SETTINGS_ATTRIBUTE,
    MESSAGE_CLASS_NAME,
    MESSAGE_NOTE_CLASS_NAME,
    COLLAPSED_CONTENT_CLASS_NAME,
    TRANSLATION_ATTRIBUTE,
    TWEMOJI_ATTRIBUTE,
    NO_PROBLEM_CLASS_NAME,
    ALLOWED_TWEMOJI,
    ONBOARDING_URL,
    RELEASE_NOTE_URL
};
