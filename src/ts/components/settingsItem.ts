// eslint-disable-next-line import-x/no-unassigned-import
import "@material/web/checkbox/checkbox.js";
import { LitElement, css, html } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import type { MdCheckbox } from "@material/web/checkbox/checkbox";
import { classMap } from "lit/directives/class-map.js";

@customElement("settings-item")
class SettingsItem extends LitElement {
    @query("md-checkbox")
    private checkbox!: MdCheckbox;

    public static override styles = css`
        :host {
            display: block;
        }

        .settings-item {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            background: var(--md-surface);
            border-radius: 0.25rem;
            transition: background 0.2s;
        }

        .settings-item:hover {
            background: var(--md-surface-variant);
        }

        .settings-item > * {
            cursor: pointer;
            padding: 1rem 0;
        }

        .settings-item > *:first-child {
            padding-left: 1.5rem;
        }

        .settings-item > *:last-child {
            padding-right: 1.5rem;
        }

        label {
            flex-grow: 1;
        }

        .settings-item > md-checkbox {
            flex-shrink: 0;
            padding-left: 1.5rem;
        }

        .first-item {
            border-top-left-radius: 1rem;
            border-top-right-radius: 1rem;
        }

        .last-item {
            border-bottom-left-radius: 1rem;
            border-bottom-right-radius: 1rem;
        }
    `;

    @property({ attribute: "settings-name", reflect: true, type: String })
    public settingsName = "";

    @property({ attribute: true, reflect: true, type: Boolean })
    public checked = false;

    @property({ attribute: "is-first-item", reflect: true, type: Boolean })
    public isFirstItem = false;

    @property({ attribute: "is-last-item", reflect: true, type: Boolean })
    public isLastItem = false;

    protected override render(): ReturnType<typeof html> {
        const itemClasses = {
            "first-item": this.isFirstItem,
            "last-item": this.isLastItem
        };

        return html`
            <div class="settings-item ${classMap(itemClasses)}">
                <label for="${this.settingsName}">
                    <slot></slot>
                </label>
                <md-checkbox
                    @change="${this.changeHandler.bind(this)}"
                    name="${this.settingsName}"
                    id="${this.settingsName}"
                    ?checked="${this.checked}"
                ></md-checkbox>
            </div>
        `;
    }

    private changeHandler(): void {
        this.checked = this.checkbox.checked;
        const event = new Event("change", { bubbles: true, composed: true });
        this.dispatchEvent(event);
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "settings-item": SettingsItem;
    }
}

export { SettingsItem };
