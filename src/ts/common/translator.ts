import { ALLOWED_TWEMOJI, TRANSLATION_ATTRIBUTE, TWEMOJI_ATTRIBUTE } from "./constants";
import enTranslation from "../../../_locales/en/messages.json";

type TranslationData = typeof enTranslation;
type TranslationKey = keyof TranslationData;
type TranslationFunction = (key: TranslationKey) => string;

class Translator {
    private readonly translationFunction: TranslationFunction;

    constructor(translationFunction: TranslationFunction) {
        this.translationFunction = translationFunction;
    }

    private static convertEmojiToTwemoji(text: string): string {
        let result = text;

        for (const targetEmoji of ALLOWED_TWEMOJI) {
            // eslint-disable-next-line no-magic-numbers
            const codePoints = [...targetEmoji].map((emoji) => emoji.codePointAt(0)?.toString(16)).join("-");
            // eslint-disable-next-line max-len
            const img = `<img src="https://abs-0.twimg.com/emoji/v2/svg/${codePoints}.svg" alt="${targetEmoji}" class="twemoji">`;
            result = result.replaceAll(targetEmoji, img);
        }

        return result;
    }

    translateElements() {
        const targetElements = document.querySelectorAll(`[${TRANSLATION_ATTRIBUTE}]`);

        targetElements.forEach((element) => {
            const translationKey = element.getAttribute(TRANSLATION_ATTRIBUTE) as keyof TranslationData;
            const translatedText = this.translationFunction(translationKey);
            if (element.hasAttribute(TWEMOJI_ATTRIBUTE)) {
                element.innerHTML = Translator.convertEmojiToTwemoji(translatedText);
            } else {
                element.textContent = translatedText;
            }
            element.removeAttribute(TRANSLATION_ATTRIBUTE);
        });
    }
}

export { Translator, TranslationData };
