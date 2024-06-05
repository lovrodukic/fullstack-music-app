import { define, Auth, Store, History, Switch } from "@calpoly/mustang";
import { html } from "lit";
import { PageHeaderElement } from "./components/page-header";
import { Msg } from "./messages";
import { Model, init } from "./model";
import update from "./update";
import { ProfileViewElement } from "./views/profile-view";
import { UsersViewElement } from "./views/users-view.ts";
import { PlaylistViewElement } from "./views/playlist-view";
import { SongViewElement } from "./views/song-view.ts";
import { LandingViewElement } from "./views/landing-view";
import { RegistrationViewElement } from "./views/registration-view.ts";

const routes = [
  {
    path: "/app/songs",
    view: () => html`
      <song-view></song-view>
    `
  },
  {
    path: "/app/users",
    view: () => html`
      <users-view></users-view>
    `
  },
  {
    path: "/app/profile/:id",
    view: (params: Switch.Params) => html`
      <profile-view user-id=${params.id}></profile-view>
    `
  },
  {
    path: "/app/profile/:id/edit",
    view: (params: Switch.Params) => html`
      <profile-view edit user-id=${params.id}></profile-view>
    `
  },
  {
    path: "/app/playlist/:id/:owner",
    view: (params: Switch.Params) => html`
      <playlist-view playlist-id=${params.id} owner-id=${params.owner}>
      </playlist-view>
    `
  },
  {
    path: "/app/playlist/:id/:owner/edit",
    view: (params: Switch.Params) => html`
      <playlist-view edit playlist-id=${params.id} owner-id=${params.owner}>
      </playlist-view>
    `
  },
  {
    path: "/app/register",
    view: () => html`
      <registration-view></registration-view>
    `
  },
  {
    path: "/app",
    view: () => html`
      <landing-view></landing-view>
    `
  },
  {
    path: "/",
    redirect: "/app"
  }
];

define({
  "mu-auth": Auth.Provider,
  "mu-store": class AppStore extends Store.Provider<
    Model,
    Msg
  > {
    constructor() {
      super(update, init, "page:auth");
    }
  },
  "mu-history": History.Provider,
  "mu-switch": class AppSwitch extends Switch.Element {
    constructor() {
      super(routes, "page:history");
    }
  },
  "landing-view": LandingViewElement,
  "registration-view": RegistrationViewElement,
  "users-view": UsersViewElement,
  "profile-view": ProfileViewElement,
  "playlist-view": PlaylistViewElement,
  "song-view": SongViewElement,
  "page-header": PageHeaderElement
});
