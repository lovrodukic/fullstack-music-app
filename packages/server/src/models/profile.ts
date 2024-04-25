import { Hash } from "crypto";

export interface Profile {
  id: string;
  userid: string;
  password: string;
  bio: string;
  playlists: Array<String>;
  photo: string | undefined;
}
