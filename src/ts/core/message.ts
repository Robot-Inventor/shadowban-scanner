import {
    COLLAPSED_CONTENT_CLASS_NAME,
    MESSAGE_CLASS_NAME,
    MESSAGE_NOTE_CLASS_NAME,
    NO_PROBLEM_CLASS_NAME,
    TRANSLATION_ATTRIBUTE,
    TWEMOJI_ATTRIBUTE
} from "../common/constants";
import { TranslationKey } from "../common/translator";

class Message {
    private readonly container: HTMLDivElement;
    private readonly expandButton: HTMLButtonElement;
    private isExpanded = false;

    constructor(summary: TranslationKey) {
        this.container = document.createElement("div");
        this.container.classList.add(MESSAGE_CLASS_NAME);
        this.container.style.color = Message.getTextColor();

        const summaryContainer = document.createElement("span");
        summaryContainer.setAttribute(TRANSLATION_ATTRIBUTE, summary);
        this.container.appendChild(summaryContainer);

        this.expandButton = this.addButton();
    }

    private static getTextColor(): `rgb(${number}, ${number}, ${number})` {
        const USER_NAME_SELECTOR = [
            "[data-testid='User-Name'] div:first-child span",
            "[data-testid='UserName'] div:first-child span",
            "[data-testid='tweetText']",
            "main h2[role='heading']"
        ].join(",");

        const userName = document.querySelector(USER_NAME_SELECTOR);
        if (!userName) throw new Error("Failed to get user name span of tweet");

        const { color } = getComputedStyle(userName);
        return color as `rgb(${number}, ${number}, ${number})`;
    }

    private addButton(): HTMLButtonElement {
        const button = document.createElement("button");
        button.setAttribute(TRANSLATION_ATTRIBUTE, "showMore");
        button.addEventListener("click", () => {
            button.remove();
            this.container.querySelectorAll(`.${COLLAPSED_CONTENT_CLASS_NAME}`).forEach((element) => {
                element.classList.remove(COLLAPSED_CONTENT_CLASS_NAME);
            });
            this.isExpanded = true;
        });
        this.container.appendChild(button);

        return button;
    }

    public expand() {
        this.expandButton.click();
    }

    public addDetails(details: TranslationKey[]) {
        const ul = document.createElement("ul");
        if (!this.isExpanded) {
            ul.classList.add(COLLAPSED_CONTENT_CLASS_NAME);
        }

        for (const detail of details) {
            const li = document.createElement("li");
            li.setAttribute(TRANSLATION_ATTRIBUTE, detail);
            li.setAttribute(TWEMOJI_ATTRIBUTE, "true");
            ul.appendChild(li);
        }

        this.container.appendChild(ul);
    }

    public addNotes(notes: TranslationKey[]) {
        const fragment = document.createDocumentFragment();

        for (const note of notes) {
            const noteElement = document.createElement("div");
            noteElement.classList.add(MESSAGE_NOTE_CLASS_NAME);
            noteElement.setAttribute(TRANSLATION_ATTRIBUTE, note);
            if (!this.isExpanded) {
                noteElement.classList.add(COLLAPSED_CONTENT_CLASS_NAME);
            }
            fragment.appendChild(noteElement);
        }

        this.container.appendChild(fragment);
    }

    public getContainer(): HTMLDivElement {
        return this.container;
    }

    get isAlert(): boolean {
        return !this.container.classList.contains(NO_PROBLEM_CLASS_NAME);
    }

    set isAlert(isAlert: boolean) {
        this.container.classList.toggle(NO_PROBLEM_CLASS_NAME, !isAlert);
    }
}

export { Message };
