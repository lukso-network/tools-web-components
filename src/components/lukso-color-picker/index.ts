import { html, nothing } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import { tv } from 'tailwind-variants'
import { styleMap } from 'lit/directives/style-map.js'

import { TailwindStyledElement } from '@/shared/tailwind-element'
import { cn } from '@/shared/tools'
import '@/components/lukso-icon'
import style from './style.scss?inline'

import type { InputSize } from '@/shared/types'

@customElement('lukso-color-picker')
export class LuksoColorPicker extends TailwindStyledElement(style) {
  @property({ type: String })
  value = ''

  @property({ type: String })
  name = ''

  @property({ type: String })
  placeholder = '#000000'

  @property({ type: String })
  label = ''

  @property({ type: String })
  id = ''

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

  @property({ type: Boolean, attribute: 'keep-focus-on-escape' })
  keepFocusOnEscape = false

  @property({ type: String })
  size: InputSize = 'medium'

  @state()
  private hasFocus = false

  @state()
  private hasHighlight = false

  private styles = tv({
    slots: {
      wrapper: 'group grid border overflow-hidden',
      input: `bg-neutral-100 border-solid placeholder:text-neutral-70 w-full
        outline-none transition transition-all duration-150 appearance-none`,
      color: 'border-r border-solid',
      colorInput: 'h-[inherit] w-[inherit] opacity-0',
    },
    variants: {
      hasError: {
        true: {
          wrapper: 'border-red-85 hover:border-red-65',
          color: 'border-red-85 group-hover:border-red-65',
        },
        false: {
          wrapper: 'border-neutral-90',
          color: 'border-neutral-90',
        },
      },
      hasHighlight: {
        true: {
          wrapper: 'border-neutral-35',
          color: 'border-neutral-35',
        },
      },
      isReadonly: {
        true: { input: 'cursor-not-allowed', colorInput: 'cursor-not-allowed' },
      },
      isDisabled: {
        true: {
          input: 'text-neutral-60 cursor-not-allowed',
          color: 'opacity-50',
          colorInput: 'cursor-not-allowed',
        },
        false: {
          wrapper: 'hover:border-neutral-35',
          input: 'text-neutral-20',
          color: 'group-hover:border-neutral-35',
        },
      },
      isFullWidth: {
        true: { wrapper: 'w-full' },
        false: { wrapper: 'w-[350px]' },
      },
      size: {
        small: {
          wrapper: 'grid-cols-[28px,auto] rounded-8',
          input: 'h-[28px] px-2 py-1 paragraph-inter-12-regular rounded-r-8',
          color: 'h-[28px] w-[28px]',
        },
        medium: {
          wrapper: 'grid-cols-[48px,auto] rounded-12',
          input: 'h-[48px] px-4 py-3 paragraph-inter-14-regular rounded-r-12',
          color: 'h-[48px] w-[48px]',
        },
      },
    },
    compoundVariants: [
      {
        isFullWidth: false,
        class: { wrapper: 'w-[300px]' },
      },
      {
        isFullWidth: false,
        size: 'small',
        class: { wrapper: 'w-[190px]' },
      },
      {
        isFullWidth: false,
        size: 'small',
        class: { wrapper: 'w-[210px]' },
      },
      {
        hasHighlight: true,
        hasError: true,
        class: {
          wrapper: 'border-red-65 hover:border-red-65',
          color: 'border-red-65 group-hover:border-red-65',
        },
      },
      {
        isReadonly: false,
        isDisabled: false,
        class: {
          colorInput: 'cursor-pointer',
        },
      },
    ],
  })

  inputTemplate(styles: string) {
    return html`
      <input
        .value=${this.value}
        name=${this.name ? this.name : nothing}
        type="text"
        placeholder=${this.placeholder ? this.placeholder : nothing}
        ?autofocus=${this.autofocus}
        autocomplete="off"
        id=${this.id ? this.id : nothing}
        data-testid=${this.name ? `input-${this.name}` : 'input'}
        ?readonly=${this.isReadonly ? true : undefined}
        ?disabled=${this.isDisabled ? true : undefined}
        class=${cn(styles, this.customClass)}
        @focus=${this.handleFocus}
        @input=${this.handleInput}
        @change=${this.handleChange}
        @blur=${this.handleBlur}
        @keyup=${this.handleKeyUp}
        @keydown=${this.handleKeyDown}
      />
    `
  }

  colorPickerTemplate(styles: string, colorInputStyles: string) {
    return html`<div
      class=${styles}
      style=${styleMap({
        backgroundColor: `${this.value}`,
      })}
    >
      <input
        .value=${this.value}
        type="color"
        ?disabled=${this.isDisabled || this.isReadonly ? true : undefined}
        class=${colorInputStyles}
        @input=${this.handleInput}
      />
    </div>`
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
    await this.updateComplete
    const target = event.target as HTMLInputElement
    this.value = target?.value
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

    // if escape key is pressed we clear the input unless keepValueOnEscapeHit is true
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

  render() {
    const { wrapper, input, color, colorInput } = this.styles({
      hasError: this.error !== '',
      hasHighlight: this.hasHighlight,
      isReadonly: this.isReadonly,
      isDisabled: this.isDisabled,
      isFullWidth: this.isFullWidth,
      size: this.size,
    })

    return html`
      <div class="w-[inherit]">
        ${this.label ? this.labelTemplate() : nothing}
        ${this.description ? this.descriptionTemplate() : nothing}
        <div class=${wrapper()}>
          ${this.colorPickerTemplate(color(), colorInput())}
          <div class="relative w-full">${this.inputTemplate(input())}</div>
        </div>
        ${this.error ? this.errorTemplate() : nothing}
      </div>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'lukso-color-picker': LuksoColorPicker
  }
}
