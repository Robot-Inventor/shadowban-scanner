import { Core } from "../core/core";
import translationEn from "../../../_locales/en/messages.json";
import { TextFlow, TextFlowOptions } from "../pageScript/textFlow";
import { DEFAULT_SETTINGS } from "../defaultSettings";

class UserScriptBase {
    constructor(translationData: typeof translationEn) {
        const textFlowOptions: TextFlowOptions = {
            showMessageInAllTweets: DEFAULT_SETTINGS.showMessageInAllTweets,
            alwaysDetailedView: DEFAULT_SETTINGS.alwaysDetailedView,
            enableOnlyForCurrentUsersTweets: DEFAULT_SETTINGS.enableOnlyForCurrentUsersTweets,
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
