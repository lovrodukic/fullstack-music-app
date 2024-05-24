export interface Playlist {
  playlistid: string,
  owner: string;
  songs: Array<Song>;
}

export interface Song {
  title: string;
  artist: string;
}
