// @ts-ignore
import { Profile, Playlist } from "server/models";

export type Msg =
  | ["songs/get"]
  | ["users/get"]
  | [
    "profile/save",
    {
      userid: string;
      profile: Profile;
      onSuccess?: () => void;
      onFailure?: (err: Error) => void;
    }
  ]
  | ["profile/select", { userid: string; }]
  | ["playlist/select", { playlistid: string; ownerid: string; }]
  | [
    "playlist/save",
    {
      playlistid: string;
      ownerid: string;
      onSuccess?: () => void;
      onFailure?: (err: Error) => void;
    }
  ];
