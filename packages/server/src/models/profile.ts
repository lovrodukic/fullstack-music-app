export interface Profile {
  userid: string;
  name: string;
  password: string;
  bio: string;
  playlists: Array<String>;
  avatar: string | undefined;
}
