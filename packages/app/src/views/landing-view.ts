import { html, css, LitElement } from "lit";
import { define, Auth } from "@calpoly/mustang";
import { LoginFormElement } from "../components/login-form";

define({
  "mu-auth": Auth.Provider,
  "login-form": LoginFormElement,
});

export class LandingViewElement extends LitElement {

  render() {
    return html`
      <body class="page">
        <mu-auth>
          <h2>User Login</h2>
          <main class="card">
            <login-form>
              <label>
                <span>Username:</span>
                <input name="username" autocomplete="off" />
              </label>
              <label>
                <span>Password:</span>
                <input type="password" name="password" />
              </label>
            </login-form>
          </main>
          <p>
            Or did you want to
            <a href="/app/register">Sign up as a new user</a>?
          </p>
        </mu-auth>
      </body>
    `;
  }

  static styles = [
    css`
      login-form::slotted(button) {
        background-color: var(--color-button);
        border: none;
        color: var(--color-text);
        cursor: pointer;
        font-size: var(--size-type-small);
        font-weight: bold;
        margin: var(--size-spacing-med);
        padding: var(--size-spacing-large);
      }

      a {
        text-decoration: none;
        color: #007BFF;
        font-weight: bold;
        font-size: var(--size-type-footer);
        padding: 5px 10px;
        border-radius: 4px;
        transition: background-color 0.3s, color 0.3s;
      }

      a:hover {
        background-color: #007BFF;
        color: white;
      }

      a:focus {
        outline: none;
        box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.5);
      }

      button:hover {
        background-color: var(--color-button-hover);
      }

      .page {
        height: 100vh;
        grid-template-rows: 1fr fit-content(1fr) 1fr;
      }

      main.card {
        align-self: center;
        grid-column: 3 / span 4;
      }

      h2 {
        text-align: center;
      }

      p {
        grid-column: 2 / -2;
        text-align: center;
      }
    `
  ];
}
