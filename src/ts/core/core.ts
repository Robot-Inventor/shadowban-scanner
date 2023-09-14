import "../../css/style.css";
import { CHECKED_DATA_ATTRIBUTE, CURRENT_USERS_TWEET_CLASS_NAME, MESSAGE_CLASS_NAME } from "../common/constants";
import { ProfileChecker } from "./profileChecker";
import { Settings } from "../@types/common/settings";
import { TweetChecker } from "./tweetChecker";
import enTranslation from "../../../_locales/en/messages.json";

type TranslationData = typeof enTranslation;
type TranslationKey = keyof TranslationData;
type Translator = (key: TranslationKey) => string;

class Core {
    private readonly settings: Settings;

    constructor(settings: Settings, onMessageCallback: () => void) {
        this.settings = settings;
        this.loadOptionalStyles();

        // eslint-disable-next-line max-statements
        const timelineObserver = new MutationObserver(() => {
            const tweets = document.querySelectorAll(`[data-testid="tweet"]:not([${CHECKED_DATA_ATTRIBUTE}]`);
            for (const tweet of tweets) {
                const tweetChecker = new TweetChecker(tweet);
                const messageElement = tweetChecker.run();

                const button = messageElement.querySelector("button");
                if (!button) throw new Error("Failed to get button of message element");
                if (this.settings.alwaysDetailedView) {
                    button.click();
                }

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

    private loadOptionalStyles() {
        if (!this.settings.showMessagesInUnproblematicTweets) {
            const style = document.createElement("style");
            style.textContent = ".shadowban-scanner-message-no-problem { display: none; }";
            document.body.appendChild(style);
        }

        if (this.settings.enableOnlyForCurrentUsersTweets) {
            const style = document.createElement("style");
            style.textContent = `.${MESSAGE_CLASS_NAME}:not(.${CURRENT_USERS_TWEET_CLASS_NAME}) {display: none;}`;
            document.body.appendChild(style);
        }
    }
}

export { TranslationData, TranslationKey, Translator, Core };
