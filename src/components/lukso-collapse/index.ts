import { html } from 'lit'
import { customElement, property, state, query } from 'lit/decorators.js'
import { tv } from 'tailwind-variants'

import { TailwindElement } from '@/shared/tailwind-element'
import { cn } from '@/shared/tools'

@customElement('lukso-collapse')
export class LuksoCollapse extends TailwindElement {
  @property({ type: String }) label = 'Advanced'
  @property({ type: Boolean, reflect: true }) open = false
  @property({ type: String, attribute: 'custom-class' }) customClass = ''

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

  render() {
    const collapseClass = this.collapseStyles({ open: this.open })

    return html`
      <div
        class=${cn(
          'border border-neutral-30 rounded-12 overflow-hidden',
          this.customClass
        )}
      >
        <!-- Header -->
        <div
          class="flex items-center justify-between cursor-pointer px-4 py-3"
          @click=${this.toggle}
        >
          <span class="text-neutral-60 paragraph-inter-14-semi-bold">
            ${this.label}
          </span>

          <span
            class="flex items-center gap-1 text-neutral-60 paragraph-inter-14-medium"
          >
            ${this.open ? 'Hide' : 'View'}
            <lukso-icon
              name="chevron-${this.open ? 'up' : 'down'}"
              size="small"
              color="neutral-60"
            ></lukso-icon>
          </span>
        </div>

        <!-- Content -->
        <div
          class=${cn(
            collapseClass,
            'collapse-container',
            !this.open ? 'hidden' : ''
          )}
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
