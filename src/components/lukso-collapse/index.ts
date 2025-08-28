import { html } from 'lit'
import { customElement, property, state, query } from 'lit/decorators.js'
import { tv } from 'tailwind-variants'

import { TailwindElement } from '@/shared/tailwind-element'
import { cn } from '@/shared/tools'
import '@/components/lukso-icon'

@customElement('lukso-collapse')
export class LuksoCollapse extends TailwindElement {
  @property({ type: String })
  label = ''

  @property({ type: Object, attribute: 'secondary-label' })
  secondaryLabel: { open: string; close: string } = {
    open: '',
    close: '',
  }

  @property({ type: Boolean, attribute: 'is-open' })
  isOpen = false

  @property({ type: String, attribute: 'custom-class' })
  customClass = ''

  @property({ type: Boolean, attribute: 'is-disabled' })
  isDisabled = false

  @property({ type: String, attribute: 'icon' })
  icon = ''

  @state() private maxHeight = '0px'

  @query('.collapse-container') private collapseContainer!: HTMLElement

  firstUpdated() {
    if (this.isOpen) {
      this.updateHeight()
    }
  }

  updated(changed: Map<string, unknown>) {
    if (changed.has('isOpen')) {
      this.updateHeight()
    }
  }

  private updateHeight() {
    const content = this.renderRoot.querySelector(
      '.collapse-content'
    ) as HTMLElement

    if (!content) return

    if (this.isOpen) {
      this.maxHeight = `${content.scrollHeight}px`

      const onTransitionEnd = (e: TransitionEvent) => {
        if (e.propertyName === 'max-height' && this.isOpen) {
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
    this.isOpen = !this.isOpen
    this.dispatchEvent(
      new CustomEvent('toggle', { detail: { open: this.isOpen } })
    )
  }

  private collapseStyles = tv({
    slots: {
      base: '',
      header: 'flex items-center justify-between cursor-pointer px-4 py-3',
      label: 'text-neutral-45 paragraph-inter-14-semi-bold',
      secondary: 'text-neutral-45 paragraph-inter-14-semi-bold',
      icon: 'transition cursor-pointer',
      content: 'overflow-hidden transition-all duration-300 ease-in-out',
    },
    variants: {
      isOpen: {
        true: {
          icon: 'rotate-180',
          content: 'opacity-100',
        },
        false: {
          content: 'opacity-0',
        },
      },
      isDisabled: {
        true: {
          base: 'opacity-60',
          header: 'cursor-not-allowed',
          icon: 'opacity-60 cursor-not-allowed',
        },
      },
    },
  })

  render() {
    const { base, header, label, secondary, icon, content } =
      this.collapseStyles({
        isOpen: this.isOpen,
        isDisabled: this.isDisabled,
      })

    return html`
      <div class=${cn(base(), this.customClass)}>
        <!-- Header -->
        <div
          class=${header()}
          @click=${() => !this.isDisabled && this.toggle()}
        >
          <span class=${label()}>${this.label}</span>
          <div class="flex items-center space-x-2 mr-2">
            ${this.secondaryLabel
              ? html`<span class=${secondary()}>
                  ${this.isOpen
                    ? this.secondaryLabel.close
                    : this.secondaryLabel.open}
                </span>`
              : null}
            ${this.icon
              ? html`<lukso-icon
                  name=${this.icon}
                  class=${icon()}
                ></lukso-icon>`
              : null}
          </div>
        </div>

        <!-- Content -->
        <div class=${content()} style="max-height:${this.maxHeight};">
          <div class="collapse-content"><slot></slot></div>
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
