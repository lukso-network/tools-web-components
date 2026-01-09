import { html, nothing } from 'lit'
import { property, query, state } from 'lit/decorators.js'
import { tv } from 'tailwind-variants'

import style from './style.css?inline'
import { safeCustomElement } from '@/shared/safe-custom-element'
import { TailwindStyledElement } from '@/shared/tailwind-element'
import { cn } from '@/shared/tools'
import '@/components/lukso-icon'
import '@/components/lukso-form-label'
import '@/components/lukso-form-description'
import '@/components/lukso-form-error'

import type { InputSize } from '@/shared/types'

@safeCustomElement('lukso-collapse')
export class LuksoCollapse extends TailwindStyledElement(style) {
  @property({ type: String })
  label: string | undefined = ''

  @property({ type: String })
  description: string | undefined = ''

  @property({ type: String })
  error: string | undefined = ''

  @property({ type: String, attribute: 'trigger-label' })
  triggerLabel: string | undefined = ''

  @property({ type: Object, attribute: 'toggle-label' })
  toggleLabel: { open: string; close: string } = {
    open: '',
    close: '',
  }

  @property({ type: Boolean, attribute: 'is-open' })
  isOpen = false

  @property({ type: String, attribute: 'custom-class' })
  customClass: string | undefined = ''

  @property({ type: Boolean, attribute: 'is-disabled' })
  isDisabled = false

  @property({ type: String, attribute: 'icon' })
  icon: string | undefined = ''

  @property({ type: String })
  size: InputSize = 'large'

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
      requestAnimationFrame(() => {
        this.maxHeight = '0px'
      })
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
      base: 'transition transition-all duration-150 border bg-neutral-100',
      header:
        'flex items-center justify-between cursor-pointer overflow-hidden',
      triggerLabel: '',
      toggleLabel: '',
      icon: 'transition cursor-pointer',
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
      size: {
        small: {
          base: 'rounded-8',
          header: 'h-7 pl-2',
          triggerLabel: 'paragraph-inter-12-semi-bold',
          toggleLabel: 'paragraph-inter-12-semi-bold',
          icon: 'mr-1',
        },
        medium: {
          base: 'rounded-10',
          header: 'h-10 pl-3',
          triggerLabel: 'paragraph-inter-14-semi-bold',
          toggleLabel: 'paragraph-inter-14-semi-bold',
          icon: 'mr-2',
        },
        large: {
          base: 'rounded-12',
          header: 'h-12 pl-4',
          triggerLabel: 'paragraph-inter-14-semi-bold',
          toggleLabel: 'paragraph-inter-14-semi-bold',
          icon: 'mr-3',
        },
        'x-large': {
          base: 'rounded-14',
          header: 'h-17 pl-5',
          triggerLabel: 'paragraph-inter-16-semi-bold',
          toggleLabel: 'paragraph-inter-16-semi-bold',
          icon: 'mr-4',
        },
      },
      hasError: {
        true: {
          base: 'border-red-85 hover:border-red-65',
          triggerLabel: 'text-red-65',
          toggleLabel: 'text-red-65',
        },
        false: {
          base: 'border-neutral-90',
          triggerLabel: 'text-neutral-45',
          toggleLabel: 'text-neutral-45',
        },
      },
    },
    compoundVariants: [
      {
        isDisabled: false,
        hasError: false,
        class: {
          base: 'hover:border-neutral-35',
        },
      },
    ],
  })

  render() {
    const { base, header, triggerLabel, toggleLabel, icon, content } =
      this.collapseStyles({
        isOpen: this.isOpen,
        isDisabled: this.isDisabled,
        size: this.size,
        hasError: !!this.error,
      })

    return html`
      <div class="w-[inherit]">
        <lukso-form-label label=${this.label}></lukso-form-label>
        <lukso-form-description
          description=${this.description}
        ></lukso-form-description>
        <div class=${cn(base(), this.customClass)}>
          <!-- Header -->
          <div
            class=${header()}
            @click=${() => !this.isDisabled && this.toggle()}
          >
            <span class=${triggerLabel()}>${this.triggerLabel}</span>
            <div class="flex items-center">
              ${this.toggleLabel
                ? html`<span class=${toggleLabel()}>
                    ${this.isOpen
                      ? this.toggleLabel?.close
                      : this.toggleLabel?.open}
                  </span>`
                : nothing}
              ${this.icon
                ? html`<lukso-icon
                    name=${this.icon}
                    class=${icon()}
                  ></lukso-icon>`
                : nothing}
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
        <lukso-form-error error=${this.error}></lukso-form-error>
      </div>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'lukso-collapse': LuksoCollapse
  }
}
