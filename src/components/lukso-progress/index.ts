import { html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { styleMap } from 'lit-html/directives/style-map.js'

import { TailwindElement } from '@/shared/tailwind-element'
import { cn } from '@/shared/tools'

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

  @property({ type: Number })
  height: number | undefined = 16

  private progressWidth() {
    return (this.current / this.max) * 100
  }

  render() {
    return html`
      <div
        data-testid="progress"
        style=${styleMap({
          height: this.height > 16 ? `${this.height}px` : '16px',
        })}
        class=${cn('w-full rounded-24 bg-neutral-95 relative')}
      >
        <div
          style=${styleMap({
            width: `${this.progressWidth()}%`,
          })}
          class=${cn(
            'rounded-s-24 h-full rounded-e-24  transition-all w-[1%]',
            {
              'bg-green-85': !!this.variant || this.variant === 'success',
              'bg-red-85': this.variant === 'error',
              'bg-yellow-85': this.variant === 'warning',
            }
          )}
        ></div>
        <div
          class=${cn(
            'shadow-neutral-inner-shadow h-full absolute w-full top-0 rounded-24'
          )}
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
