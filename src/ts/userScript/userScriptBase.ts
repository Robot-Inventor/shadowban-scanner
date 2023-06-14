import { Core, TranslationData } from "../core/core";
import { TextFlow, TextFlowOptions } from "../pageScript/textFlow";
import { DEFAULT_SETTINGS } from "../defaultSettings";

class UserScriptBase {
    constructor(translationData: TranslationData) {
        const textFlowOptions: TextFlowOptions = {
            ...DEFAULT_SETTINGS,
            translator: (key) => {
                return translationData[key].message;
            }
        };
        const textFlow = new TextFlow(textFlowOptions);

        new Core(() => {
            textFlow.run();
        });
    }
}

export { UserScriptBase };
