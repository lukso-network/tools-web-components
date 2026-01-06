import { html, nothing } from 'lit'
import { property } from 'lit/decorators.js'
import { tv } from 'tailwind-variants'

import { safeCustomElement } from '@/shared/safe-custom-element'
import { TailwindStyledElement } from '@/shared/tailwind-element'
import '@/components/lukso-icon'
import '@/components/lukso-sanitize'
import style from './style.css?inline'

export type AlertVariant = 'info' | 'warning' | 'error' | 'success'

@safeCustomElement('lukso-alert')
export class LuksoAlert extends TailwindStyledElement(style) {
  @property({ type: String })
  variant: AlertVariant | undefined = 'info'

  @property({ type: Boolean, attribute: 'has-icon', reflect: true })
  hasIcon = false

  @property({ type: String })
  title: string | undefined = ''

  @property({ type: String })
  description: string | undefined = ''

  private styles = tv({
    base: 'rounded-8 p-4 flex gap-3 items-center',
    variants: {
      variant: {
        info: 'bg-blue-95 text-blue-40',
        warning: 'bg-honey-92 text-yellow-25',
        error: 'bg-red-95 text-red-55',
        success: 'bg-green-95 text-green-45',
      },
    },
  })

  private get icon(): { name: string; color: string } {
    switch (this.variant) {
      case 'warning':
        return { name: 'info-circle', color: 'yellow-25' }
      case 'error':
        return { name: 'danger', color: 'red-55' }
      case 'success':
        return { name: 'tick-circle', color: 'green-45' }
      default:
        return { name: 'info-circle', color: 'blue-40' }
    }
  }

  render() {
    const styles = this.styles({
      variant: this.variant,
    })

    return html`
      <div class=${styles}>
        ${this.hasIcon
          ? html`<lukso-icon
              pack="vuesax"
              name="${this.icon.name}"
              color="${this.icon.color}"
            ></lukso-icon>`
          : nothing}
        <div class="flex flex-col gap-1">
          ${this.title
            ? html`<div class="heading-inter-14-bold">${this.title}</div>`
            : nothing}
          ${this.description
            ? html`<lukso-sanitize
                class="paragraph-inter-12-regular"
                html-content="${this.description}"
              ></lukso-sanitize>`
            : nothing}
        </div>
      </div>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'lukso-alert': LuksoAlert
  }
}
