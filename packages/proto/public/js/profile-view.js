import { prepareTemplate } from "./template.js";
import { loadJSON } from "./json-loader.js";

export class ProfileViewElement extends HTMLElement {
  static styles = `* {
    margin: 0;
    box-sizing: border-box;
    }
    section {
      display: grid;
      grid-template-columns: [key] 1fr [value] 2fr [end];
      gap: var(--size-spacing-large);
      align-items: end;
    }
    dl {
      display: grid;
      grid-column: key / end;
      grid-template-columns: subgrid;
      gap: 0 var(--size-spacing-large);
      align-items: baseline;
    }
    dt {
      grid-column: key;
      justify-self: end;
    }
    dd {
      grid-column: value;
    }
    :host.photo {
      border-radius: 50%;
      display: block;
      height: 200px;
      margin: 1rem auto 1rem auto;
      width: 200px;
    }
    ::slotted(ul) {
      list-style: none;
      display: flex;
      gap: var(--size-spacing-med);
    }
  `;

  static template = prepareTemplate(
    `<template>
      <section>
        <slot name="photo"></slot>
        <h1><slot name="name"></slot></h1>
        <dl>
          <dt>Username</dt>
          <dd><slot name="userid"></slot></dd>
          <dt>Password</dt>
          <dd><slot name="password"></slot></dd>
          <dt>Bio</dt>
          <dd><slot name="bio"></slot></dd>
          <dt>Playlists</dt>
          <dd><slot name="playlists"></slot></dd>
        </dl>
      </section>
      <style>${ProfileViewElement.styles}</style>
    </template>`
  );

  constructor() {
    super();

    this.attachShadow({ mode: "open" }).appendChild(
      ProfileViewElement.template.cloneNode(true)
    );
  }

  connectedCallback() {
    const src = this.getAttribute("src");
    const open = this.hasAttribute("open");

    if (open) loadJSON(src, this, renderSlots);
  }
}

function renderSlots(json) {
  const entries = Object.entries(json);
  const slot = ([key, value]) => {
    return `<span slot="${key}">${value}</span>`;
  };

  return entries.map(slot).join("\n");
}

customElements.define("profile-view", ProfileViewElement);

export class ProfilePhotoElement extends HTMLElement {
  get src() {
    return this.getAttribute("src");
  }

  get photo() {
    return this.shadowRoot.querySelector(".photo");
  }

  static template = prepareTemplate(
    `<template>
      <div class="photo">
      </div>
      <style>
      :host {
        display: contents;
        --photo-size: 100px;
      }
      .photo {
        grid-column: key;
        justify-self: end;
        position: relative;
        width: var(--photo-size);
        aspect-ratio: 1;
        background-size: cover;
        border-radius: 50%;
        text-align: center;
        line-height: var(--photo-size);
        font-size: calc(0.66 * var(--photo-size));
        font-family: var(--font-family-main);
        overflow: hidden;
      }
      </style>
    </template>
  `
  );

  constructor() {
    super();

    this.attachShadow({ mode: "open" }).appendChild(
      ProfilePhotoElement.template.cloneNode(true)
    );
  }

  connectedCallback() {
    console.log("Profile photo connected", this);
    this.photo.style.setProperty("background-image", `url('${this.src}')`);
  }

  attributeChangedCallback(name, from, to) {
    switch (name) {
      case "src":
        this.avatar.style.setProperty("background-image", `url(${to})`);
        break;
    }
  }
}

customElements.define("profile-avatar", ProfilePhotoElement);
