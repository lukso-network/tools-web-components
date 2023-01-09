import { html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { TailwindElement } from "../../shared/tailwind.element";
import { animate, AnimateController, flyBelow, fade } from "@lit-labs/motion";
import { classMap } from "lit/directives/class-map.js";

import style from "./test.component.scss?inline";

@customElement("lds-test")
export class TestComponent extends TailwindElement(style) {
  @property()
  name: string = "World";

  @property()
  private clicked = false;

  duration = 1000;
  controller = new AnimateController(this, {
    defaultOptions: {
      keyframeOptions: {
        duration: this.duration,
        fill: "backwards",
      },
    },
  });

  _onClick() {
    this.clicked = true;
    setTimeout(() => {
      this.clicked = false;
    }, 2000);
  }

  render() {
    const classes = {
      "text-yellow-200": true,
      "p-2": true,
      "rounded-full": true,
      "text-2xl": true,
      "bg-blue-800": this.clicked,
      "bg-blue-200": !this.clicked,
    };
    return html`
      <p>
        Hello,
        <b>${this.name}</b>
        !
      </p>
      <button
        data-testid="button"
        @click=${this._onClick}
        class="hover:text-yellow-700 ${classMap(classes)}"
        ${animate()}
      >
        Hello world! 2
      </button>
    `;
  }
}
