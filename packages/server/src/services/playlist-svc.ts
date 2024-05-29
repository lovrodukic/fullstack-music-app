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
  // return PlaylistModel.find({ playlistid, ownerid })
  //   .then((list) => list[0])
  //   .catch((err) => {
  //     throw `Playlist "${playlistid} by ${ownerid}" Not Found`;
  //   });
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

export default {
  index,
  get,
  Schema: playlistSchema
};
