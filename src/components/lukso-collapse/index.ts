import { html } from 'lit'
import { customElement, property, query, state } from 'lit/decorators.js'
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
  @state() private observedHeight = 0

  @query('.collapse-content') private contentElement!: HTMLElement
  private resizeObserver?: ResizeObserver

  firstUpdated() {
    if ('ResizeObserver' in window) {
      this.resizeObserver = new ResizeObserver(() => this.syncHeight())
      this.resizeObserver.observe(this.contentElement)
    }
    this.syncHeight(true)
  }

  disconnectedCallback(): void {
    this.resizeObserver?.disconnect()
    super.disconnectedCallback()
  }

  updated(changed: Map<string, unknown>) {
    if (changed.has('isOpen')) {
      this.syncHeight()
    }
  }

  private syncHeight(immediate = false) {
    const content = this.contentElement
    if (!content) return

    const height = content.scrollHeight
    this.observedHeight = height

    if (this.isOpen) {
      if (immediate) {
        this.maxHeight = `${height}px`
      } else {
        if (this.maxHeight !== `${height}px`) this.maxHeight = `${height}px`
      }
    } else {
      this.maxHeight = `${height}px`
      requestAnimationFrame(() => (this.maxHeight = '0px'))
    }
  }

  private onTransitionEnd = (e: TransitionEvent) => {
    if (e.propertyName !== 'max-height') return
    this.dispatchEvent(
      new CustomEvent(this.isOpen ? 'after-enter' : 'after-leave')
    )
  }

  private toggle() {
    this.isOpen = !this.isOpen
    this.dispatchEvent(
      new CustomEvent('toggle', { detail: { open: this.isOpen } })
    )
  }

  private collapseStyles = tv({
    slots: {
      base: 'hover:border-neutral-35 transition transition-all duration-150',
      header: 'flex items-center justify-between cursor-pointer ml-3 py-2',
      label: 'text-neutral-45 paragraph-inter-14-semi-bold',
      secondary: 'text-neutral-45 paragraph-inter-14-semi-bold',
      icon: 'transition cursor-pointer mr-3',
      content: 'transition-all duration-250 ease-in-out',
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
          <div class="flex items-center">
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
        <div
          class=${content()}
          style="max-height:${this.maxHeight};"
          @transitionend=${this.onTransitionEnd}
        >
          <div class="collapse-content">
            <slot @slotchange=${() => this.syncHeight()}></slot>
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
