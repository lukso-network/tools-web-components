import { html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { animate, AnimateController } from '@lit-labs/motion'
import { classMap } from 'lit/directives/class-map.js'

import { TailwindElement } from '../../shared/tailwind.element'
import style from './test.component.scss?inline'

@customElement('lds-test')
export class TestComponent extends TailwindElement(style) {
  @property()
  name = 'World'

  @property()
  private clicked = false

  @property({ type: Boolean })
  disabled = false

  duration = 1000
  controller = new AnimateController(this, {
    defaultOptions: {
      keyframeOptions: {
        duration: this.duration,
        fill: 'backwards',
      },
    },
  })

  _onClick() {
    if (this.disabled) {
      return
    }
    this.clicked = true
    setTimeout(() => {
      this.clicked = false
    }, 2000)
  }

  render() {
    const classes = {
      'text-yellow-200': !this.disabled,
      'p-2': true,
      'rounded-full': true,
      'text-2xl': true,
      'bg-blue-800': this.clicked && !this.disabled,
      'bg-blue-200': !this.clicked && !this.disabled,
    }
    return html`
      <p>
        Hello,
        <b>${this.name}</b>
        !
      </p>
      <button
        ?disabled=${this.disabled}
        data-testid="button"
        @click=${this._onClick}
        class="hover:text-yellow-700 ${classMap(classes)}"
        ${animate()}
      >
        Hello world! 2
      </button>
    `
  }
}
