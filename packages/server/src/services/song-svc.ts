import { Schema, model } from "mongoose";
import { Song } from "../models/playlists";

const songSchema = new Schema<Song>(
  {
    title: {
      type: String,
      trim: true
    },
    artist: {
      type: String,
      trim: true
    },
  },
  { collection: "song_collection" }
);

const SongModel = model<Song>(
  "Song",
  songSchema
);

function index(): Promise<Song[]> {
  return SongModel.find();
}

function get(title: String, artist: String): Promise<Song> {
  return SongModel.find({ title, artist })
    .then((list) => list[0])
    .catch((err) => {
      throw `${title} by ${artist} Not Found`;
    });
}

function create(song: Song): Promise<Song> {
  const s = new SongModel(song);

  return SongModel.findOne({ title: s.title, artist: s.artist })
    .then((found) => {
      if (!found) return s.save();
      else return song as Song;
    });
}

export default {
  index,
  get,
  create,
  Schema: songSchema
};
