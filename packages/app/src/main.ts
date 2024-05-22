import { define, Auth, Store } from "@calpoly/mustang";
import { PageHeaderElement } from "./components/page-header";
import { Msg } from "./messages";
import { Model, init } from "./model";
import update from "./update";
import { ProfileViewElement } from "./views/profile-view";

define({
  "mu-auth": Auth.Provider,
  "mu-store": class AppStore extends Store.Provider<
    Model,
    Msg
  > {
    constructor() {
      super(update, init, "blazing:auth");
    }
  },
  "profile-view": ProfileViewElement,
  "page-header": PageHeaderElement
});
