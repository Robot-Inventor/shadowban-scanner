import { LitElement, css, html } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("settings-description")
class SettingsDescription extends LitElement {
    public static styles = css`
        :host {
            display: block;
        }

        /* Ref: https://stackoverflow.com/questions/9769587/set-div-to-have-its-siblings-width/48226415#48226415 */
        .container {
            display: flex;
        }

        .settings-description {
            opacity: 0.7;
            font-size: 0.9rem;
            flex-grow: 1;
            width: 0;
        }
    `;

    // eslint-disable-next-line class-methods-use-this
    protected render(): ReturnType<typeof html> {
        return html`
            <div class="container">
                <div class="settings-description">
                    <slot></slot>
                </div>
            </div>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "settings-description": SettingsDescription;
    }
}

export { SettingsDescription };
