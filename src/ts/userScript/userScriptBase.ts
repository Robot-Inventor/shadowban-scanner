import { Core } from "../core/core";
import translationEn from "../../../_locales/en/messages.json";
import { TextFlow } from "../pageScript/textFlow";
import { DEFAULT_SETTINGS } from "../defaultSettings";

class UserScriptBase {
    constructor(translationData: typeof translationEn) {
        const textFlow = new TextFlow(
            DEFAULT_SETTINGS.showMessageInAllTweets,
            DEFAULT_SETTINGS.showMessageInAllTweets,
            (key) => {
                return translationData[key].message;
            }
        );

        new Core(() => {
            textFlow.run();
        });
    }
}

export { UserScriptBase };
