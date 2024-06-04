import { LitElement, html } from "lit";
import page from "../css/page";
import reset from "../css/reset";
import tokens from "../css/tokens";

export class ArtistFilter extends LitElement {
  _handleChange(value: string | null) {
    const selectionEvent = new CustomEvent(
      "artist-filter:select",
      {
        bubbles: true,
        composed: true,
        detail: { artist: value }
      }
    );

    this.dispatchEvent(selectionEvent);
  }

  render() {
    return html`
      <input
        @change="${(event: InputEvent) => {
        const target = event.target as HTMLInputElement;
        this._handleChange(target.value);
      }}"
        placeholder="Filter by artist..."
      >
    `;
  }

  static styles = [
    page,
    reset,
    tokens
  ];
}
