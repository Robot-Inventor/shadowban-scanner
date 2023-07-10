import { TranslationData, Translator } from "../core/core";
import {
    CURRENT_USERS_TWEET_CLASS_NAME,
    MESSAGE_CLASS_NAME,
    TRANSLATION_ATTRIBUTE,
    TWEMOJI_ATTRIBUTE
} from "./settings";
import emojiRegex from "emoji-regex";

interface TextFlowOptions {
    showMessagesInUnproblematicTweets: boolean;
    alwaysDetailedView: boolean;
    enableOnlyForCurrentUsersTweets: boolean;
    translator: Translator;
}

class TextFlow {
    private readonly translator: Translator;
    private readonly allWaysDetailedView: boolean;

    constructor(options: TextFlowOptions) {
        if (!options.showMessagesInUnproblematicTweets) {
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

    convertEmojiToTwemoji(text: string): string {
        const regex = emojiRegex();
        return text.replace(regex, (match) => {
            let codePoints = "";

            try {
                for (const emoji of match) {
                    codePoints += `${emoji.codePointAt(0)?.toString(16)}-`;
                }
            } catch (error) {
                throw new Error(`Failed to convert emoji to twemoji: ${error}`);
            }

            codePoints = codePoints.replace(/-$/, "");
            return `<img src="https://abs-0.twimg.com/emoji/v2/svg/${codePoints}.svg" alt="${match}" class="twemoji">`;
        });
    }

    run() {
        const target: HTMLElement | null = document.querySelector(".shadowban-scanner-message:not(.text-inserted)");
        if (!target) return;

        target.classList.add("text-inserted");

        const button = target.querySelector("button");
        if (!button) return;
        if (this.allWaysDetailedView) {
            button.click();
        }

        document.querySelectorAll(`[${TRANSLATION_ATTRIBUTE}]`).forEach((element) => {
            if (element.hasAttribute(TWEMOJI_ATTRIBUTE)) {
                element.innerHTML = this.convertEmojiToTwemoji(
                    this.translator(element.getAttribute(TRANSLATION_ATTRIBUTE) as keyof TranslationData)
                );
            } else {
                element.innerHTML = this.translator(
                    element.getAttribute(TRANSLATION_ATTRIBUTE) as keyof TranslationData
                );
            }
        });
    }
}

export { TextFlowOptions, TextFlow };
