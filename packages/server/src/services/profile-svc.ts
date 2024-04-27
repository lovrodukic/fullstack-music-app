import { Schema, Model, Document, model } from "mongoose";
import { Profile } from "../models/profile";

const ProfileSchema = new Schema<Profile>(
  {
    id: { type: String, required: true, trim: true },
    userid: { type: String, required: true, trim: true },
    password: { type: String, required: true, trim: true },
    bio: String,
    playlists: [String],
    photo: String
  },
  { collection: "user_profiles" }
);

const ProfileModel = model<Profile>("Profile", ProfileSchema);

// in-memory DB
let profiles: Array<Profile> = [
  {
    id: "lovro",
    userid: "lovrodukic",
    password: "hashedPassword",
    bio: "I like music!",
    playlists: ["Sample Playlist", "Other Playlist"],
    photo: "/data/images/test_profile.webp"
  }
];

function index(): Promise<Profile[]> {
  return ProfileModel.find();
}

function get(userid: String): Promise<Profile> {
  return ProfileModel.find({ userid })
    .then((list) => list[0])
    .catch((err) => {
      throw `${userid} Not Found`;
    });
}

function create(profile: Profile): Promise<Profile> {
  const p = new ProfileModel(profile);
  return p.save();
}

export default { index, get, create };
