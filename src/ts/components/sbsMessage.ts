// eslint-disable-next-line import-x/no-unassigned-import
import "@material/web/button/filled-button";
import { LitElement, type PropertyValues, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import type { TranslationKey } from "../../types/common/translator";
import { classMap } from "lit/directives/class-map.js";

type SbsMessageDetails = Array<
    | TranslationKey
    | {
          messageName: TranslationKey;
          substitutions: string | string[] | undefined;
      }
>;

@customElement("sbs-message")
class SbsMessage extends LitElement {
    @property({ reflect: true })
    public summary: TranslationKey = "tweetNoProblem";

    @property({ reflect: true, type: Array })
    public details: SbsMessageDetails = [];

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
    public onRenderedCallback?: undefined | (() => void);

    @property({ reflect: true, type: String })
    public textColor = "white";

    public static override styles = css`
        * {
            font-family: sans-serif;
        }

        a {
            color: inherit;
        }

        .shadowban-scanner-message {
            --message-background-color: var(--message-background-color-red);

            color: var(--md-sys-color-on-primary);
            padding: 1em;
            border-radius: 0.5em;
            background: var(--message-background-color);
        }

        .shadowban-scanner-message .twemoji {
            height: 1em;
            width: 1em;
            margin-right: 0.25em;
            vertical-align: middle;
        }

        .shadowban-scanner-message-no-problem {
            --message-background-color: var(--message-background-color-green);
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

        .shadowban-scanner-message md-filled-button {
            margin-top: 0.5em;
            width: 100%;
            --md-filled-button-container-color: rgb(255 255 255 / 0.2);
            --md-ripple-hover-color: white;
            --md-ripple-pressed-color: white;
            --_container-shadow-color: rgb(0 0 0 / 0.3);
        }

        [data-sb-translation] {
            display: inline-block;
            min-width: 15em;
            min-height: 1em;
            border-radius: 0.25em;
            background-image: linear-gradient(90deg, transparent 40%, rgb(175 175 175 / 0.7) 80%, transparent 100%);
            background-size: 200% 100%;
            animation: loading-animation 1.5s linear infinite;
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

    private expand(): void {
        this.isExpanded = true;
    }

    private tweetButtonClicked(event: Event): void {
        event.preventDefault();
        const newEvent = new Event("tweetButtonClick", { bubbles: true, composed: true });
        this.dispatchEvent(newEvent);
    }

    private tweetButtonTouched(event: Event): void {
        event.preventDefault();
        const newEvent = new Event("tweetButtonTouch", { bubbles: true, composed: true });
        this.dispatchEvent(newEvent);
    }

    public override firstUpdated(_changedProperties: PropertyValues): void {
        if (this.onRenderedCallback) {
            this.onRenderedCallback();
        }
        super.firstUpdated(_changedProperties);
    }

    private getShowMoreButton(): "" | ReturnType<typeof html> {
        if (this.isExpanded) return "";

        return html`<button @click=${this.expand.bind(this)} data-sb-translation="showMore"></button>`;
    }

    private getDetails(): "" | ReturnType<typeof html> {
        if (!this.details.length) return "";

        return html`<ul class="${this.isExpanded ? "" : "shadowban-scanner-collapsed-content"}">
            ${this.details.map((detail) => {
                if (typeof detail === "string") {
                    return html` <li data-sb-enable-twemoji data-sb-translation=${detail}></li> `;
                }
                return html`
                    <li
                        data-sb-enable-twemoji
                        data-sb-translation=${detail.messageName}
                        data-sb-translation-substitutions=${JSON.stringify(detail.substitutions)}
                    ></li>
                `;
            })}
        </ul>`;
    }

    private getNotes(): "" | Array<ReturnType<typeof html>> {
        if (!this.notes.length) return "";

        const notesClasses = classMap({
            "shadowban-scanner-collapsed-content": !this.isExpanded,
            "shadowban-scanner-message-note": true
        });

        return this.notes.map((note) => html` <div class=${notesClasses} data-sb-translation=${note}></div> `);
    }

    private getTweetButton(): "" | ReturnType<typeof html> {
        const tweetButtonClasses = classMap({
            "shadowban-scanner-collapsed-content": !this.isExpanded
        });

        return this.isTweetButtonShown
            ? html`<md-filled-button
                  @click=${this.tweetButtonClicked.bind(this)}
                  @touchend=${this.tweetButtonTouched.bind(this)}
                  class=${tweetButtonClasses}
                  data-sb-translation="tweetTheResults"
              ></md-filled-button>`
            : "";
    }

    private static cancelClickEvent(event: Event): void {
        event.stopPropagation();
    }

    protected override render(): ReturnType<typeof html> {
        const outerClasses = classMap({
            "focal-mode": this.isFocalMode,
            "shadowban-scanner-message": true,
            "shadowban-scanner-message-no-problem": !this.isAlert
        });

        return html`
            <div
                class=${outerClasses}
                style="--md-sys-color-on-primary: ${this.textColor};"
                @click=${SbsMessage.cancelClickEvent.bind(this)}
            >
                <span data-sb-translation=${this.summary}></span>
                ${this.getShowMoreButton()} ${this.getDetails()} ${this.getNotes()} ${this.getTweetButton()}
            </div>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "sbs-message": SbsMessage;
    }
}

export { type SbsMessageDetails, SbsMessage };
