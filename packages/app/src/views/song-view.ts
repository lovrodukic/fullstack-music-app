import { define, View } from "@calpoly/mustang";
import { html, css, LitElement } from "lit";
// @ts-ignore
import { Song } from "server/models";
import { Msg } from "../messages";
import { Model } from "../model";
import page from "../css/page";
import reset from "../css/reset";
import tokens from "../css/tokens";

class SongViewer extends LitElement {
  render() {
    return html`
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

export class SongViewElement extends View<Model, Msg> {
  static uses = define({
    "song-viewer": SongViewer,
  });

  constructor() {
    super("page:model");
  }

  connectedCallback() {
    super.connectedCallback();
    this.dispatchMessage(["songs/get"]);
  }

  render() {
    const renderSongs = () => {
      const songs = this.model.songs || [];

      return songs.map(
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
      </nav>
      <song-viewer>
        <ol slot="songs">
          ${renderSongs()}
        </ol>
      </song-viewer>
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
