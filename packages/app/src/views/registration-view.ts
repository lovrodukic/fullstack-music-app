import { html, css, LitElement } from "lit";
import { define, Auth } from "@calpoly/mustang";
import { SignupFormElement } from "../components/signup-form";

define({
  "mu-auth": Auth.Provider,
  "signup-form": SignupFormElement
});

export class RegistrationViewElement extends LitElement {

  render() {
    return html`
    </head>
    <body class="page">
      <mu-auth>
        <h2>New User Registration</h2>
        <main class="card">
          <signup-form>
            <label>
              <span>Username:</span>
              <input name="username" autocomplete="off" />
            </label>
            <label>
              <span>Password:</span>
              <input type="password" name="password" />
            </label>
          </signup-form>
        </main>
        <p>
          Already have an account and want to
          <a href="/app">Log In</a>
          instead?
        </p>
      </mu-auth>
      </body>
    `;
  }

  static styles = [
    css`
      .page {
        height: 100vh;
        grid-template-rows: 1fr fit-content(1fr) 1fr;
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

      main.card {
        align-self: center;
        grid-column: 3 / span 4;
      }

      h2 {
        grid-column: start / end;
        align-self: end;
        text-align: center;
      }
      
      p {
        grid-column: 2 / -2;
        text-align: center;
      }
    `
  ];
}
