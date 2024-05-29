import { define, View, Form, InputArray, History } from "@calpoly/mustang";
import { css, html, LitElement } from "lit";
import { property } from "lit/decorators.js";
// @ts-ignore
import { Profile } from "server/models";
import { ProfileAvatarElement } from "../components/profile-avatar";
import { Msg } from "../messages";
import { Model } from "../model";

class ProfileViewer extends LitElement {
  @property()
  username?: string;

  render() {
    return html`
      <section>
        <slot name="avatar"></slot>
        <h1><slot name="name"></slot></h1>
        <nav>
          <a href="${this.username}/edit" class="edit">Edit</a>
        </nav>
        <dl>
          <dt>Bio</dt>
          <dd><slot name="bio"></slot></dd>
          <dt>Playlists</dt>
          <dd><slot name="playlists"></slot></dd>
        </dl>
      </section>
    `;
  }
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
        <h1><slot name="name"></slot></h1>
        <nav>
          <a class="close" href="../${this.username}">Close</a>
          <button class="delete">Delete</button>
        </nav>
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

    const playlists_html = playlists.map(
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
            ${playlists_html}
          </ul>
        </profile-viewer>
    `;
  }

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