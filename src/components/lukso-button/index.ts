import { html } from 'lit'
import { classMap } from 'lit/directives/class-map.js'
import { customElement, property } from 'lit/decorators.js'

import { TailwindElement } from '../../shared/tailwind.element'

@customElement('lukso-button')
export class LuksoButton extends TailwindElement {
  @property({ type: String })
  variant = 'primary'

  @property({ type: Boolean })
  disabled = false

  private defaultStyles =
    'flex justify-center items-center w-[334px] relative gap-2 px-[81px] py-3 px-6 rounded-xl border border-solid cursor-pointer'

  private secondaryStyles = 'bg-neutral-100 border-neutral-90 text-neutral-20'

  private primaryStyles =
    'bg-neutral-20 border-neutral-20 text-neutral-100 disabled:bg-neutral-90 disabled:border-neutral-90'

  render() {
    return html`
      <button
        data-testid="button"
        ?disabled=${this.disabled}
        class=${classMap({
          [this.defaultStyles]: true,
          [this.primaryStyles]: this.variant === 'primary',
          [this.secondaryStyles]: this.variant !== 'primary',
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
