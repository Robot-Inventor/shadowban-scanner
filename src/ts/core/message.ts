import {
    MESSAGE_CLASS_NAME,
    TRANSLATED_BY_AI_MESSAGE_CLASS_NAME,
    TRANSLATION_ATTRIBUTE,
    TWEMOJI_ATTRIBUTE
} from "../common/constants";
import { ColorCode } from "./color";
import { TranslationKey } from "./core";

type MessageElementTweetStatus = {
    type: "tweet";
    summary: TranslationKey;
    detail: {
        accountStatus: TranslationKey;
        sensitiveMediaInProfile: TranslationKey;
        tweetSensitiveFlag: TranslationKey;
        tweetAgeRestriction: TranslationKey;
        tweetSearchStatus: TranslationKey;
    };
};

type MessageElementAccountStatus = {
    type: "account";
    summary: TranslationKey;
};

type MessageElementStatus = MessageElementTweetStatus | MessageElementAccountStatus;

class MessageElement {
    private readonly div: HTMLDivElement;
    private readonly status: MessageElementStatus;
    private readonly alwaysDetailedView: boolean;

    constructor(status: MessageElementStatus, color: ColorCode, alwaysDetailedView: boolean) {
        this.status = status;
        this.alwaysDetailedView = alwaysDetailedView;

        this.div = document.createElement("div");
        this.div.classList.add(MESSAGE_CLASS_NAME);
        this.div.style.color = color;

        const summary = document.createElement("span");
        summary.setAttribute(TRANSLATION_ATTRIBUTE, status.summary);
        this.div.appendChild(summary);

        if (status.type === "tweet") {
            this.insertMessagesForTweet();
        }
    }

    // eslint-disable-next-line max-statements
    private insertMessagesForTweet() {
        if (this.status.type !== "tweet") throw new Error("this.status is not the status of tweet.");

        const DETAIL_ITEMS: (keyof MessageElementTweetStatus["detail"])[] = [
            "accountStatus",
            "sensitiveMediaInProfile",
            "tweetSensitiveFlag",
            "tweetAgeRestriction",
            "tweetSearchStatus"
        ];

        const translatedByAIMessage = document.createElement("div");
        translatedByAIMessage.setAttribute(TRANSLATION_ATTRIBUTE, "translatedByAI");
        translatedByAIMessage.classList.add(TRANSLATED_BY_AI_MESSAGE_CLASS_NAME);

        const ul = document.createElement("ul");
        this.div.appendChild(ul);

        for (const item of DETAIL_ITEMS) {
            const li = document.createElement("li");
            li.setAttribute(TRANSLATION_ATTRIBUTE, this.status.detail[item]);
            li.setAttribute(TWEMOJI_ATTRIBUTE, "");
            ul.appendChild(li);
        }

        if (!this.alwaysDetailedView) {
            translatedByAIMessage.style.display = "none";
            ul.style.display = "none";

            const button = document.createElement("button");
            button.setAttribute(TRANSLATION_ATTRIBUTE, "showMore");
            button.addEventListener("click", () => {
                ul.style.display = "block";
                translatedByAIMessage.style.display = "block";
                button.remove();
            });

            this.div.appendChild(button);
        }

        this.div.appendChild(translatedByAIMessage);
    }

    get element() {
        return this.div;
    }
}

export { MessageElementTweetStatus, MessageElement };
