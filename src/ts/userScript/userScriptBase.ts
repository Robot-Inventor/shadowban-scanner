// eslint-disable-next-line import-x/no-unassigned-import
import "../../css/style.css";
import { Core } from "../core/core";
import { DEFAULT_SETTINGS } from "../common/settings";
import type { TranslationData } from "../../types/common/translator";
import { Translator } from "../common/translator";

const createUserScript = (translationData: TranslationData): void => {
    const translator = new Translator((key, substitutions) => {
        if (substitutions) {
            const substitutionsArray = typeof substitutions === "string" ? [substitutions] : substitutions;
            let result = translationData[key].message;
            // eslint-disable-next-line id-length
            for (let i = 0; i < substitutionsArray.length; i++) {
                // eslint-disable-next-line no-magic-numbers
                result = result.replace(`$${String(i + 1)}`, substitutionsArray[i]);
            }
            return result;
        }
        return translationData[key].message;
    }, "https://abs-0.twimg.com/emoji/v2/svg/");

    new Core(DEFAULT_SETTINGS, () => {
        translator.translateElements();
    });
};

export { createUserScript };
