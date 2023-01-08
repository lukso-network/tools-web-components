import { LitElement, unsafeCSS } from "lit";

import style from "./tailwind.global.scss?inline";

const tailwindElement = unsafeCSS(style);

export const TailwindElement = (style) =>
  class extends LitElement {
    static styles = [tailwindElement, unsafeCSS(style)];
  };
