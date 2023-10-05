import { ALLOWED_TWEMOJI, TRANSLATION_ATTRIBUTE, TWEMOJI_ATTRIBUTE } from "./constants";
import enTranslation from "../../../_locales/en/messages.json";

type TranslationData = typeof enTranslation;
type TranslationKey = keyof TranslationData;
type TranslationFunction = (key: TranslationKey) => string;

/**
 * Translator class
 */
class Translator {
    private readonly translationFunction: TranslationFunction;
    private readonly twemojiEndpoint: string;

    /**
     * Insert text into the UI using the given function.
     * @param translationFunction translation function to use
     * @param twemojiEndpoint endpoint URL of Twemoji
     */
    constructor(translationFunction: TranslationFunction, twemojiEndpoint: string) {
        this.translationFunction = translationFunction;
        this.twemojiEndpoint = twemojiEndpoint;
    }

    /**
     * Convert emoji text listed in {@link ALLOWED_TWEMOJI} to Twemoji image.
     * @param text text to convert
     * @returns converted text in HTML format
     */
    private convertEmojiToTwemoji(text: string): string {
        let result = text;

        for (const targetEmoji of ALLOWED_TWEMOJI) {
            // eslint-disable-next-line no-magic-numbers
            const codePoints = [...targetEmoji].map((emoji) => emoji.codePointAt(0)?.toString(16)).join("-");
            const twemojiURL = new URL(`${codePoints}.svg`, this.twemojiEndpoint).href;
            const img = `<img src="${twemojiURL}" alt="${targetEmoji}" class="twemoji">`;
            result = result.replaceAll(targetEmoji, img);
        }

        return result;
    }

    /**
     * Run the translation process.
     */
    translateElements() {
        const targetElements = document.querySelectorAll(`[${TRANSLATION_ATTRIBUTE}]`);

        targetElements.forEach((element) => {
            const translationKey = element.getAttribute(TRANSLATION_ATTRIBUTE) as keyof TranslationData;
            const translatedText = this.translationFunction(translationKey);
            if (element.hasAttribute(TWEMOJI_ATTRIBUTE)) {
                element.innerHTML = this.convertEmojiToTwemoji(translatedText);
            } else {
                element.innerHTML = translatedText;
            }
            element.removeAttribute(TRANSLATION_ATTRIBUTE);
        });
    }
}

export { TranslationData, TranslationKey, Translator };
