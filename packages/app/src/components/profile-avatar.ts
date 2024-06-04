import { css, html, LitElement } from "lit";
import { property } from "lit/decorators.js";
import page from "../css/page";
import reset from "../css/reset";
import tokens from "../css/tokens";

export class ProfileAvatarElement extends LitElement {
  @property()
  src?: string;

  render() {
    return html`
      <div
        class="avatar"
        style="
        ${this.src
        ? `background-image: url('${this.src}');`
        : ""}
      "></div>
    `;
  }

  static styles = [
    page,
    reset,
    tokens,
    css`
      :host {
        display: contents;
        --avatar-size: 100px;
      }
      
      .avatar {
        grid-column: key;
        justify-self: end;
        position: relative;
        width: var(--avatar-size);
        aspect-ratio: 1;
        background-size: cover;
        border-radius: 50%;
        text-align: center;
        line-height: var(--avatar-size);
        font-size: calc(0.66 * var(--avatar-size));
        overflow: hidden;
      }
  `];
}