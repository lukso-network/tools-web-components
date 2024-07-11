import { html, nothing } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import { tv } from 'tailwind-variants'

import { TailwindStyledElement } from '@/shared/tailwind-element'
import { cn } from '@/shared/tools'
import '@/components/lukso-icon'
import style from './style.scss?inline'

import type { InputSize } from '@/shared/types'

@customElement('lukso-input')
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
  size: InputSize = 'medium'

  @property({ type: String, attribute: 'right-icon' })
  rightIcon = ''

  @state()
  private hasHocus = false

  @state()
  private hasHighlight = false

  private inputStyles = tv({
    slots: {
      wrapper: 'group flex',
      input: `bg-neutral-100 border-solid placeholder:text-neutral-70 w-full
        outline-none transition transition-all duration-150 appearance-none`,
      unit: `text-neutral-60 flex items-center relative border-solid transition
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
          input: 'h-[28px] px-2 py-1 paragraph-inter-12-regular rounded-8',
          unit: 'h-[28px] paragraph-inter-10-regular px-2 rounded-r-8 before:top-[calc(50%-6px)] before:h-[12px]',
          rightIcon: 'right-2',
        },
        medium: {
          input: 'h-[48px] px-4 py-3 paragraph-inter-14-regular rounded-12',
          unit: 'h-[48px] paragraph-inter-12-regular px-3.5 rounded-r-12 before:top-[calc(50%-12px)] before:h-[24px]',
          rightIcon: 'right-3',
        },
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
        size: 'medium',
        class: { input: 'pr-10' },
      },
      {
        hasRightIcon: true,
        size: 'small',
        class: { input: 'pr-7' },
      },
    ],
  })

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
        ${this.description ?? nothing}
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
    return html`<lukso-icon
      name=${this.rightIcon}
      size=${this.size}
      class=${styles}
    ></lukso-icon>`
  }

  private handleFocus() {
    if (!this.isReadonly && !this.isDisabled) {
      this.hasHocus = true
      this.hasHighlight = true
    }
  }

  private async handleBlur(event: FocusEvent) {
    this.hasHocus = false
    this.hasHighlight = false
    await this.updateComplete
    const target = event.target as HTMLInputElement
    const blurEvent = new CustomEvent('on-blur', {
      detail: {
        value: target.value,
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
        value: target.value,
        event,
      },
      bubbles: false,
      composed: true,
    })
    this.dispatchEvent(changeEvent)
  }

  private async handleInput(event: Event) {
    const target = event.target as HTMLInputElement
    this.value = target.value
    await this.updateComplete
    const changeEvent = new CustomEvent('on-input', {
      detail: {
        value: target.value,
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
        value: target.value,
        event,
      },
      bubbles: true,
      composed: true,
    })
    this.dispatchEvent(keyEvent)
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
        value: target.value,
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
    if (!this.hasHocus) {
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
    })

    return html`
      <div class="w-[inherit]">
        ${this.label ? this.labelTemplate() : nothing}
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
