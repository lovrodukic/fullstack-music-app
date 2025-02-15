import { css } from "lit";

export default css`
  a {
    color: var(--color-text);
    padding: var(--size-spacing-small) var(--size-spacing-large) var(--size-spacing-med) var(--size-spacing-large);
    margin: 0 var(--size-spacing-med) 0 var(--size-spacing-med);
    text-decoration: none;
  }

  a:hover {
    background-color: var(--color-page-background);
    cursor: pointer;
  }

  a.selected {
    background-color: var(--color-page-background);
  }

  body {
    background-color: var(--color-page-background);
    color: var(--color-text);
    display: block;
    font-family: var(--font-family-main);
    font-style: normal;
  }

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

  footer {
    align-items: center;
    display: flex;
    font-size: var(--size-type-footer);
    justify-content: center;
  }

  form {
    display: grid;
    gap: var(--size-spacing-med);
    margin: var(--size-type-form);
  }

  form.login {
    align-items: center;
    display: flex;
    font-size: var(--size-type-med);
    justify-content: center;
  }

  form.search {
    align-items: center;
    display: flex;
    justify-content: center;
  }

  h1 {
    background-color: var(--color-page-element);
    box-shadow: var(--color-shadow);
    box-sizing: border-box;
    font-size: var(--size-type-xlarge);
    text-align: center;
  }

  h2 {
    border-bottom: 2px solid var(--color-page-background);
    display: flex;
    font-size: var(--size-type-large);
    margin: var(--size-spacing-large);
  }
  
  h2.profile {
    text-align: center;
    display: block;
  }

  h3 {
    font-size: var(--size-type-small);
    font-weight: normal;
    margin: var(--size-spacing-large);
  }

  h4 {
    font-size: var(--size-type-small);
    font-style: italic;
    font-weight: normal;
    margin: var(--size-spacing-large);
  }

  header {
    color: var(--color-text);
    font-family: var(--font-family-main);
    font-style: normal;
    font-variant: normal;
    font-weight: bold;
    margin: var(--size-spacing-med);
  }

  img.profile {
    border-radius: 50%;
    display: block;
    height: 200px;
    margin: 1rem auto 1rem auto;
    width: 200px;
  }

  input {
    font-size: var(--size-type-input);
  }

  li {
    align-items: center;
    border-bottom: 2px solid var(--color-page-element);
    border-top: 2px solid var(--color-page-element);
    display: grid;
    font-size: var(--size-type-small);
    font-weight: normal;
    grid-template-columns: repeat(20, 1fr);
    margin: var(--size-spacing-large);
  }

  li>button {
    grid-column: span 1;
  }

  li>h2 {
    grid-column: span 6;
    word-wrap: break-word;
  }

  li>h3 {
    grid-column: span 4;
    word-wrap: break-word;
  }

  li>h4 {
    grid-column: span 3;
    word-wrap: break-word;
  }

  main {
    background-color: var(--color-page-element);
    box-shadow: var(--color-shadow);
    margin: var(--size-spacing-med);
    padding: var(--size-spacing-large);
  }

  nav {
    background-color: var(--color-page-element);
    box-shadow: var(--color-shadow);
    box-sizing: border-box;
    color: var(--color-text);
    display: inline-block;
    font-family: var(--font-family-main);
    font-weight: bold;
    margin-bottom: var(--size-spacing-med);
    padding: var(--size-spacing-med);
    text-align: center;
    text-decoration: none;
  }

  nav.profile {
    display: block;
  }

  ol {
    list-style: none;
    padding: 0;
    padding: 0;
  }

  ul>li {
    align-items: center;
    border-bottom: 2px solid var(--color-page-element);
    border-top: 2px solid var(--color-page-element);
    display: grid;
    font-size: var(--size-type-small);
    font-weight: normal;
    grid-template-columns: repeat(1, 1fr);
    margin: var(--size-spacing-large);
  }

  ul>li:hover {
    align-items: center;
    border-bottom: 2px solid var(--color-page-element);
    border-top: 2px solid var(--color-page-element);
    display: grid;
    font-size: var(--size-type-small);
    font-weight: normal;
    grid-template-columns: repeat(1, 1fr);
    margin: var(--size-spacing-large);
  }

  section.playlist {
    border: 2px solid var(--color-page-background);
    display: block;
    margin: var(--size-spacing-large);
  }
`;
