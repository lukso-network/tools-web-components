import { PropertyValues, TemplateResult, html, nothing } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'

import { TailwindStyledElement } from '@/shared/tailwind-element'
import { customClassMap } from '@/shared/directives'
import style from './style.scss?inline'
import '@/components/lukso-icon'
import '@/components/lukso-profile'
import '@/components/lukso-username'

export type SelectStringOption = {
  id?: string
  value: string
}

export type SelectOption = SelectStringOption

@customElement('lukso-select')
export class LuksoSelect extends TailwindStyledElement(style) {
  @property({ type: String })
  value = ''

  @property({ type: String })
  placeholder = ''

  @property({ type: String })
  label = ''

  @property({ type: String })
  id = ''

  @property({ type: String })
  description = ''

  @property({ type: String })
  error = ''

  @property({ type: Boolean, attribute: 'is-full-width' })
  isFullWidth = false

  @property({ type: Boolean, attribute: 'is-readonly' })
  isReadonly = false

  @property({ type: Boolean, attribute: 'is-disabled' })
  isDisabled = false

  @property({ type: Boolean })
  borderless = false

  @property({ type: String })
  options = ''

  @property({ type: Number })
  selected = undefined

  @property({ type: Boolean, attribute: 'is-open' })
  isOpen: boolean = false

  @property({ type: Boolean, attribute: 'open-top' })
  openTop: boolean = false

  @state()
  private optionsParsed: SelectOption[] = []

  @state()
  private valueParsed: SelectOption | undefined = undefined

  private defaultInputStyles = `bg-neutral-100 paragraph-inter-14-regular px-4 py-3 pr-11
    border-solid h-[48px] placeholder:text-neutral-70 select-none whitespace-nowrap
    outline-none transition transition-all duration-150 appearance-none rounded-12`

  connectedCallback() {
    super.connectedCallback()
    window.addEventListener('click', this.handleOutsideDropdownClick.bind(this))
    window.addEventListener('keydown', this.handleDropdownKeydown.bind(this))
  }
  disconnectedCallback() {
    super.disconnectedCallback()
    window.removeEventListener('click', this.handleOutsideDropdownClick)
    window.removeEventListener('keydown', this.handleDropdownKeydown)
  }

  willUpdate(changedProperties: PropertyValues<this>) {
    // for long lists when selected option changes we scroll to it
    if (changedProperties.has('selected')) {
      const selectedOption = this.shadowRoot?.querySelector(
        `[data-index="${changedProperties.get('selected')}"`
      )

      if (selectedOption) {
        selectedOption.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        })
      }
    }

    if (changedProperties.has('options')) {
      try {
        this.optionsParsed = JSON.parse(this.options) as SelectOption[]
      } catch (error: unknown) {
        console.warn('Could not parse options', error)
      }
    }

    if (changedProperties.has('value')) {
      try {
        this.valueParsed = JSON.parse(this.value) as SelectOption
      } catch (error: unknown) {
        console.warn('Could not parse value', error)
      }
    }
  }

  inputTemplate() {
    return html`
      <div
        id=${this.id}
        data-testid=${this.id ? `select-${this.id}` : 'select'}
        class=${customClassMap({
          [this.defaultInputStyles]: true,
          ['border-neutral-90 group-hover:border-neutral-35']:
            !!!this.error && !this.isDisabled,
          ['border-red-85 group-hover:border-red-65']: !!this.error,
          ['w-full']: this.isFullWidth,
          ['cursor-not-allowed text-neutral-60']: this.isDisabled,
          ['text-neutral-20 cursor-pointer']: !this.isDisabled,
          [this.borderless ? 'border-0' : 'border']: true,
        })}
        @blur=${this.handleBlur}
        @click=${this.handleClick}
      >
        ${this.value ? this.selectedValue() : this.placeholder}
      </div>
    `
  }

  labelTemplate() {
    return html`
      <div class="heading-inter-14-bold text-neutral-20 pb-2 block">
        ${this.label}
      </div>
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

  optionsTemplate() {
    const optionTemplates: TemplateResult<1>[] = []

    for (const option of Object.entries(this.optionsParsed)) {
      const index = Number(option[0])

      if ('value' in option[1]) {
        optionTemplates.push(this.optionStringTemplate(option[1], index))
      } else {
        console.error('Unknown option type', option)
      }
    }

    return html`${this.dropdownWrapperTemplate(optionTemplates)}`
  }

  dropdownWrapperTemplate(
    innerTemplate: TemplateResult<1> | TemplateResult<1>[]
  ) {
    return html`<div
      class="bg-neutral-100 border w-full border-neutral-90 shadow-1xl rounded-12 p-3 z-50 flex absolute flex-col gap-1 overflow-y-auto max-h-64 ${customClassMap(
        {
          ['bottom-[48px] mb-2']: this.openTop,
          ['mt-2']: !this.openTop,
        }
      )}
      )}"
    >
      ${innerTemplate}
    </div>`
  }

  optionStringTemplate(option: SelectStringOption, index: number) {
    return html`<div
      data-id="${option.id}"
      data-index="${index + 1}"
      class="paragraph-inter-14-regular text-neutral-20 cursor-pointer rounded-8 p-2 whitespace-nowrap ${customClassMap(
        {
          ['bg-neutral-95 hover:bg-neutral-95']:
            this.valueParsed?.id === option.id,
          ['bg-neutral-98']:
            this.selected === index + 1 && this.valueParsed?.id !== option.id,
          ['hover:bg-neutral-98']: this.valueParsed?.id !== option.id,
        }
      )}"
      @click=${() => this.handleSelect(option)}
    >
      ${option.value}
    </div>`
  }

  private selectedValue() {
    const foundValue = this.optionsParsed.find(
      option => option.id === this.valueParsed?.id
    )

    if (foundValue) {
      return foundValue.value
    }

    return ''
  }

  private handleOutsideDropdownClick(event: Event) {
    const element = event.target as HTMLElement

    if (element.tagName === 'LUKSO-SELECT') {
      return
    }

    this.isOpen = false
  }

  private async handleDropdownKeydown(event: KeyboardEvent) {
    if (!this.isOpen) {
      return
    }

    if (event.key === 'ArrowUp' && this.selected && this.selected > 1) {
      event.preventDefault()
      this.selected = this.selected - 1
    }

    if (event.key === 'ArrowDown' && this.optionsParsed?.length) {
      event.preventDefault()

      if (!this.selected) {
        this.selected = 1
      } else if (this.selected < this.optionsParsed.length) {
        this.selected = this.selected + 1
      }
    }

    if (event.key === 'Enter') {
      if (this.optionsParsed?.length && this.selected) {
        const selectedResult = this.optionsParsed[this.selected - 1]
        await this.handleSelect(selectedResult)
      }
    }
  }

  private async handleSelect(option: SelectOption) {
    if (this.isReadonly || this.isDisabled) {
      return
    }

    await this.updateComplete
    this.isOpen = false
    const selectEvent = new CustomEvent('on-select', {
      detail: {
        value: option,
      },
      bubbles: false,
      composed: true,
    })
    this.dispatchEvent(selectEvent)
  }

  private async handleBlur(event: FocusEvent) {
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

  private handleClick() {
    if (this.isDisabled) {
      return
    }

    this.isOpen = !this.isOpen
  }

  render() {
    return html`
      <div class="relative w-full ">
        ${this.label ? this.labelTemplate() : nothing}
        ${this.description ? this.descriptionTemplate() : nothing}
        <div class="group">
          <div class="flex relative items-center">
            ${this.inputTemplate()}<lukso-icon
              name=${this.isFullWidth ? 'arrow-down-lg' : 'arrow-down-sm'}
              class="absolute right-0 mr-3 transition ${customClassMap({
                ['opacity-60 cursor-not-allowed']: this.isDisabled,
                ['cursor-pointer']: !this.isDisabled,
                ['rotate-180']: this.isOpen,
              })}"
              @click=${this.handleClick}
            ></lukso-icon>
          </div>
          <!-- options dropdown -->
          ${this.isOpen && this.optionsParsed.length > 0
            ? this.optionsTemplate()
            : nothing}
        </div>
        <!-- error -->
        ${this.error ? this.errorTemplate() : nothing}
      </div>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'lukso-select': LuksoSelect
  }
}
