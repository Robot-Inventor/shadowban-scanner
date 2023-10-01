import "@material/web/button/filled-button";
import {
    COLLAPSED_CONTENT_CLASS_NAME,
    MESSAGE_CLASS_NAME,
    MESSAGE_NOTE_CLASS_NAME,
    NO_PROBLEM_CLASS_NAME,
    TRANSLATION_ATTRIBUTE,
    TWEMOJI_ATTRIBUTE
} from "../common/constants";
import { TranslationKey } from "../common/translator";

/**
 * Message class that generates a message element.
 */
class Message {
    private readonly container: HTMLDivElement;
    private readonly expandButton: HTMLButtonElement;
    private isExpanded = false;

    /**
     * Generate a message element.
     * @param summary summary of the message
     */
    constructor(summary: TranslationKey) {
        this.container = document.createElement("div");
        this.container.classList.add(MESSAGE_CLASS_NAME);
        this.container.style.color = Message.getTextColor();

        const summaryContainer = document.createElement("span");
        summaryContainer.setAttribute(TRANSLATION_ATTRIBUTE, summary);
        this.container.appendChild(summaryContainer);

        this.expandButton = this.addButton();
    }

    /**
     * Get the text color of the tweet.
     * @returns text color of the tweet
     */
    private static getTextColor(): `rgb(${number}, ${number}, ${number})` {
        const TEXT_SELECTOR = [
            "[data-testid='User-Name'] div:first-child span",
            "[data-testid='UserName'] div:first-child span",
            "[data-testid='tweetText']"
        ].join(",");

        const text = document.querySelector(TEXT_SELECTOR);
        if (!text) throw new Error("Failed to get user name span of tweet");

        const { color } = getComputedStyle(text);
        return color as `rgb(${number}, ${number}, ${number})`;
    }

    /**
     * Add the expand button.
     * @returns expand button
     */
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

    /**
     * Expand the message.
     */
    public expand() {
        this.expandButton.click();
    }

    /**
     * Add details to the message.
     * @param details details to add
     */
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

    /**
     * Add notes to the message.
     * @param notes notes to add
     */
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

    /**
     * Add a tweet button to the message.
     * @param text text to tweet
     */
    public addTweetButton(text: string) {
        const button = document.createElement("md-filled-button");

        button.setAttribute(TRANSLATION_ATTRIBUTE, "tweetTheResults");
        button.style.setProperty("--md-sys-color-on-primary", Message.getTextColor());

        button.addEventListener("click", (event) => {
            open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`, "_blank");
            event.stopPropagation();
            return false;
        });

        if (!this.isExpanded) {
            button.classList.add(COLLAPSED_CONTENT_CLASS_NAME);
        }

        this.container.appendChild(button);
    }

    /**
     * Get the message element.
     * @returns message element
     */
    public getContainer(): HTMLDivElement {
        return this.container;
    }

    /**
     * Get whether the message is alert.
     * @returns whether the message is alert
     */
    get isAlert(): boolean {
        return !this.container.classList.contains(NO_PROBLEM_CLASS_NAME);
    }

    /**
     * Set whether the message is alert.
     *
     * If set to true, the message will be displayed in red.
     * If set to false, the message will be displayed in green.
     * @param isAlert whether the message is alert
     */
    set isAlert(isAlert: boolean) {
        this.container.classList.toggle(NO_PROBLEM_CLASS_NAME, !isAlert);
    }
}

export { Message };
