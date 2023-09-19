import {
    COLLAPSED_CONTENT_CLASS_NAME,
    MESSAGE_CLASS_NAME,
    MESSAGE_NOTE_CLASS_NAME,
    NO_PROBLEM_CLASS_NAME,
    TRANSLATION_ATTRIBUTE,
    TWEMOJI_ATTRIBUTE
} from "../common/constants";
import { ColorCode } from "./color";
import { TranslationKey } from "./core";

class Message {
    private readonly container: HTMLDivElement;
    private readonly expandButton: HTMLButtonElement;
    private isExpanded = false;

    constructor(summary: TranslationKey, color: ColorCode) {
        this.container = document.createElement("div");
        this.container.classList.add(MESSAGE_CLASS_NAME);
        this.container.style.color = color;

        const summaryContainer = document.createElement("span");
        summaryContainer.setAttribute(TRANSLATION_ATTRIBUTE, summary);
        this.container.appendChild(summaryContainer);

        this.expandButton = this.addButton();
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
        const noteContainer = document.createElement("div");
        noteContainer.classList.add(MESSAGE_NOTE_CLASS_NAME);
        if (!this.isExpanded) {
            noteContainer.classList.add(COLLAPSED_CONTENT_CLASS_NAME);
        }

        for (const note of notes) {
            const noteElement = document.createElement("span");
            noteElement.setAttribute(TRANSLATION_ATTRIBUTE, note);
            noteContainer.appendChild(noteElement);
        }

        this.container.appendChild(noteContainer);
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
