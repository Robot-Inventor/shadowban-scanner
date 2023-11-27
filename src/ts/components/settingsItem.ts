import "@material/web/checkbox/checkbox.js";
import { LitElement, css, html } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import type { MdCheckbox } from "@material/web/checkbox/checkbox";

@customElement("settings-item")
class SettingsItem extends LitElement {
    @query("md-checkbox")
    private checkbox!: MdCheckbox;

    static styles = css`
        .settings-item {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            margin: 0.5rem 0;
            padding: 0 1rem;
        }

        .settings-item,
        .settings-item > * {
            cursor: pointer;
        }

        .settings-item > label {
            flex-grow: 1;
        }

        md-checkbox {
            --md-sys-color-secondary: transparent;
            margin-left: 0.75rem;
            flex-shrink: 0;
        }
    `;

    @property({ attribute: "settings-name", reflect: true, type: String })
    public settingsName = "";

    @property({ attribute: true, reflect: true, type: Boolean })
    public checked = false;

    protected render(): ReturnType<typeof html> {
        return html`
            <div class="settings-item">
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
        this.checked = this.checkbox.checked ?? false;
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
