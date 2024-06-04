import { define, View } from "@calpoly/mustang";
import { html, css, LitElement } from "lit";
import { property, state } from "lit/decorators.js";
// @ts-ignore
import { Playlist } from "server/models";
import { ArtistFilter } from "../components/artist-filter";
import { Msg } from "../messages";
import { Model } from "../model";
import page from "../css/page";
import reset from "../css/reset";
import tokens from "../css/tokens";

class PlaylistViewer extends LitElement {
  @property({ attribute: "owner-id", reflect: true })
  ownerid = "";

  render() {
    return html`
      <section>
        <div class="header-container">
          <h2><slot name="playlistid"></slot></h2>
          <h2><artist-filter></artist-filter></h2>
        </div>
        <dl>
          <dd><slot name="songs"></slot></dd>
        </dl>
      </section>
    `;
  }

  static styles = [
    page,
    reset,
    tokens,
    css`
      ol {
        list-style: none;
        margin: 0;
        padding: 0;
        margin-block-start: 0;
        margin-block-end: 0;
        margin-inline-start: 0px;
        margin-inline-end: 0px;
        padding-inline-start: 0px;
      }

      .header-container {
        display: flex;
        align-items: center;
      }
    `
  ];
}

export class PlaylistViewElement extends View<Model, Msg> {
  static uses = define({
    "playlist-viewer": PlaylistViewer,
    "artist-filter": ArtistFilter
  });

  @property({ attribute: "playlist-id", reflect: true })
  playlistid = "";

  @property({ attribute: "owner-id", reflect: true })
  ownerid = "";

  @property()
  get playlist(): Playlist | undefined {
    return this.model.playlist;
  }

  @state()
  selectedArtist: String | undefined;

  constructor() {
    super("page:model");

    this.addEventListener("artist-filter:select", (event) => {
      const { detail } = event as CustomEvent;
      const { artist } = detail as { artist: String; };
      this.selectedArtist = artist;
    });
  }

  attributeChangedCallback(
    attributeName: string,
    oldValue: string,
    newValue: string
  ) {
    super.attributeChangedCallback(attributeName, oldValue, newValue);
    if (
      attributeName === "playlist-id" &&
      oldValue !== newValue &&
      newValue
    ) {
      console.log("Playlist Page:", newValue);
      this.dispatchMessage([
        "playlist/select",
        { playlistid: newValue, ownerid: this.ownerid }
      ]);
    } else if (
      attributeName === "owner-id" &&
      oldValue !== newValue &&
      newValue
    ) {
      console.log("Playlist Page:", newValue);
      this.dispatchMessage([
        "playlist/select",
        { playlistid: this.playlistid, ownerid: newValue }
      ]);
    }
  }

  render() {
    const {
      playlistid,
      songs = []
    } = this.playlist || {};

    console.log(songs);

    const renderArtists = () => {
      let songsList;

      if (this.selectedArtist) {
        songsList = songs.filter((s: any) => s.artist.toLocaleLowerCase() ===
          this.selectedArtist?.toLocaleLowerCase());
      } else {
        songsList = songs;
      }

      return songsList.map(
        (s: any) =>
          html`
            <li>
              <h3>${s.title}</h3>
              <h4>${s.artist}</h4>
            </li>
          `
      );
    };

    return html`
      <nav class="profile">
        <a href="/app/profile/${this.ownerid}/edit" class="edit">Edit</a>
      </nav>
      <playlist-viewer>
        <span slot="playlistid">${playlistid}</span>
        <ol slot="songs">
          ${renderArtists()}
        </ol>
      </playlist-viewer>
    `;
  }

  static styles = [
    page,
    reset,
    tokens,
    css`
      nav, a {
        display: flex;
        align-items: center;
        width: fit-content;
        margin: 10px;
        padding: 1px;
      }
    `
  ];
}
