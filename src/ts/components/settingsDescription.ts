import { LitElement, css, html } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("settings-description")
class SettingsDescription extends LitElement {
    public static styles = css`
        :host {
            display: block;
        }

        .container {
            display: block;
            position: relative;
            width: 100%;
            height: 3rem;
        }

        .settings-description {
            opacity: 0.7;
            font-size: 0.9rem;
            position: absolute;
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
