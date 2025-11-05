import { html, nothing } from 'lit'
import { property, state } from 'lit/decorators.js'
import { tv } from 'tailwind-variants'

import { safeCustomElement } from '@/shared/safe-custom-element'
import '@/components/lukso-icon'
import '@/components/lukso-sanitize'
import '@/components/lukso-form-label'
import { TailwindStyledElement } from '@/shared/tailwind-element'
import { cn } from '@/shared/tools'
import style from './style.scss?inline'

import type { InputSize } from '@/shared/types'

const FOCUS_DELAY_MS = 10

@safeCustomElement('lukso-input')
export class LuksoInput extends TailwindStyledElement(style) {
  @property({ type: String })
  value = ''

  @property({ type: String })
  name = ''

  @property({ type: String })
  type = 'text'

  @property({ type: String })
  placeholder = ''

  @property({ type: String })
  label = ''

  @property({ type: String })
  autocomplete = 'on'

  @property({ type: String })
  id = ''

  @property({ type: String })
  ref: string | undefined = undefined

  @property({ type: String })
  accept: string | undefined = undefined

  @property({ type: String })
  description = ''

  @property({ type: String })
  error = ''

  @property({ type: String })
  unit = ''

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

  @property({ type: Number })
  max: number | undefined = undefined

  @property({ type: Number })
  min: number | undefined = undefined

  @property({ type: Boolean })
  borderless = false

  @property({ type: String })
  size: InputSize = 'large'

  @property({ type: String, attribute: 'right-icon' })
  rightIcon = ''

  @property({ type: Boolean, attribute: 'is-right-icon-clickable' })
  isRightIconClickable = false

  @property({ type: Boolean, attribute: 'keep-focus-on-escape' })
  keepFocusOnEscape = false

  @state()
  private hasFocus = false

  @state()
  private hasHighlight = false

  private inputStyles = tv({
    slots: {
      wrapper: 'group flex',
      input: `bg-neutral-100 border-solid placeholder:text-neutral-70 w-full
        outline-none transition transition-all duration-150 appearance-none`,
      unit: `bg-neutral-100 text-neutral-60 flex items-center relative border-solid transition
        transition-all duration-150 before:bg-neutral-90 before:absolute
        before:left-0 before:w-[1px] whitespace-nowrap cursor-pointer`,
      rightIcon: 'absolute top-1/2 transform -translate-y-1/2',
    },
    variants: {
      hasError: {
        true: {
          input: 'border-red-85',
          unit: 'border-red-85',
        },
        false: {
          input: 'border-neutral-90',
          unit: 'border-neutral-90',
        },
      },
      hasHighlight: {
        true: {
          input: 'border-neutral-35',
          unit: 'border-neutral-35',
        },
      },
      hasUnit: {
        true: { input: '!border-r-0 !rounded-r-0' },
      },
      hasRightIcon: {
        true: {},
      },
      borderless: {
        true: { input: 'border-0', unit: 'border-0' },
        false: { input: 'border', unit: 'border border-l-0' },
      },
      isReadonly: {
        true: { input: 'cursor-not-allowed', rightIcon: 'cursor-not-allowed' },
      },
      isDisabled: {
        true: {
          input: 'text-neutral-60 cursor-not-allowed',
          rightIcon: 'cursor-not-allowed opacity-50',
        },
        false: { input: 'text-neutral-20' },
      },
      isFullWidth: {
        true: { wrapper: 'w-full' },
        false: { wrapper: 'w-[350px]' },
      },
      size: {
        small: {
          input: 'h-7 px-3 py-1 paragraph-inter-12-regular rounded-8',
          unit: 'h-7 paragraph-inter-12-regular px-2 rounded-r-8 before:top-[calc(50%-6px)] before:h-[12px]',
          rightIcon: 'right-3',
        },
        medium: {
          input: 'h-10 px-3.5 py-2 paragraph-inter-14-regular rounded-[10px]',
          unit: 'h-10 paragraph-inter-12-regular px-3 rounded-r-[10px] before:top-[calc(50%-12px)] before:h-6',
          rightIcon: 'right-4',
        },
        large: {
          input: 'h-12 px-4 py-2 paragraph-inter-14-regular rounded-12',
          unit: 'h-12 paragraph-inter-12-regular pl-3 pr-4 rounded-r-12 before:top-[calc(50%-12px)] before:h-6',
          rightIcon: 'right-4',
        },
        'x-large': {
          input: 'h-17 px-5 py-5 paragraph-inter-16-regular rounded-[14px]',
          unit: 'h-17 paragraph-inter-16-regular pl-3 pr-4 rounded-r-[14px] before:top-[calc(50%-12px)] before:h-6',
          rightIcon: 'right-4',
        },
      },
      isRightIconClickable: {
        true: { rightIcon: 'cursor-pointer' },
      },
    },
    compoundVariants: [
      {
        isFullWidth: false,
        hasUnit: true,
        class: { wrapper: 'w-[300px]' },
      },
      {
        isFullWidth: false,
        hasUnit: false,
        size: 'small',
        class: { wrapper: 'w-[190px]' },
      },
      {
        isFullWidth: false,
        hasUnit: true,
        size: 'small',
        class: { wrapper: 'w-[210px]' },
      },
      {
        hasHighlight: true,
        hasError: true,
        class: {
          input: 'border-red-65',
          unit: 'border-red-65',
        },
      },
      {
        hasRightIcon: true,
        size: ['medium', 'large', 'x-large'],
        class: { input: 'pr-10' },
      },
      {
        hasRightIcon: true,
        size: 'small',
        class: { input: 'pr-7' },
      },
    ],
  })

  connectedCallback() {
    super.connectedCallback()

    if (this.autofocus) {
      setTimeout(() => {
        const input = this.shadowRoot?.querySelector('input')
        input?.focus()
      }, FOCUS_DELAY_MS)
    }
  }

  // @input works better in vue
  inputTemplate(styles: string) {
    return html`
      <input
        name=${this.name ? this.name : nothing}
        type=${this.type}
        .value=${this.value}
        placeholder=${this.placeholder ? this.placeholder : nothing}
        ?autofocus=${this.autofocus}
        min=${this.min ? this.min : nothing}
        max=${this.max ? this.max : nothing}
        autocomplete=${this.autocomplete}
        ref=${this.ref ? this.ref : nothing}
        id=${this.id ? this.id : nothing}
        data-testid=${this.name ? `input-${this.name}` : 'input'}
        accept=${this.accept ? this.accept : nothing}
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
      />
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

  unitTemplate(styles: string) {
    return html`<div
      class=${styles}
      @mouseenter=${this.handleMouseOver}
      @mouseleave=${this.handleMouseOut}
      @click=${this.handleUnitClick}
    >
      ${this.unit}
    </div>`
  }

  rightIconTemplate(styles: string) {
    const iconSize = this.size === 'small' ? 'small' : 'medium'
    return html`<lukso-icon
      name=${this.rightIcon}
      size=${iconSize}
      class=${styles}
      @click=${this.handleRightIconClick}
    ></lukso-icon>`
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

  private handleUnitClick() {
    const input = this.shadowRoot?.querySelector('input')
    const clickEvent = new CustomEvent('on-unit-click', {
      detail: {
        input,
      },
      bubbles: true,
      composed: true,
    })
    this.dispatchEvent(clickEvent)
    input.focus()
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

  private handleRightIconClick() {
    const input = this.shadowRoot?.querySelector('input')
    const clickEvent = new CustomEvent('on-right-icon-click', {
      detail: {
        input,
      },
      bubbles: true,
      composed: true,
    })
    this.dispatchEvent(clickEvent)
  }

  render() {
    const { wrapper, input, unit, rightIcon } = this.inputStyles({
      hasError: this.error !== '',
      hasHighlight: this.hasHighlight,
      borderless: this.borderless,
      isReadonly: this.isReadonly,
      isDisabled: this.isDisabled,
      isFullWidth: this.isFullWidth,
      hasUnit: this.unit !== '',
      size: this.size,
      hasRightIcon: this.rightIcon !== '',
      isRightIconClickable: this.isRightIconClickable,
    })

    return html`
      <div class="w-[inherit]">
        ${this.label
          ? html`<lukso-form-label for-name=${this.name}
              >${this.label}</lukso-form-label
            >`
          : nothing}
        ${this.description ? this.descriptionTemplate() : nothing}
        <div class=${wrapper()}>
          <div class="relative w-[inherit]">
            ${this.inputTemplate(input())}
            ${this.rightIcon ? this.rightIconTemplate(rightIcon()) : nothing}
          </div>
          ${this.unit ? this.unitTemplate(unit()) : nothing}
        </div>
        ${this.error ? this.errorTemplate() : nothing}
      </div>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'lukso-input': LuksoInput
  }
}
