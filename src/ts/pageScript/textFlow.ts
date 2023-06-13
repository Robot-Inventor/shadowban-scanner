import { TweetStatusString } from "../core/messageType";
import { TranslationData, Translator } from "../core/core";
import { CURRENT_USERS_TWEET_CLASS_NAME, MESSAGE_CLASS_NAME } from "./settings";

interface TextFlowOptions {
    showMessageInAllTweets: boolean;
    alwaysDetailedView: boolean;
    enableOnlyForCurrentUsersTweets: boolean;
    translator: Translator;
}

class TextFlow {
    private readonly translator: Translator;
    private readonly allWaysDetailedView: boolean;

    constructor(options: TextFlowOptions) {
        if (!options.showMessageInAllTweets) {
            const style = document.createElement("style");
            style.textContent = ".shadowban-scanner-message-no-problem { display: none; }";
            document.body.appendChild(style);
        }

        if (options.enableOnlyForCurrentUsersTweets) {
            const style = document.createElement("style");
            style.textContent = `.${MESSAGE_CLASS_NAME}:not(.${CURRENT_USERS_TWEET_CLASS_NAME}) {display: none;}`;
            document.body.appendChild(style);
        }

        this.allWaysDetailedView = options.alwaysDetailedView;

        this.translator = options.translator;
    }

    run() {
        const target: HTMLElement | null = document.querySelector(".shadowban-scanner-message:not(.text-inserted");
        if (!target) return;

        target.classList.add("text-inserted");
        const { messageType } = target.dataset;
        if (!messageType) throw new Error("Failed to get message type");

        const message = this.translator(messageType as keyof TranslationData);
        target.insertAdjacentText("afterbegin", message);

        const button = target.querySelector("button");
        if (!button) return;

        if (this.allWaysDetailedView) {
            button.click();
        } else {
            button.textContent = this.translator("showMore");
        }

        const pre = target.querySelector("pre");
        if (!pre) return;
        pre.textContent = this.translator(`${messageType as TweetStatusString}StatusMessage`);
    }
}

export { TextFlowOptions, TextFlow };
