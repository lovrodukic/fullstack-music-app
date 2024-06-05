// @ts-ignore
import { Profile, Playlist, Song } from "server/models";

export interface Model {
  profile?: Profile;
  playlist?: Playlist;
  songs?: Song[];
  users?: Profile[];
}

export const init: Model = {};
