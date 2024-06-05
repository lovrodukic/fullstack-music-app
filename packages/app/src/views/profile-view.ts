import { define, View, Form, InputArray, History } from "@calpoly/mustang";
import { html, css, LitElement } from "lit";
import { property } from "lit/decorators.js";
// @ts-ignore
import { Profile } from "server/models";
import { ProfileAvatarElement } from "../components/profile-avatar";
import { Msg } from "../messages";
import { Model } from "../model";
import page from "../css/page";
import reset from "../css/reset";
import tokens from "../css/tokens";

class ProfileViewer extends LitElement {
  @property()
  username?: string;

  render() {
    return html`
      <section>
        <slot name="avatar"></slot>
        <div class="header-container">
          <h2 class="profile"><slot name="name"></slot></h2>
          <nav class="profile">
            <a href="${this.username}/edit" class="edit">Edit</a>
          </nav>
        </div>
        <dl>
          <h3 class="bio">Bio:</h3>
          <h4 class="bio"><slot name="bio"></slot></h4>
          <h3>Playlists:</h3>
          <dd><slot name="playlists"></slot></dd>
        </dl>
      </section>
    `;
  }

  static styles = [
    page,
    reset,
    tokens,
    css`
      h3 {
        font-weight: bold;
      }

      h3.bio, h4.bio {
        text-align: center
      }

      slot[name="avatar"] {
        padding: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .header-container {
        display: flex;
        align-items: center;
        justify-content: center;
      }
    `
  ];
}

class ProfileEditor extends LitElement {
  static uses = define({
    "mu-form": Form.Element,
    "input-array": InputArray.Element
  });

  @property()
  username?: string;

  @property({ attribute: false })
  init?: Profile;

  render() {
    return html`
      <section>
        <slot name="avatar"></slot>
        <div class="header-container">
          <h1><slot name="name"></slot></h1>
          <nav>
            <a class="close" href="../${this.username}">Close</a>
            <button class="delete">Delete</button>
          </nav>
        </div>
        <mu-form .init=${this.init}>
          <label>
            <span>Username</span>
            <input disabled name="userid" />
          </label>
          <label>
            <span>Name</span>
            <input name="name" />
          </label>
          <label>
            <span>Playlists</span>
            <input-array name="playlists">
              <span slot="label-add">Add a playlist</span>
            </input-array>
          </label>
          <label>
            <span>Avatar</span>
            <input name="avatar" />
          </label>
        </mu-form>
      </section>
    `;
  }

  static styles = [
    page,
    reset,
    tokens,
    css`
      mu-form {
        display: flex;
        justify-content: center;
        align-items: center;
      }

      h3 {
        font-weight: bold;
      }

      h3.bio, h4.bio {
        text-align: center
      }

      slot[name="avatar"] {
        padding: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      mu-form {
        grid-column: key / end;
      }
      
      mu-form input {
        grid-column: input;
      }

      .header-container {
        display: flex;
        align-items: center;
        justify-content: center;
      }

      button.delete {
        grid-column: input;
        justify-self: start;
        padding: 5px;
        margin: 0.5px;
      }

      button.remove {
        justify-self: start;
        padding: 5px;
      }
    `
  ];
}

export class ProfileViewElement extends View<Model, Msg> {
  static uses = define({
    "profile-viewer": ProfileViewer,
    "profile-avatar": ProfileAvatarElement,
    "profile-editor": ProfileEditor
  });

  @property({ type: Boolean, reflect: true })
  edit = false;

  @property({ attribute: "user-id", reflect: true })
  userid = "";

  @property()
  get profile(): Profile | undefined {
    return this.model.profile;
  }

  constructor() {
    super("page:model");
  }

  attributeChangedCallback(
    name: string,
    oldValue: string,
    newValue: string
  ) {
    super.attributeChangedCallback(name, oldValue, newValue);
    if (
      name === "user-id" &&
      oldValue !== newValue &&
      newValue
    ) {
      console.log("Profile Page:", newValue);
      this.dispatchMessage([
        "profile/select",
        { userid: newValue }
      ]);
    }
  }

  render() {
    const {
      userid,
      avatar,
      name,
      bio,
      playlists = []
    } = this.profile || {};

    const playlistsHTML = playlists.map(
      (s: any) =>
        html`
          <li>
            <a href="../playlist/${s}/${userid}">${s}</a>
          </li>
        `
    );

    const fields = html`
      <profile-avatar slot="avatar" src=${avatar}></profile-avatar>
    `;

    return this.edit
      ? html`
        <profile-editor
            username=${userid}
            .init=${this.profile}
            @mu-form:submit=${(
        event: Form.SubmitEvent<Profile>
      ) => this._handleSubmit(event)}>
            ${fields}
        </profile-editor>
      `
      : html`
        <profile-viewer username=${userid}>
          ${fields}
          <span slot="name">${name}</span>
          <span slot="bio">${bio}</span>
          <ul slot="playlists">
            ${playlistsHTML}
          </ul>
        </profile-viewer>
    `;
  }

  static styles = [
    page,
    reset,
    tokens,
    css`
      ul {
        list-style: none;
        margin: 0;
        padding: 0;
        margin-block-start: 0;
        margin-block-end: 0;
        margin-inline-start: 0px;
        margin-inline-end: 0px;
        padding-inline-start: 0px;
      }

      a:hover {
        color: var(--color-button);
      }
    `
  ];

  _handleSubmit(event: Form.SubmitEvent<Profile>) {
    console.log("Handling submit of mu-form");
    this.dispatchMessage([
      "profile/save",
      {
        userid: this.userid,
        profile: event.detail,
        onSuccess: () =>
          History.dispatch(this, "history/navigate", {
            href: `/app/profile/${this.userid}`
          }),
        onFailure: (error: Error) =>
          console.log("ERROR:", error)
      }
    ]);
  }
}
