import { Auth, Observer } from "@calpoly/mustang";
import { prepareTemplate } from "./template.js";
import { relayEvent } from "./relay-event.js";
import { addFragment } from "./html-loader.js";
import "./drop-down.js";

export class PageHeaderElement extends HTMLElement {
  static template = prepareTemplate(
    `<template>
      <header>
        <h1>My App</h1>
        <drop-down>
          <a href="#" slot="actuator">
            <slot name="greeting">Hello, user</slot></a>
          <ul>
            <li>
              <label
                onchange="relayEvent(event, 'light-mode', 
                  {checked: event.target.checked})"
                >
                <input type="checkbox" autocomplete="off" />
                Light mode
              </label>
            </li>
            <li>
              <a
                href="#"
                onclick="relayEvent(event, 'auth:message', ['auth/signout'])"
                >Sign out</a
              >
            </li>
          </ul>
        </drop-down>
      </header>
      <style>
      :host {
        display: contents;
      }
      * {
        margin: 0;
        box-sizing: border-box;
      }
      header {
        grid-column: start / end;
        margin: 0 calc(-0.5);
        display: flex;
        align-items: baseline;
        justify-content: space-between;
        padding: var(--size-spacing-med);
        /* flex-wrap: wrap;
        gap: var(--size-spacing-xlarge); */
        background-color: var(--color-page-background);
        color: var(--color-text);
      }
      header a[href] {
        color: var(--color--age-element);
      }
      h1 {
        font-family: var(--font-family-main);
        font-size: var(--size-type-xlarge);
        font-style: oblique;
        line-height: 1;
      }
      ul {
        list-style: none;
        padding: var(--size-spacing-med);
      }
      </style>
    </template>`
  );

  constructor() {
    super();

    this.attachShadow({ mode: "open" }).appendChild(
      PageHeaderElement.template.cloneNode(true)
    );
  }

  _authObserver = new Observer(this, "page:auth");

  connectedCallback() {
    this._authObserver.observe().then((obs) => {
      obs.setEffect(({ user }) => {
        if (user) {
          const { username } = user;
          this.replaceChildren();
          addFragment(`<span slot="greeting">Hello, ${username}</span>`, this);
        }
      });
    });
  }
}

customElements.define("page-header", PageHeaderElement);
