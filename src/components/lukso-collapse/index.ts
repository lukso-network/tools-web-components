import { html } from 'lit'
import { customElement, property, state, query } from 'lit/decorators.js'
import { tv } from 'tailwind-variants'

import { TailwindElement } from '@/shared/tailwind-element'
import { cn } from '@/shared/tools'
import { InputSize } from '@/shared/types'
import '@/components/lukso-icon'

@customElement('lukso-collapse')
export class LuksoCollapse extends TailwindElement {
  @property({ type: String }) label = ''
  @property({ type: Object }) secondaryLabel: { open: string; close: string } =
    {
      open: '',
      close: '',
    }
  @property({ type: Boolean, reflect: true }) open = false
  @property({ type: String, attribute: 'custom-class' }) customClass = ''
  @property({ type: Boolean, attribute: 'is-disabled' })
  isDisabled = false
  @property({ type: Boolean, attribute: 'is-open' })
  isOpen = false
  @property({ type: String, attribute: 'icon' })
  icon = ''

  @property({ type: String })
  size: InputSize = 'large'
  @state() private maxHeight = '0px'

  @query('.collapse-container') private collapseContainer!: HTMLElement

  private collapseStyles = tv({
    base: 'transition-all duration-300 ease-in-out overflow-hidden',
    variants: {
      open: {
        true: 'opacity-100',
        false: 'opacity-0',
      },
    },
  })

  firstUpdated() {
    if (this.open) {
      this.updateHeight()
    }
  }

  updated(changed: Map<string, unknown>) {
    if (changed.has('open')) {
      this.updateHeight()
    }
  }

  private updateHeight() {
    const content = this.renderRoot.querySelector(
      '.collapse-content'
    ) as HTMLElement

    if (!content) return

    if (this.open) {
      this.maxHeight = `${content.scrollHeight}px`

      const onTransitionEnd = (e: TransitionEvent) => {
        if (e.propertyName === 'max-height' && this.open) {
          this.maxHeight = 'none'
        }
      }

      this.collapseContainer.addEventListener(
        'transitionend',
        onTransitionEnd,
        { once: true }
      )
    } else {
      this.maxHeight = `${content.scrollHeight}px`
      requestAnimationFrame(() => {
        this.maxHeight = '0px'
      })
    }
  }

  private toggle() {
    this.open = !this.open
    this.dispatchEvent(
      new CustomEvent('toggle', { detail: { open: this.open } })
    )
  }

  private iconStyles = tv({
    base: 'absolute right-0 transition cursor-pointer',
    variants: {
      isDisabled: {
        true: 'opacity-60 cursor-not-allowed',
      },
      open: {
        true: 'rotate-180',
      },
      size: {
        small: 'mr-2',
        medium: 'mr-3',
        large: 'mr-3',
        'x-large': '',
      },
    },
  })

  render() {
    const collapseClass = this.collapseStyles({ open: this.open })
    const iconStyles = this.iconStyles({
      isDisabled: this.isDisabled,
      open: this.open,
      size: this.size,
    })

    return html`
      <div class=${cn(this.customClass)}>
        <!-- Header -->
        <div
          class="flex items-center justify-between cursor-pointer px-4 py-3"
          @click=${this.toggle}
        >
          <span class="text-neutral-45 paragraph-inter-14-semi-bold">
            ${this.label}
          </span>
          <div class="flex items-center space-x-2 mr-2">
            ${this.secondaryLabel
              ? html`<span class="text-neutral-45 paragraph-inter-14-semi-bold">
                  ${this.open
                    ? this.secondaryLabel.close
                    : this.secondaryLabel.open}
                </span>`
              : null}
            ${this.icon
              ? html`
                  <div class="flex items-center">
                    <lukso-icon
                      name="${this.icon}"
                      class=${cn(iconStyles)}
                    ></lukso-icon>
                  </div>
                `
              : null}
          </div>
        </div>

        <!-- Content -->
        <div
          class=${cn(collapseClass, 'collapse-container')}
          style="max-height:${this.maxHeight};"
        >
          <div class="collapse-content">
            <slot></slot>
          </div>
        </div>
      </div>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'lukso-collapse': LuksoCollapse
  }
}
