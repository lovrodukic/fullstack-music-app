import { Profile } from "../models/profile";

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

export function get(userid: String): Profile | undefined {
  return profiles.find((profile) => profile.userid === userid);
}

export default { get };
