import { ALLOWED_TWEMOJI, SHADOW_TRANSLATION_ATTRIBUTE, TRANSLATION_ATTRIBUTE, TWEMOJI_ATTRIBUTE } from "./constants";

import type { TranslationData, TranslationFunction } from "../../types/common/translator";
import type { SbsMessage } from "../components/sbsMessage";
import { isTranslationSubstitutions } from "../../types/common/translator.guard";

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
    public constructor(translationFunction: TranslationFunction, twemojiEndpoint: string) {
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
    public translateElements(): void {
        const targetElements = [...document.querySelectorAll(`[${TRANSLATION_ATTRIBUTE}]`)];

        const shadowTargets = document.querySelectorAll<SbsMessage>(`sbs-message[${SHADOW_TRANSLATION_ATTRIBUTE}]`);
        for (const shadowTarget of shadowTargets) {
            const { shadowRoot } = shadowTarget;
            if (!shadowRoot) return;

            const shadowTargetElements = shadowRoot.querySelectorAll(`[${TRANSLATION_ATTRIBUTE}]`);
            targetElements.push(...shadowTargetElements);
            if (shadowTargetElements.length) {
                shadowTarget.removeAttribute(SHADOW_TRANSLATION_ATTRIBUTE);
            }
        }

        targetElements.forEach((element) => {
            const translationKey = element.getAttribute(TRANSLATION_ATTRIBUTE) as keyof TranslationData;
            const substitutions = element.getAttribute("data-sb-translation-substitutions");
            const parsedSubstitutions = substitutions ? (JSON.parse(substitutions) as unknown) : null;
            const translatedText = isTranslationSubstitutions(parsedSubstitutions)
                ? this.translationFunction(translationKey, parsedSubstitutions)
                : this.translationFunction(translationKey);
            if (element.hasAttribute(TWEMOJI_ATTRIBUTE)) {
                element.innerHTML = this.convertEmojiToTwemoji(translatedText);
            } else {
                element.innerHTML = translatedText;
            }
            element.removeAttribute(TRANSLATION_ATTRIBUTE);
        });
    }
}

export { Translator };
