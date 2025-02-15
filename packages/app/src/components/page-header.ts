import { define, Auth, Observer, Events, Dropdown } from "@calpoly/mustang";
import { LitElement, css, html } from "lit";
import { property } from "lit/decorators.js";
import page from "../css/page";
import reset from "../css/reset";
import tokens from "../css/tokens";

export class PageHeaderElement extends LitElement {
  static uses = define({
    "drop-down": Dropdown.Element
  });

  @property()
  username?: string;

  render() {
    return html`
      <header>
        <nav>
          <a href="/app">Log In</a>
          <a href="/app/profile/${this.username}">Profile</a>
          <a href="/app/users">Users</a>
          <a href="/app/songs">Explore ♬</a>
        </nav>
        <drop-down>
          <a href="#" slot="actuator">
            <slot name="greeting">Hello, ${this.username}!</slot></a>
          <ul>
            <li>
              <label @change=${toggleLightMode}>
                <input type="checkbox" autocomplete="off" />
                Light mode
              </label>
            </li>
            <li>
              <a
                href="/app" @click=${signOutUser}>Sign out</a>
            </li>
          </ul>
        </drop-down>
      </header>
      <h1>♫ GrooveShare ♫</h1>
    `;
  }

  static styles = [
    page,
    reset,
    tokens,
    css`
      ul {
        list-style: none;
        padding: var(--size-spacing-medium);
      }

      ul > li {
        margin: 0px;
        padding: var(--size-spacing-medium);
        border-top: none;
        border-bottom: none;
      }

      h1 {
        background: var(--color-button);
        font-style: italic;
      }
      
      li {
        background: var(--color-page-background);
        display: grid;
        font-size: var(--size-type-small);
        font-weight: normal;
        margin: 0px;
      }
    `
  ];

  _authObserver = new Observer<Auth.Model>(
    this,
    "page:auth"
  );

  connectedCallback() {
    super.connectedCallback();
    this._authObserver.observe(({ user }) => {
      if (user) {
        this.username = user.username;
      }
    });
  }
}

type Checkbox = HTMLInputElement & { checked: boolean; };

function toggleLightMode(ev: InputEvent) {
  const target = ev.target as Checkbox;
  const checked = target.checked;

  Events.relay(ev, "light-mode", { checked });
}

function signOutUser(ev: Event) {
  Events.relay(ev, "auth:message", ["auth/signout"]);
}
