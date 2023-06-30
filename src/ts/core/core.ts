import { ProfileChecker } from "./profilechecker";
import { CHECKED_DATA_ATTRIBUTE } from "../common/settings";
import { TweetChecker } from "./tweetChecker";
import enTranslation from "../../../_locales/en/messages.json";
import "../../css/style.css";

type TranslationData = typeof enTranslation;

type Translator = (key: keyof TranslationData) => string;

class Core {
    constructor(onMessageCallback: Function) {
        const timelineObserver = new MutationObserver(() => {
            const tweets = document.querySelectorAll(`[data-testid="tweet"]:not([${CHECKED_DATA_ATTRIBUTE}]`);
            for (const tweet of tweets) {
                const tweetChecker = new TweetChecker(tweet);
                tweetChecker.run();
                onMessageCallback();
            }

            const userName = document.querySelector(
                `:not([data-testid="tweet"]) [data-testid="UserName"]:not([${CHECKED_DATA_ATTRIBUTE}])`
            );
            if (userName) {
                const profileChecker = new ProfileChecker(userName);
                profileChecker.run();
                onMessageCallback();
            }
        });

        const loadingObserver = new MutationObserver(() => {
            const main = document.querySelector("main");
            if (!main) return;

            loadingObserver.disconnect();
            timelineObserver.observe(main, { subtree: true, childList: true });
        });
        loadingObserver.observe(document.body, { subtree: true, childList: true });
    }
}

export { TranslationData, Translator, Core };
