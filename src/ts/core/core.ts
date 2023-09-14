import "../../css/style.css";
import { CHECKED_DATA_ATTRIBUTE } from "../common/settings";
import { ProfileChecker } from "./profileChecker";
import { TweetChecker } from "./tweetChecker";
import enTranslation from "../../../_locales/en/messages.json";

type TranslationData = typeof enTranslation;
type TranslationKey = keyof TranslationData;
type Translator = (key: TranslationKey) => string;

class Core {
    constructor(onMessageCallback: () => void) {
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

        const observerOptions = {
            childList: true,
            subtree: true
        };

        const loadingObserver = new MutationObserver(() => {
            const main = document.querySelector("main");
            if (!main) return;

            loadingObserver.disconnect();
            timelineObserver.observe(main, observerOptions);
        });
        loadingObserver.observe(document.body, observerOptions);
    }
}

export { TranslationData, TranslationKey, Translator, Core };
