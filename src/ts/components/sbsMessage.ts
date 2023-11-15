import "@material/web/button/filled-button";
import { LitElement, PropertyValues, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { COLLAPSED_CONTENT_CLASS_NAME } from "../common/constants";
import { TranslationKey } from "../common/translator";
import { classMap } from "lit/directives/class-map.js";

@customElement("sbs-message")
export class SbsMessage extends LitElement {
    @property({ reflect: true })
    public summary: TranslationKey = "tweetNoProblem";

    @property({ reflect: true, type: Array })
    public details: TranslationKey[] = [];

    @property({ reflect: true, type: Array })
    public notes: TranslationKey[] = [];

    @property({ reflect: true, type: Boolean })
    public isAlert = false;

    @property({ reflect: true, type: Boolean })
    public isExpanded = false;

    @property({ reflect: true, type: Boolean })
    public isFocalMode = false;

    @property({ reflect: true, type: Boolean })
    public isTweetButtonShown = false;

    @property({ reflect: true, type: Boolean })
    public isNoteShown = false;

    @property({ attribute: false, reflect: true })
    public onRenderedCallback?: () => void;

    public static styles = css`
        .shadowban-scanner-message {
            --message-background-color: rgb(255, 0, 0, 0.2);

            padding: 1em;
            border-radius: 0.5em;
            background: var(--message-background-color);
            margin: 1em 0 0 0;
            font-family: sans-serif;
        }

        .shadowban-scanner-message.focal-mode {
            margin: 0 0 1em 0;
        }

        .shadowban-scanner-message .twemoji {
            height: 1em;
            width: 1em;
            margin-right: 0.25em;
            vertical-align: middle;
        }

        .shadowban-scanner-message-no-problem {
            --message-background-color: rgb(0, 255, 0, 0.2);
        }

        .shadowban-scanner-message button {
            cursor: pointer;
            color: inherit;
            border: none;
            background: none;
        }

        .shadowban-scanner-message .shadowban-scanner-collapsed-content {
            display: none;
        }

        .shadowban-scanner-message ul {
            font-family: inherit;
            line-height: inherit;
            margin: 0.75rem 0 0 0;
            padding: 0;
        }

        .shadowban-scanner-message ul li {
            list-style: none;
        }

        .shadowban-scanner-message-note {
            opacity: 0.8;
            font-size: 0.8em;
            margin-top: 0.75em;
        }

        .shadowban-scanner-message-note + .shadowban-scanner-message-note {
            margin-top: 0.5em;
        }

        .shadowban-scanner-message-note a {
            color: inherit;
        }

        .shadowban-scanner-message md-filled-button {
            margin-top: 0.5em;
            width: 100%;
            --md-filled-button-container-color: var(--message-background-color);
            --md-ripple-hover-color: white;
            --md-ripple-pressed-color: white;
            --_container-shadow-color: rgba(0, 0, 0, 0.3);
        }

        @keyframes loading-animation {
            0% {
                background-position: 200% 0%;
                opacity: 1;
            }
            100% {
                background-position: 0% 0%;
                opacity: 1;
            }
        }
    `;

    private expand(event: Event) {
        event.preventDefault();
        this.isExpanded = true;
    }

    private tweetButtonClicked(event: Event) {
        event.preventDefault();
        const newEvent = new Event("tweetButtonClick", { bubbles: true, composed: true });
        this.dispatchEvent(newEvent);
    }

    override firstUpdated(_changedProperties: PropertyValues) {
        if (this.onRenderedCallback) {
            this.onRenderedCallback();
        }
        super.firstUpdated(_changedProperties);
    }

    // TODO: Get text color and apply it to md-filled-button. Use --md-sys-color-on-primary variable.
    protected render() {
        const outerClasses = classMap({
            "focal-mode": this.isFocalMode,
            "shadowban-scanner-message": true,
            "shadowban-scanner-message-no-problem": !this.isAlert
        });

        const notesClasses = classMap({
            [COLLAPSED_CONTENT_CLASS_NAME]: !this.isExpanded,
            "shadowban-scanner-message-note": true
        });

        const tweetButtonClasses = classMap({
            [COLLAPSED_CONTENT_CLASS_NAME]: !this.isExpanded
        });

        return html`
            <div class=${outerClasses}>
                <span data-sb-translation=${this.summary}></span>
                ${this.isExpanded
                    ? ""
                    : html`<button @click=${this.expand.bind(this)} data-sb-translation="showMore"></button>`}
                ${this.details.length
                    ? html`<ul class="${this.isExpanded ? "" : COLLAPSED_CONTENT_CLASS_NAME}">
                          ${this.details.map(
                              (detail) => html` <li data-sb-enable-twemoji data-sb-translation=${detail}></li> `
                          )}
                      </ul>`
                    : ""}
                ${this.isNoteShown
                    ? this.notes.map((note) => html` <div class=${notesClasses} data-sb-translation=${note}></div> `)
                    : ""}
                ${this.isTweetButtonShown
                    ? html`<md-filled-button
                          @click=${this.tweetButtonClicked.bind(this)}
                          class=${tweetButtonClasses}
                          data-sb-translation="tweetTheResults"
                      ></md-filled-button>`
                    : ""}
            </div>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "sbs-message": SbsMessage;
    }
}
