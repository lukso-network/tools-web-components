import { html, nothing } from 'lit'
import { property } from 'lit/decorators.js'
import { tv } from 'tailwind-variants'

import { safeCustomElement } from '@/shared/safe-custom-element'
import { TailwindStyledElement } from '@/shared/tailwind-element'
import '@/components/lukso-icon'
import '@/components/lukso-sanitize'
import style from './style.css?inline'

export type AlertVariant = 'info' | 'warning' | 'error' | 'success'
export type AlertSize = 'medium' | 'large'

/**
 * A non-interactive alert banner for displaying informational, warning, error, or success messages.
 */
@safeCustomElement('lukso-alert')
export class LuksoAlert extends TailwindStyledElement(style) {
  @property({ type: String })
  variant: AlertVariant | undefined = 'info'

  @property({ type: String })
  size: AlertSize = 'medium'

  @property({ type: Boolean, attribute: 'has-icon', reflect: true })
  hasIcon = false

  @property({ type: String })
  override title: string = ''

  @property({ type: String })
  description: string = ''

  @property({ type: Boolean, attribute: 'is-full-width', reflect: true })
  isFullWidth = false

  private styles = tv({
    slots: {
      container: 'flex items-center',
      title: '',
      description: '',
    },
    variants: {
      variant: {
        info: { container: 'bg-blue-95 text-blue-40' },
        warning: { container: 'bg-honey-92 text-yellow-25' },
        error: { container: 'bg-red-95 text-red-55' },
        success: { container: 'bg-green-95 text-green-45' },
      },
      size: {
        medium: {
          container: 'p-4 gap-3 rounded-8',
          title: 'paragraph-inter-14-semi-bold',
          description: 'paragraph-inter-12-regular',
        },
        large: {
          container: 'p-5 gap-4 rounded-10',
          title: 'paragraph-inter-16-semi-bold',
          description: 'paragraph-inter-14-regular',
        },
      },
      isFullWidth: {
        true: { container: 'w-full' },
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
    const { container, title, description } = this.styles({
      variant: this.variant,
      size: this.size,
      isFullWidth: this.isFullWidth,
    })

    return html`
      <div class=${container()}>
        ${this.hasIcon
          ? html`<lukso-icon
              pack="vuesax"
              name="${this.icon.name}"
              color="${this.icon.color}"
            ></lukso-icon>`
          : nothing}
        <div class="flex flex-col gap-1">
          ${this.title
            ? html`<div class=${title()}>${this.title}</div>`
            : nothing}
          ${this.description
            ? html`<lukso-sanitize
                class=${description()}
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
