import { define, View } from "@calpoly/mustang";
import { html, css, LitElement } from "lit";
// @ts-ignore
import { Song } from "server/models";
import { Msg } from "../messages";
import { Model } from "../model";
import page from "../css/page";
import reset from "../css/reset";
import tokens from "../css/tokens";

class UsersViewer extends LitElement {
  render() {
    return html`
        <dl>
          <dd><slot name="users"></slot></dd>
        </dl>
      </section>
    `;
  }

  static styles = [
    page,
    reset,
    tokens,
    css`
      ol {
        list-style: none;
        margin: 0;
        padding: 0;
        margin-block-start: 0;
        margin-block-end: 0;
        margin-inline-start: 0px;
        margin-inline-end: 0px;
        padding-inline-start: 0px;
      }

      .header-container {
        display: flex;
        align-items: center;
      }
    `
  ];
}

export class UsersViewElement extends View<Model, Msg> {
  static uses = define({
    "users-viewer": UsersViewer,
  });

  constructor() {
    super("page:model");
  }

  connectedCallback() {
    super.connectedCallback();
    this.dispatchMessage(["users/get"]);
  }

  render() {
    const renderUsers = () => {
      const users = this.model.users || [];

      return users.map(
        (u: any) =>
          html`
            <li>
              <h3><a href="/app/profile/${u.userid}">${u.name}</a></h3>
            </li>
          `
      );
    };

    return html`
      </nav>
      <users-viewer>
        <ol slot="users">
          ${renderUsers()}
        </ol>
      </users-viewer>
    `;
  }

  static styles = [
    page,
    reset,
    tokens,
    css`
      nav, a {
        display: flex;
        align-items: center;
        width: fit-content;
        margin: 10px;
        padding: 1px;
      }

      a:hover {
        color: var(--color-button);
      }
    `
  ];
}
