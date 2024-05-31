import { define, View } from "@calpoly/mustang";
import { css, html, LitElement } from "lit";
import { property, state } from "lit/decorators.js";
// @ts-ignore
import { Playlist } from "server/models";
import { ArtistFilter } from "../components/artist-filter";
import { Msg } from "../messages";
import { Model } from "../model";

class PlaylistViewer extends LitElement {
  static styles = css`
    :host {
      --display-new-button: inline-block;
      --display-edit-button: inline-block;
      --display-close-button: none;
      --display-delete-button: none;
    }
    :host([mode="edit"]) {
      --display-new-button: none;
      --display-edit-button: none;
      --display-close-button: inline-block;
      --display-delete-button: inline-block;
    }
    :host([mode="new"]) {
      --display-new-button: none;
      --display-edit-button: none;
      --display-close-button: inline-block;
    }
    * {
      margin: 0;
      box-sizing: border-box;
    }
    section {
      display: grid;
      grid-template-columns: [key] 1fr [value] 3fr [controls] 1fr [end];
      gap: var(--size-spacing-medium) var(--size-spacing-xlarge);
      align-items: end;
    }
    h1 {
      grid-row: 4;
      grid-column: value;
    }
    slot[name="avatar"] {
      display: block;
      grid-row: 1 / span 4;
    }
    nav {
      display: contents;
      text-align: right;
    }
    nav > * {
      grid-column: controls;
    }
    nav > .new {
      display: var(--display-new-button);
    }
    nav > .edit {
      display: var(--display-edit-button);
    }
    nav > .close {
      display: var(--display-close-button);
    }
    nav > .delete {
      display: var(--display-delete-button);
    }
    restful-form {
      display: none;
      grid-column: key / end;
    }
    restful-form input {
      grid-column: input;
    }
    restful-form[src] {
      display: block;
    }
    dl {
      display: grid;
      grid-column: key / end;
      grid-template-columns: subgrid;
      gap: 0 var(--size-spacing-xlarge);
      align-items: baseline;
    }
    restful-form[src] + dl {
      display: none;
    }
    dt {
      grid-column: key;
      justify-self: end;
      color: var(--color-accent);
      font-family: var(--font-family-display);
    }
    dd {
      grid-column: value;
    }
    ::slotted(ul) {
      list-style: none;
      display: flex;
      gap: var(--size-spacing-medium);
    }
  `;

  render() {
    return html`
      <section>
        <h2><slot name="playlistid"></slot></h2>
        <dl>
          <dt>Songs</dt>
          <dd><slot name="songs"></slot></dd>
        </dl>
      </section>
    `;
  }
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
      if (this.selectedArtist) {
        return songs.filter((s: any) => s.artist.toLocaleLowerCase() ===
          this.selectedArtist?.toLocaleLowerCase())
          .map(
            (s: any) =>
              html`
              <li>${s.title} ${s.artist}</li>
            `
          );
      } else {
        return songs.map(
          (s: any) =>
            html`
              <li>${s.title} ${s.artist}</li>
            `
        );
      }
    };

    return html`
      <artist-filter></artist-filter>
      <playlist-viewer>
        <span slot="playlistid">${playlistid}</span>
        <ul slot="songs">
          ${renderArtists()}
        </ul>
      </playlist-viewer>
    `;
  }
}
