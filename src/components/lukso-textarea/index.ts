import { html, nothing } from 'lit'
import { property, state } from 'lit/decorators.js'
import { tv } from 'tailwind-variants'

import { safeCustomElement } from '@/shared/safe-custom-element'
import { TailwindStyledElement } from '@/shared/tailwind-element'
import { cn } from '@/shared/tools'
import '@/components/lukso-icon'
import '@/components/lukso-sanitize'
import style from './style.scss?inline'

import type { InputSize } from '@/shared/types'

const FOCUS_DELAY_MS = 10

@safeCustomElement('lukso-textarea')
export class LuksoTextarea extends TailwindStyledElement(style) {
  @property({ type: String })
  value = ''

  @property({ type: String })
  name = ''

  @property({ type: String })
  placeholder = ''

  @property({ type: String })
  label = ''

  @property({ type: String })
  id = ''

  @property({ type: String })
  ref: string | undefined = undefined

  @property({ type: String })
  description = ''

  @property({ type: String })
  error = ''

  @property({ type: String, attribute: 'custom-class' })
  customClass = ''

  @property({ type: Boolean, attribute: 'is-full-width' })
  isFullWidth = false

  @property({ type: Boolean, attribute: 'is-readonly' })
  isReadonly = false

  @property({ type: Boolean, attribute: 'is-disabled' })
  isDisabled = false

  @property({ type: Boolean })
  autofocus = false

  @property({ type: Boolean })
  borderless = false

  @property({ type: Boolean, attribute: 'is-non-resizable' })
  isNonResizable = false

  @property({ type: Boolean, attribute: 'keep-focus-on-escape' })
  keepFocusOnEscape = false

  @property({ type: String })
  size: InputSize = 'large'

  @property({ type: Number })
  rows = 4

  @state()
  private hasFocus = false

  @state()
  private hasHighlight = false

  private styles = tv({
    slots: {
      wrapper: 'group flex',
      input: `bg-neutral-100 border-solid placeholder:text-neutral-70 w-full
        outline-none transition transition-all duration-150 appearance-none`,
    },
    variants: {
      hasError: {
        true: {
          input: 'border-red-85',
        },
        false: {
          input: 'border-neutral-90',
        },
      },
      hasHighlight: {
        true: {
          input: 'border-neutral-35',
        },
      },
      borderless: {
        true: { input: 'border-0' },
        false: { input: 'border' },
      },
      isReadonly: {
        true: { input: 'cursor-not-allowed' },
      },
      isDisabled: {
        true: {
          input: 'text-neutral-60 cursor-not-allowed',
        },
        false: { input: 'text-neutral-20' },
      },
      isFullWidth: {
        true: { wrapper: 'w-full' },
        false: { wrapper: 'w-[350px]' },
      },
      size: {
        small: {
          input: 'min-h-7 px-2 py-1 paragraph-inter-12-regular rounded-8',
        },
        medium: {
          input: 'min-h-10 px-3 py-3 paragraph-inter-14-regular rounded-10',
        },
        large: {
          input: 'min-h-12 px-4 py-3 paragraph-inter-14-regular rounded-12',
        },
        'x-large': {},
      },
      isNonResizable: {
        true: {
          input: 'resize-none',
        },
      },
    },
    compoundVariants: [
      {
        isFullWidth: false,
        size: 'small',
        class: { wrapper: 'w-[210px]' },
      },
      {
        hasHighlight: true,
        hasError: true,
        class: {
          input: 'border-red-65',
        },
      },
    ],
  })

  connectedCallback() {
    super.connectedCallback()

    if (this.autofocus) {
      setTimeout(() => {
        const textarea = this.shadowRoot?.querySelector('textarea')
        textarea?.focus()
      }, FOCUS_DELAY_MS)
    }
  }

  inputTemplate(styles: string) {
    return html`
      <textarea
        name=${this.name ? this.name : nothing}
        placeholder=${this.placeholder ? this.placeholder : nothing}
        ref=${this.ref ? this.ref : nothing}
        id=${this.id ? this.id : nothing}
        rows=${this.rows}
        data-testid=${this.name ? `textarea-${this.name}` : 'textarea'}
        ?autofocus=${this.autofocus}
        ?readonly=${this.isReadonly ? true : undefined}
        ?disabled=${this.isDisabled ? true : undefined}
        class=${cn(styles, this.customClass)}
        @focus=${this.handleFocus}
        @input=${this.handleInput}
        @change=${this.handleChange}
        @blur=${this.handleBlur}
        @keyup=${this.handleKeyUp}
        @keydown=${this.handleKeyDown}
        @keypress=${this.handleKeyPress}
        @mouseenter=${this.handleMouseOver}
        @mouseleave=${this.handleMouseOut}
        @click=${this.handleInputClick}
      >
${this.value}</textarea
      >
    `
  }

  labelTemplate() {
    return html`
      <label
        for=${this.name}
        class="heading-inter-14-bold text-neutral-20 pb-2 block"
        >${this.label}</label
      >
    `
  }

  descriptionTemplate() {
    return html`
      <div class="paragraph-inter-12-regular text-neutral-20 pb-2">
        <lukso-sanitize html-content=${this.description}></lukso-sanitize>
      </div>
    `
  }

  errorTemplate() {
    return html`<div class="paragraph-inter-12-regular text-red-65 pt-2">
      ${this.error}
    </div>`
  }

  private handleFocus() {
    if (!this.isReadonly && !this.isDisabled) {
      this.hasFocus = true
      this.hasHighlight = true
    }
  }

  private async handleBlur(event: FocusEvent) {
    this.hasFocus = false
    this.hasHighlight = false
    await this.updateComplete
    const target = event.target as HTMLInputElement
    const blurEvent = new CustomEvent('on-blur', {
      detail: {
        value: target?.value,
        event,
      },
      bubbles: false,
      composed: true,
    })
    this.dispatchEvent(blurEvent)
  }

  private async handleChange(event: Event) {
    await this.updateComplete
    const target = event.target as HTMLInputElement
    const changeEvent = new CustomEvent('on-change', {
      detail: {
        value: target?.value,
        event,
      },
      bubbles: false,
      composed: true,
    })
    this.dispatchEvent(changeEvent)
  }

  private async handleInput(event: Event) {
    const target = event.target as HTMLInputElement
    this.value = target?.value
    await this.updateComplete
    const changeEvent = new CustomEvent('on-input', {
      detail: {
        value: target?.value,
        event,
      },
      bubbles: false,
      composed: true,
    })
    this.dispatchEvent(changeEvent)
  }

  private async handleKeyUp(event: KeyboardEvent) {
    await this.updateComplete
    const target = event.target as HTMLInputElement
    const keyEvent = new CustomEvent('on-key-up', {
      detail: {
        value: target?.value,
        event,
      },
      bubbles: true,
      composed: true,
    })
    this.dispatchEvent(keyEvent)

    // if escape key is pressed we clear the input unless keepValueOnEscape is true
    if (event.key === 'Escape' && !this.keepFocusOnEscape) {
      this.blur()
    }
  }

  private async handleKeyDown(event: KeyboardEvent) {
    await this.updateComplete
    const target = event.target as HTMLInputElement
    const keyEvent = new CustomEvent('on-key-down', {
      detail: {
        value: target.value,
        event,
      },
      bubbles: true,
      composed: true,
    })
    this.dispatchEvent(keyEvent)
  }

  private async handleKeyPress(event: KeyboardEvent) {
    await this.updateComplete
    const target = event.target as HTMLInputElement
    const keyEvent = new CustomEvent('on-key-press', {
      detail: {
        value: target?.value,
        event,
      },
      bubbles: true,
      composed: true,
    })
    this.dispatchEvent(keyEvent)
  }

  private handleMouseOver() {
    if (!this.isReadonly && !this.isDisabled) {
      this.hasHighlight = true
    }
  }

  private handleMouseOut() {
    if (!this.hasFocus) {
      this.hasHighlight = false
    }
  }

  private async handleInputClick(event: MouseEvent) {
    await this.updateComplete
    const target = event.target as HTMLInputElement
    const clickEvent = new CustomEvent('on-input-click', {
      detail: {
        value: target.value,
        event,
      },
      bubbles: false,
      composed: true,
    })
    this.dispatchEvent(clickEvent)
  }

  render() {
    const { wrapper, input } = this.styles({
      hasError: this.error !== '',
      hasHighlight: this.hasHighlight,
      borderless: this.borderless,
      isReadonly: this.isReadonly,
      isDisabled: this.isDisabled,
      isFullWidth: this.isFullWidth,
      size: this.size,
      isNonResizable: this.isNonResizable,
    })

    return html`
      <div class="w-[inherit]">
        ${this.label ? this.labelTemplate() : nothing}
        ${this.description ? this.descriptionTemplate() : nothing}
        <div class=${wrapper()}>
          <div class="relative w-[inherit] flex">
            ${this.inputTemplate(input())}
          </div>
        </div>
        ${this.error ? this.errorTemplate() : nothing}
      </div>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'lukso-textarea': LuksoTextarea
  }
}
