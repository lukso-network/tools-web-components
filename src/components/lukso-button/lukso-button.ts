import { html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import { TailwindElement } from '../../shared/tailwind.element'
import { customClassMap } from '../../shared/directives/custom-class-map'

@customElement('lukso-button')
export class LuksoButton extends TailwindElement {
  @property({ type: String })
  variant = 'primary'

  @property({ type: Boolean })
  disabled = false

  private defaultStyles = `flex justify-center items-center relative gap-2 py-3 px-6 rounded-xl
    border border-solid cursor-pointer paragraph-16-semi-bold`

  private secondaryStyles = `bg-neutral-100 border-neutral-90 text-neutral-20 disabled:bg-neutral-90
    disabled:border-neutral-90 disabled:text-neutral-100 hover:shadow-button-hover-secondary`

  private primaryStyles = `bg-neutral-20 border-neutral-20 text-neutral-100 disabled:bg-neutral-90
    disabled:border-neutral-90 hover:shadow-button-hover-primary`

  render() {
    return html`
      <button
        data-testid="button"
        ?disabled=${this.disabled}
        class=${customClassMap({
          [this.defaultStyles]: true,
          [this.primaryStyles]: this.variant === 'primary',
          [this.secondaryStyles]: this.variant === 'secondary',
        })}
      >
        <slot></slot>
      </button>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'lukso-button': LuksoButton
  }
}
