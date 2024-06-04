import { define, Events, Rest } from "@calpoly/mustang";
import { html, css, LitElement } from "lit";
import page from "../css/page";
import reset from "../css/reset";
import tokens from "../css/tokens";

define({ "restful-form": Rest.FormElement });

export class SignupFormElement extends LitElement {
  render() {
    return html`
      <restful-form new src="/auth/register">
        <slot></slot>
        <button slot="submit">Submit</button>
      </restful-form>
    `;
  }

  static styles = [
    page,
    reset,
    tokens,
    css`
      ::slotted(*) {
        padding: 8px;
      }

      button {
        grid-column: input;
        justify-self: start;
        padding: 5px;
        margin: 0px;
      }

      restful-form {
        display: flex;
        justify-content: center;
        align-items: center;
      }
    `];

  get next() {
    let query = new URLSearchParams(document.location.search);
    return query.get("next");
  }

  constructor() {
    super();

    this.addEventListener(
      "mu-rest-form:created",
      (event: Event) => {
        const detail = (event as CustomEvent).detail;
        const { token } = detail.created;
        const redirect = this.next || "/";
        console.log("Signup successful", detail, redirect);

        Events.relay(event, "auth:message", [
          "auth/signin",
          { token, redirect }
        ]);
      }
    );
  }
}
