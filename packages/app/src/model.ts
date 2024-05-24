// @ts-ignore
import { Profile, Playlist } from "server/models";

export interface Model {
  profile?: Profile;
  playlist?: Playlist;
}

export const init: Model = {};
