import "../../css/style.css";
import { TranslationData, Translator } from "../common/translator";
import { Core } from "../core/core";
import { DEFAULT_SETTINGS } from "../common/defaultSettings";

/**
 * Base class of the user script.
 */
class UserScriptBase {
    constructor(translationData: TranslationData) {
        const translator = new Translator((key) => translationData[key].message);

        new Core(DEFAULT_SETTINGS, () => {
            translator.translateElements();
        });
    }
}

export { UserScriptBase };