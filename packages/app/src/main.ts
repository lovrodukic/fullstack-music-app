import { define, Auth, Store, History, Switch } from "@calpoly/mustang";
import { html } from "lit";
import { PageHeaderElement } from "./components/page-header";
import { Msg } from "./messages";
import { Model, init } from "./model";
import update from "./update";
import { ProfileViewElement } from "./views/profile-view";
import { PlaylistViewElement } from "./views/playlist-view";

const routes = [
  {
    path: "/app/profile/:id",
    view: (params: Switch.Params) => html`
      <profile-view user-id=${params.id}></profile-view>
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
  "profile-view": ProfileViewElement,
  "playlist-view": PlaylistViewElement,
  "page-header": PageHeaderElement
});
