import { html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { styleMap } from 'lit-html/directives/style-map.js'

import { TailwindElement } from '@/shared/tailwind-element'
import { customClassMap } from '@/shared/directives'

export type ProgressVariant = 'success' | 'error'

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
    const width = (this.current / this.max) * 100

    // minimum width is 1% to avoid the progress bar being too small
    if (width <= 1) {
      return 1
    }

    return width
  }

  render() {
    return html`
      <div
        data-testid="progress"
        class='w-full h-[12px] shadow-neutral-inner-shadow rounded-24 bg-neutral-95'
      >
        <div
          class=${customClassMap({
            'h-[12px] rounded-s-24 rounded-e-16 border border-solid': true,
            'bg-green-85 border-green-54':
              !!this.variant || this.variant === 'success',
            'bg-red-85 border-red-65': this.variant === 'error',
          })}
          style=${styleMap({
            width: `${this.progressWidth()}%`,
          })}
        >
          </div>
        </div>
      </div>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'lukso-progress': LuksoProgress
  }
}
