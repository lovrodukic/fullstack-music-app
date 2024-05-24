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

function get(playlistid: String): Promise<Playlist> {
  return PlaylistModel.find({ playlistid })
    .then((list) => list[0])
    .catch((err) => {
      throw `Playlist "${playlistid}" Not Found`;
    });
}

export default {
  index,
  get,
  Schema: playlistSchema
};
