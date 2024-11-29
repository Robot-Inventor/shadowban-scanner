import { LitElement, css, html } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("settings-group-title")
class SettingsGroupTitle extends LitElement {
    public static override styles = css`
        :host {
            display: block;
        }

        .settings-title {
            font-size: 1.05rem;
        }
    `;

    // eslint-disable-next-line class-methods-use-this
    protected override render(): ReturnType<typeof html> {
        return html`
            <div class="settings-title">
                <slot></slot>
            </div>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "settings-group-title": SettingsGroupTitle;
    }
}

export { SettingsGroupTitle };
