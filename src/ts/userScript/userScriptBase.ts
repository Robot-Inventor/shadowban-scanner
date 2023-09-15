import { TranslationData, Translator } from "../common/translator";
import { Core } from "../core/core";
import { DEFAULT_SETTINGS } from "../common/defaultSettings";

class UserScriptBase {
    constructor(translationData: TranslationData) {
        const translator = new Translator((key) => translationData[key].message);

        new Core(DEFAULT_SETTINGS, () => {
            translator.translateElements();
        });
    }
}

export { UserScriptBase };
