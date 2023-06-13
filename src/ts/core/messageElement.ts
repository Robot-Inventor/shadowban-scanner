import { MESSAGE_CLASS_NAME } from "../pageScript/settings";
import { ColorCode } from "./color";
import { TweetStatusString } from "./messageType";

class MessageElement {
    private div: HTMLDivElement;

    constructor(type: "tweet" | "account", color: ColorCode, messageType?: TweetStatusString) {
        this.div = document.createElement("div");
        this.div.classList.add(MESSAGE_CLASS_NAME);
        this.div.dataset.messageType = messageType;
        this.div.style.color = color;

        if (type === "tweet") {
            const pre = document.createElement("pre");
            pre.style.display = "none";
            this.div.appendChild(pre);

            const button = document.createElement("button");
            button.addEventListener("click", () => {
                pre.style.display = "block";
                button.remove();
            });
            this.div.appendChild(button);
        }
    }

    set messageType(messageType: string) {
        this.div.dataset.messageType = messageType;
    }

    get element() {
        return this.div;
    }
}

export { MessageElement };
