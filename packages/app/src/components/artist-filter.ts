import { LitElement, css, html } from "lit";
// import { property } from "lit/decorators.js";

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
      <input @change="${(event: InputEvent) => {
        const target = event.target as HTMLInputElement;
        this._handleChange(target.value);
      }}">
    `;
  }
}


