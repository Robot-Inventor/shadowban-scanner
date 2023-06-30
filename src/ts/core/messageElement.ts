import { MESSAGE_CLASS_NAME, TRANSLATION_ATTRIBUTE } from "../common/settings";
import { ColorCode } from "./color";
import { TranslationKey } from "./core";

type MessageElementTweetStatus = {
    type: "tweet";
    summary: TranslationKey;
    detail: {
        accountStatus: TranslationKey;
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
    private div: HTMLDivElement;

    constructor(status: MessageElementStatus, color: ColorCode) {
        const DETAIL_ITEMS: (keyof MessageElementTweetStatus["detail"])[] = [
            "accountStatus",
            "tweetSensitiveFlag",
            "tweetAgeRestriction",
            "tweetSearchStatus"
        ];

        this.div = document.createElement("div");
        this.div.classList.add(MESSAGE_CLASS_NAME);
        this.div.style.color = color;

        const summary = document.createElement("span");
        summary.setAttribute(TRANSLATION_ATTRIBUTE, status.summary);
        this.div.appendChild(summary);

        if (status.type === "tweet") {
            const ul = document.createElement("ul");
            ul.style.display = "none";
            this.div.appendChild(ul);

            for (const item of DETAIL_ITEMS) {
                const li = document.createElement("li");
                li.setAttribute(TRANSLATION_ATTRIBUTE, status.detail[item]);
                ul.appendChild(li);
            }

            const button = document.createElement("button");
            button.setAttribute(TRANSLATION_ATTRIBUTE, "showMore");
            button.addEventListener("click", () => {
                ul.style.display = "block";
                button.remove();
            });
            this.div.appendChild(button);
        }
    }

    get element() {
        return this.div;
    }
}

export { MessageElementStatus, MessageElement };
