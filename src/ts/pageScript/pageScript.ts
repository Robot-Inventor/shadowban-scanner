import { ProfileChecker } from "./profilechecker";
import { CHECKED_DATA_ATTRIBUTE } from "./settings";
import { TweetChecker } from "./tweetChecker";

const eventGenerator = document.createElement("div");
eventGenerator.id = "shadowban-scanner-event-generator";
document.body.appendChild(eventGenerator);

const dispatchMessageEvent = () => {
    eventGenerator.dispatchEvent(new CustomEvent("newMessage"));
};

const timelineObserver = new MutationObserver(() => {
    const tweets = document.querySelectorAll(`[data-testid="tweet"]:not([${CHECKED_DATA_ATTRIBUTE}]`);
    for (const tweet of tweets) {
        const tweetChecker = new TweetChecker(tweet);
        tweetChecker.run();
        dispatchMessageEvent();
    }

    const userName = document.querySelector(
        `:not([data-testid="tweet"]) [data-testid="UserName"]:not([${CHECKED_DATA_ATTRIBUTE}])`
    );
    if (userName) {
        const profileChecker = new ProfileChecker(userName);
        profileChecker.run();
        dispatchMessageEvent();
    }
});

const loadingObserver = new MutationObserver(() => {
    const main = document.querySelector("main");
    if (!main) return;

    loadingObserver.disconnect();
    timelineObserver.observe(main, { subtree: true, childList: true });
});
loadingObserver.observe(document.body, { subtree: true, childList: true });
