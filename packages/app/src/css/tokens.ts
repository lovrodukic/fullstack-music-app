import { css } from "lit";

export default css`
  :root {
      /* Color */
      --color-accent: #858AE3;
      --color-button: #858AE3;
      --color-button-hover: #613DC1;
      --color-page-background: #333;
      --color-page-element: #444;
      --color-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);
      --color-text: #fff;

      /* Typography */
      --font-family-main: Tahoma, Verdana, Segoe, sans-serif;
      --size-type-xlarge: 2rem;
      --size-type-large: 1.75rem;
      --size-type-med: 1.25rem;
      --size-type-small: 1rem;
      --size-type-footer: 0.85rem;
      --size-type-input: 1.15rem;
      --size-type-form: 1.5rem;

      /* Spacing */
      --size-spacing-large: 10px;
      --size-spacing-med: 5px;
      --size-spacing-small: 2.5px;
  }

  body.light-mode {
      /* Color */
      --color-page-background: #fff;
      --color-page-element: #eee;
      --color-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);
      --color-text: #333;
  }
`;
