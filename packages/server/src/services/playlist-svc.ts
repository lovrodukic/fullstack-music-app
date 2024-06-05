import { Schema, model } from "mongoose";
import { Playlist } from "../models/playlists";

const playlistSchema = new Schema<Playlist>(
  {
    playlistid: {
      type: String,
      trim: true
    },
    owner: {
      type: String,
      trim: true
    },
    songs: [{ title: String, artist: String }]
  },
  { collection: "playlist_collection" }
);

const PlaylistModel = model<Playlist>(
  "Playlist",
  playlistSchema
);

function index(): Promise<Playlist[]> {
  return PlaylistModel.find();
}

function get(playlistid: String, ownerid: String): Promise<Playlist> {
  return PlaylistModel.findOne({ playlistid: playlistid, owner: ownerid })
    .then((playlist) => {
      if (!playlist) {
        throw new Error(`Playlist "${playlistid}" Not Found`);
      }
      return playlist;
    })
    .catch((err) => {
      throw err; // Ensure that the error is propagated correctly
    });
}

function update(
  playlistid: String,
  ownerid: String,
  playlist: Playlist
): Promise<Playlist> {
  return PlaylistModel.findOne({ playlistid: playlistid, owner: ownerid })
    .then((found) => {
      if (!found) throw `${playlistid} Not Found`;
      else
        return PlaylistModel.findByIdAndUpdate(
          found._id,
          playlist,
          { new: true }
        );
    })
    .then((updated) => {
      if (!updated) throw `${playlistid} not updated`;
      else return updated as Playlist;
    });
}

export default {
  index,
  get,
  update,
  Schema: playlistSchema
};
