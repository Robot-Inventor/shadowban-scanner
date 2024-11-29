import { LitElement, css, html } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("settings-description")
class SettingsDescription extends LitElement {
    public static override styles = css`
        :host {
            display: block;
        }

        /* Ref: https://stackoverflow.com/questions/9769587/set-div-to-have-its-siblings-width/48226415#48226415 */
        .container {
            display: flex;
        }

        .settings-description {
            font-size: 0.8rem;
            flex-grow: 1;
            width: 0;
            color: var(--md-on-surface-variant);
        }
    `;

    // eslint-disable-next-line class-methods-use-this
    protected override render(): ReturnType<typeof html> {
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
