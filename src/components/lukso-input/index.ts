import { html, nothing } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'

import { TailwindElement } from '@/shared/tailwind-element'
import { customClassMap } from '@/shared/directives'

@customElement('lukso-input')
export class LuksoInput extends TailwindElement {
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
  ref = undefined

  @property({ type: String })
  accept = undefined

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

  @state()
  private hasHocus = false

  @state()
  private hasHighlight = false

  private defaultInputStyles = `bg-neutral-100 text-neutral-20 paragraph-inter-14-regular px-4 py-3
    border border-solid h-[48px] placeholder:text-neutral-70
    outline-none transition transition-all duration-150 appearance-none`

  private defaultUnitStyles = `paragraph-inter-12-regular text-neutral-60 flex px-3.5 items-center relative
    border border-solid h-[48px] transition transition-all duration-150
    rounded-r-12 border-l-0 before:bg-neutral-90 before:absolute before:top-[calc(50%-12px)] before:left-0
    before:w-[1px] before:h-[24px] whitespace-nowrap`

  inputTemplate() {
    return html`
      <input
        name=${this.name}
        type=${this.type as any}
        value=${this.value}
        placeholder=${this.placeholder}
        ?autofocus=${this.autofocus}
        min=${this.min}
        max=${this.max}
        autocomplete=${this.autocomplete}
        ref=${this.ref}
        id=${this.id || this.name}
        data-testid=${this.name ? `input-${this.name}` : 'input'}
        accept=${this.accept}
        ?readonly=${this.isReadonly ? true : undefined}
        ?disabled=${this.isDisabled ? true : undefined}
        class=${customClassMap({
          [this.customClass]: !!this.customClass,
          [this.defaultInputStyles]: true,
          [this.error === '' ? 'border-neutral-90' : 'border-red-85']:
            !this.hasHighlight,
          [this.error === '' ? 'border-neutral-35' : 'border-red-65']:
            this.hasHighlight,
          ['rounded-l-12 border-r-0']: this.unit !== '',
          ['rounded-12']: this.unit === '',
          ['w-full']: this.isFullWidth,
          ['w-[350px]']: !this.isFullWidth && this.unit === '',
          ['w-[300px]']: !this.isFullWidth && this.unit !== '',
        })}
        @focus=${this.handleFocus}
        @change=${this.handleChange}
        @blur=${this.handleBlur}
        @keyup=${this.handleKeyUp}
        @keydown=${this.handleKeyDown}
        @keypress=${this.handleKeyPress}
        @mouseenter=${this.handleMouseOver}
        @mouseleave=${this.handleMouseOut}
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

  unitTemplate() {
    return html`<div
      class=${customClassMap({
        [this.defaultUnitStyles]: true,
        [this.error === '' ? 'border-neutral-90' : 'border-red-85']:
          !this.hasHighlight,
        [this.error === '' ? 'border-neutral-35' : 'border-red-65']:
          this.hasHighlight,
      })}
      @mouseenter=${this.handleMouseOver}
      @mouseleave=${this.handleMouseOut}
    >
      ${this.unit}
    </div>`
  }

  private handleFocus() {
    this.hasHocus = true
    this.hasHighlight = true
  }

  private handleBlur(event: FocusEvent) {
    this.hasHocus = false
    this.hasHighlight = false
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

  private handleChange(event: Event) {
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

  private handleKeyUp(event: KeyboardEvent) {
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

  private handleKeyDown(event: KeyboardEvent) {
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

  private handleKeyPress(event: KeyboardEvent) {
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
    this.hasHighlight = true
  }

  private handleMouseOut() {
    if (!this.hasHocus) {
      this.hasHighlight = false
    }
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
