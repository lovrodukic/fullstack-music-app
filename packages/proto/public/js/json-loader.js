import { addFragment } from "./html-loader.js";
import { prepareTemplate } from "./template.js";

export class JsonObjectElement extends HTMLElement {
  static template = prepareTemplate(
    `<template>
      <dl>
        <slot></slot>
      </dl>
    
      <style>
        dl {
          display: grid;
          grid-template-columns: 1fr 3fr;
        }
        ::slotted(dt) {
          color: var(--color-button);
          grid-column-start: 1;
        }
        ::slotted(dd) {
          grid-column-start: 2;
        }
      </style>
    </template>`
  );

  constructor() {
    super();

    this.attachShadow({ mode: "open" }).appendChild(
      JsonObjectElement.template.cloneNode(true)
    );
  }

  connectedCallback() {
    const src = this.getAttribute("src");
    const open = this.getAttribute("open");

    if (open) loadJSON(src, this, renderJSON);

    this.addEventListener("json-object:open", () =>
      loadJSON(src, this, renderJSON)
    );
  }
}

customElements.define("json-object", JsonObjectElement);

export function loadJSON(src, container, render) {
  container.replaceChildren();
  fetch(src)
    .then((res) => {
      if (res.status !== 200) {
        throw `Status: ${res.status}`;
      }
      return res.json();
    })
    .then((json) => addFragment(render(json), container))
    .catch((err) =>
      addFragment(
        `<dt class="error">Error</dt>
        <dd>${err}</dd>
        <dt>While Loading</dt>
        <dd>${src}</dd>`,
        container
      )
    );
}

function renderJSON(json) {
  const entries = Object.entries(json);
  const dtdd = ([key, value]) =>
    `<dt>${key}</dt>
    <dd>${value}</dd>`;

  return entries.map(dtdd).join("\n");
}
