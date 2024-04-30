export interface Profile {
  userid: string;
  name: string;
  password: string;
  bio: string;
  playlists: Array<String>;
  photo: string | undefined;
}
