import { html, nothing } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import { HTMLInputTypeAttribute } from 'react'

import { TailwindElement } from '@/shared/tailwind-element'
import { customClassMap } from '@/shared/directives'

@customElement('lukso-input')
export class LuksoInput extends TailwindElement {
  @property({ type: String })
  value = ''

  @property({ type: String })
  name = ''

  @property({ type: String })
  type: HTMLInputTypeAttribute = 'text'

  @property({ type: String })
  placeholder = ''

  @property({ type: String })
  label = ''

  @property({ type: String })
  description = ''

  @property({ type: String })
  error = ''

  @property({ type: String })
  unit = ''

  @property({ type: Boolean, attribute: 'is-full-width' })
  isFullWidth = false

  @state()
  private hasHocus = false

  private defaultInputStyles = `bg-neutral-100 text-neutral-20 paragraph-16-regular px-4 py-3
    border border-solid border-neutral-90 h-[48px] placeholder:neutral-70
    outline-none transition transition-all duration-250`

  private defaultUnitStyles = `paragraph-12-regular text-neutral-60 flex px-3.5 items-center relative
    border border-solid border-neutral-90 h-[48px] transition transition-all duration-250
    rounded-r-xl border-l-0 before:bg-neutral-90 before:absolute before:top-[calc(50%-12px)] before:left-0
    before:w-[1px] before:h-[24px]`

  inputTemplate() {
    return html`
      <input
        data-testid="input"
        id=${this.name}
        type=${this.type}
        value=${this.value}
        placeholder=${this.placeholder}
        class=${customClassMap({
          [this.defaultInputStyles]: true,
          ['border-red-85 text-red-65 focus:border-red-65']: this.error !== '',
          ['border-neutral-35']: this.hasHocus,
          ['rounded-l-xl border-r-0']: this.unit !== '',
          ['rounded-xl']: this.unit === '',
          ['w-full']: this.isFullWidth,
          ['w-[350px]']: !this.isFullWidth && this.unit === '',
          ['w-[300px]']: !this.isFullWidth && this.unit !== '',
        })}
        @focus=${this.handleFocus}
        @blur=${this.handleBlur}
        @keyup=${this.handleKeyUp}
      />
    `
  }

  labelTemplate() {
    return html`
      <label for=${this.name} class="heading-h5 text-neutral-20 pb-2 block"
        >${this.label}</label
      >
    `
  }

  descriptionTemplate() {
    return html`
      <div class="paragraph-12-regular text-neutral-20 pb-2">
        ${this.description ?? nothing}
      </div>
    `
  }

  errorTemplate() {
    return html`<div class="paragraph-12-regular text-red-65 pt-2">
      ${this.error}
    </div>`
  }

  unitTemplate() {
    return html`<div
      class=${customClassMap({
        [this.defaultUnitStyles]: true,
        ['border-red-85']: this.error !== '',
        ['border-neutral-35']: this.hasHocus && this.error === '',
        ['border-red-65']: this.hasHocus && this.error !== '',
      })}
    >
      ${this.unit}
    </div>`
  }

  private handleFocus() {
    this.hasHocus = true
  }

  private handleBlur() {
    this.hasHocus = false
  }

  private handleKeyUp(event: KeyboardEvent) {
    const target = event.target as HTMLInputElement
    const keyUpEvent = new CustomEvent('on-key-up', {
      detail: {
        value: target.value,
      },
      bubbles: true,
      composed: true,
    })
    this.dispatchEvent(keyUpEvent)
  }

  render() {
    return html`
      <div>
        ${this.label ? this.labelTemplate() : nothing}
        ${this.description ? this.descriptionTemplate() : nothing}
        <div class="flex">
          ${this.inputTemplate()} ${this.unit ? this.unitTemplate() : nothing}
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
