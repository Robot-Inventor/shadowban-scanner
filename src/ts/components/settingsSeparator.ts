import { LitElement, css, html } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("settings-separator")
class SettingsSeparator extends LitElement {
    static styles = css`
        .settings-separator {
            --left-line-width: 0.75rem;

            opacity: 0.7;
            font-size: 0.9em;
            position: relative;
            left: var(--left-line-width);
        }

        .settings-separator > hr {
            border: none;
            width: calc(100vw - var(--window-padding) * 2);
            height: 0.1rem;
            background: var(--theme-font-color);
            position: absolute;
            top: 50%;
            transform: translate(calc(-1 * var(--left-line-width)), -50%);
            z-index: 1;
            margin: 0;
        }

        .settings-separator > div {
            width: max-content;
            background: var(--theme-background-color);
            position: relative;
            z-index: 2;
            padding: 0 0.5rem;
        }
    `;

    // eslint-disable-next-line class-methods-use-this
    protected render() {
        return html`
            <div class="settings-separator">
                <hr />
                <div>
                    <slot></slot>
                </div>
            </div>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "settings-separator": SettingsSeparator;
    }
}
