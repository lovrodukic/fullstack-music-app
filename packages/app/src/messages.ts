// @ts-ignore
import { Profile, Playlist } from "server/models";

export type Msg =
  | ["profile/save", { userid: string; profile: Profile; }]
  | ["profile/select", { userid: string; }]
  | ["playlist/select", { playlistid: string; ownerid: string; }];
