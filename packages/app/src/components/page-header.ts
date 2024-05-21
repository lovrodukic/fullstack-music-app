import { Auth, Observer, Events } from "@calpoly/mustang";
import { LitElement, css, html } from "lit";

export class PageHeaderElement extends LitElement {
  render() {
    return html`
      <header>
        <h1>My App</h1>
        <drop-down>
          <a href="#" slot="actuator">
            <slot name="greeting">Hello, user</slot></a>
          <ul>
            <li>
              <label @change=${toggleLightMode}>
                <input type="checkbox" autocomplete="off" />
                Light mode
              </label>
            </li>
            <li>
              <a
                href="#"
                onclick="relayEvent(event, 'auth:message', ['auth/signout'])"
                >Sign out</a
              >
            </li>
          </ul>
        </drop-down>
      </header>
    `;
  }

  static styles = css`
    :host {
      display: contents;
    }
    * {
      margin: 0;
      box-sizing: border-box;
    }
    header {
      grid-column: start / end;
      margin: 0 calc(-0.5);
      display: flex;
      align-items: baseline;
      justify-content: space-between;
      padding: var(--size-spacing-med);
      background-color: var(--color-page-background);
      color: var(--color-text);
    }
    header a[href] {
      color: var(--color--age-element);
    }
    h1 {
      font-family: var(--font-family-main);
      font-size: var(--size-type-xlarge);
      font-style: oblique;
      line-height: 1;
    }
    ul {
      list-style: none;
      padding: var(--size-spacing-med);
    }
  `;

  _authObserver = new Observer<Auth.Model>(
    this,
    "page:auth"
  );
}

type Checkbox = HTMLInputElement & { checked: boolean; };

function toggleLightMode(ev: InputEvent) {
  const target = ev.target as Checkbox;
  const checked = target.checked;

  Events.relay(ev, "light-mode", { checked });
}

