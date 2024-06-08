import { Auth, Update } from "@calpoly/mustang";
// @ts-ignore
import { Profile, Playlist, Song } from "server/models";
import { Msg } from "./messages";
import { Model } from "./model";

export default function update(
  message: Msg,
  apply: Update.ApplyMap<Model>,
  user: Auth.User
) {
  console.log(`Updating for message:`, message);
  switch (message[0]) {
    case "users/get":
      getUsers(user).then((users) =>
        apply((model) => ({ ...model, users }))
      );
      break;

    case "songs/get":
      getSongs(user).then((songs) =>
        apply((model) => ({ ...model, songs }))
      );
      break;

    case "profile/save":
      saveProfile(message[1], user)
        .then((profile) => apply((model) => ({ ...model, profile })))
        .then(() => {
          const { onSuccess } = message[1];
          if (onSuccess) onSuccess();
        })
        .catch((error: Error) => {
          const { onFailure } = message[1];
          if (onFailure) onFailure(error);
        });
      break;

    case "profile/select":
      selectProfile(message[1], user).then((profile) =>
        apply((model) => ({ ...model, profile }))
      );
      break;

    case "playlist/select":
      selectPlaylist(message[1], user).then((playlist) =>
        apply((model) => ({ ...model, playlist }))
      );
      break;

    case "playlist/save":
      savePlaylist(message[1], user)
        .then((playlist) => apply((model) => ({ ...model, playlist })))
        .then(() => {
          const { onSuccess } = message[1];
          if (onSuccess) onSuccess();
        })
        .catch((error: Error) => {
          const { onFailure } = message[1];
          if (onFailure) onFailure(error);
        });
      break;

    default:
      const unhandled: never = message[0];
      throw new Error(`Unhandled Auth message "${unhandled}"`);
  }
}

function getSongs(
  user: Auth.User
) {
  return fetch(`/api/songs`, {
    headers: Auth.headers(user)
  })
    .then((response: Response) => {
      if (response.status === 200) {
        return response.json();
      }
      return undefined;
    })
    .then((json: unknown) => {
      if (json) {
        console.log("Songs:", json);
        return json as Song[];
      }
    });
}

function getUsers(
  user: Auth.User
) {
  return fetch(`/api/profiles/`, {
    headers: Auth.headers(user)
  })
    .then((response: Response) => {
      if (response.status === 200) {
        return response.json();
      }
      return undefined;
    })
    .then((json: unknown) => {
      if (json) {
        console.log("Users:", json);
        return json as Profile[];
      }
    });
}

function saveProfile(
  msg: {
    userid: string;
    profile: Profile;
  },
  user: Auth.User
) {
  return fetch(`/api/profiles/${msg.userid}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...Auth.headers(user)
    },
    body: JSON.stringify(msg.profile)
  })
    .then((response: Response) => {
      if (response.status === 200) return response.json();
      else
        throw new Error(
          `Failed to save profile for ${msg.userid}`
        );
    })
    .then((json: unknown) => {
      if (json) return json as Profile;
      return undefined;
    });
}

function selectProfile(
  msg: { userid: string; },
  user: Auth.User
) {
  return fetch(`/api/profiles/${msg.userid}`, {
    headers: Auth.headers(user)
  })
    .then((response: Response) => {
      if (response.status === 200) {
        return response.json();
      }
      return undefined;
    })
    .then((json: unknown) => {
      if (json) {
        console.log("Profile:", json);
        return json as Profile;
      }
    });
}

function selectPlaylist(
  msg: { playlistid: string; ownerid: string; },
  user: Auth.User
) {
  return fetch(`/api/playlists/${msg.playlistid}/${msg.ownerid}`, {
    headers: Auth.headers(user)
  })
    .then((response: Response) => {
      if (response.status === 200) {
        return response.json();
      }
      return undefined;
    })
    .then((json: unknown) => {
      if (json) {
        console.log("Playlist:", json);
        return json as Playlist;
      }
    });
}

function savePlaylist(
  msg: { playlistid: string; ownerid: string; },
  user: Auth.User
) {
  const playlistToAdd = { playlistid: msg.playlistid, ownerid: msg.ownerid };

  return fetch(`/api/playlists/${msg.playlistid}/${msg.ownerid}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...Auth.headers(user)
    },
    body: JSON.stringify(playlistToAdd)
  })
    .then((response: Response) => {
      if (response.status === 200) return response.json();
      else
        throw new Error(
          `Failed to save playlist for ${msg.playlistid}`
        );
    })
    .then((json: unknown) => {
      if (json) return json as Playlist;
      return undefined;
    });
}
