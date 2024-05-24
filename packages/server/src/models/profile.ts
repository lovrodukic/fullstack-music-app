import { Playlist } from "./playlists";

export interface Profile {
  userid: string;
  name: string;
  bio: string;
  playlists: Array<string>;
  avatar: string | undefined;
}
