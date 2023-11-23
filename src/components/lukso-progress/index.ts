import { html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { styleMap } from 'lit-html/directives/style-map.js'

import { TailwindElement } from '@/shared/tailwind-element'
import { customClassMap } from '@/shared/directives'

export type ProgressVariant = 'success' | 'error' | 'warning'

@customElement('lukso-progress')
export class LuksoProgress extends TailwindElement {
  @property({ type: Number })
  min = 0

  @property({ type: Number })
  max = 100

  @property({ type: Number })
  current = 0

  @property({ type: String })
  variant: ProgressVariant = 'success'

  private progressWidth() {
    return (this.current / this.max) * 100
  }

  render() {
    return html`
      <div
        data-testid="progress"
        class="w-full h-[12px] rounded-24 bg-neutral-95 relative"
      >
        <div
          class="h-[12px] rounded-s-24 rounded-e-24  transition-all w-[1%] ${customClassMap(
            {
              'bg-green-85': !!this.variant || this.variant === 'success',
              'bg-red-85': this.variant === 'error',
              'bg-yellow-85': this.variant === 'warning',
            }
          )}"
          style=${styleMap({
            width: `${this.progressWidth()}%`,
          })}
        ></div>
        <div
          class="shadow-neutral-inner-shadow absolute w-full top-0 h-[12px] rounded-24"
        ></div>
      </div>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'lukso-progress': LuksoProgress
  }
}
