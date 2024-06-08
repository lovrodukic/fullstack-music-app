import { define, View } from "@calpoly/mustang";
import { html, css, LitElement } from "lit";
import { property, state } from "lit/decorators.js";
// @ts-ignore
import { Playlist, Song } from "server/models";
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
        <div class="header-container2">
          <h3>Title:</h3><h3>Artist:</h3>
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

      .header-container2 {
        display: flex;
        align-items: center;
        gap: 255px;
      }
    `
  ];
}

// class PlaylistEditor extends LitElement {
//   static uses = define({
//     "mu-form": Form.Element,
//     "input-array": InputArray.Element
//   });

//   @property({ attribute: "playlist-id", reflect: true })
//   name = "";

//   @property({ attribute: "owner-id", reflect: true })
//   owner = "";

//   @property({ attribute: false })
//   init?: Playlist;

//   render() {
//     return html`
//       <section>
//         <div class="header-container">
//           <h1><slot name="name"></slot></h1>
//           <nav>
//             <a class="close" href="../${this.name}/${this.owner}">
//               Close
//             </a>
//             <button class="delete">Delete</button>
//           </nav>
//         </div>
//         <mu-form .init=${this.init}>
//           <label>
//             <span>Songs</span>
//             <input-array name="songs">
//               <span slot="label-add">Add a song</span>
//             </input-array>
//           </label>
//         </mu-form>
//       </section>
//     `;
//   }

//   static styles = [
//     page,
//     reset,
//     tokens,
//     css`
//       mu-form {
//         display: flex;
//         justify-content: center;
//         align-items: center;
//       }

//       h3 {
//         font-weight: bold;
//       }

//       h3.bio, h4.bio {
//         text-align: center
//       }

//       slot[name="avatar"] {
//         padding: 20px;
//         display: flex;
//         justify-content: center;
//         align-items: center;
//       }

//       mu-form {
//         grid-column: key / end;
//       }

//       mu-form input {
//         grid-column: input;
//       }

//       .header-container {
//         display: flex;
//         align-items: center;
//         justify-content: center;
//       }

//       button.delete {
//         grid-column: input;
//         justify-self: start;
//         padding: 5px;
//         margin: 0.5px;
//       }

//       button.remove {
//         justify-self: start;
//         padding: 5px;
//       }

//       nav {
//         margin: 8px;
//       }
//     `
//   ];
// }

export class PlaylistViewElement extends View<Model, Msg> {
  static uses = define({
    "playlist-viewer": PlaylistViewer,
    "artist-filter": ArtistFilter
  });

  @property({ type: Boolean, reflect: true })
  edit = false;

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

    console.log(`SONGS ${songs.map((song: Song) => song.title)}`);

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
          <a href="/app/playlist/${playlistid}/${this.ownerid}/edit"
            class="edit">
              Edit
          </a>
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

  // _handleSubmit(event: Form.SubmitEvent<Playlist>) {
  //   console.log("Handling submit of mu-form");
  //   this.dispatchMessage([
  //     "playlist/save",
  //     {
  //       playlistid: this.playlistid,
  //       ownerid: this.ownerid,
  //       onSuccess: () =>
  //         History.dispatch(this, "history/navigate", {
  //           href: `/app/playlist/${this.playlistid}/${this.ownerid}`
  //         }),
  //       onFailure: (error: Error) =>
  //         console.log("ERROR:", error)
  //     }
  //   ]);
  // }
}
