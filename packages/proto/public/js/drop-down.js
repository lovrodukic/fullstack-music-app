import { prepareTemplate } from "./template.js";

export class DropdownElement extends HTMLElement {
  static template = prepareTemplate(
    `<template>
      <slot name="actuator">
        <button> Explore </button>
      </slot>
      <div id="panel">
        <slot></slot>
      </div>

      <style>
        button {
          background-color: var(--color-button);
          border: none;
          color: var(--color-text);
          cursor: pointer;
          font-size: var(--size-type-small);
          font-weight: bold;
          margin: var(--size-spacing-med);
          padding: var(--size-spacing-large);
        }
        button:hover {
            background-color: var(--color-button-hover);
        }
        :host {
          position: relative;
        }
        #is-shown {
          display: none;
        }
        #panel {
          display: none;
          position: absolute;
          right: 0;
          margin-top: var(--size-spacing-small);
          width: max-content;
          padding: var(--size-spacing-small);
          background: var(--color-page-background);
          color: var(--color-text);
          box-shadow: var(--color-shadow);
        }
        :host([open]) #panel {
          display: block;
        }
      </style>
    </template>`
  );

  constructor() {
    super();

    this.attachShadow({ mode: "open" }).appendChild(
      DropdownElement.template.cloneNode(true)
    );
    this.shadowRoot
      .querySelector("slot[name='actuator']")
      .addEventListener("click", () => this.toggle());
  }

  toggle() {
    if (this.hasAttribute("open")) this.removeAttribute("open");
    else this.setAttribute("open", "open");
  }
}

customElements.define("drop-down", DropdownElement);
