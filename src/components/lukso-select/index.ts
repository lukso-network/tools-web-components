import { type PropertyValues, type TemplateResult, html, nothing } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import { tv } from 'tailwind-variants'

import { TailwindStyledElement } from '@/shared/tailwind-element'
import '@/components/lukso-icon'
import '@/components/lukso-profile'
import '@/components/lukso-username'
import style from './style.scss?inline'

import type { Address, InputSize } from '@/shared/types'

export type SelectStringOption = {
  id?: string
  group?: string
  value: string
}

export type SelectProfileOption = {
  id?: string
  address: Address
  image?: string
  name?: string
}

export type SelectGroupedStringOption = {
  id?: string
  group: string
  values: string[]
}

export type SelectOption =
  | SelectStringOption
  | SelectProfileOption
  | SelectGroupedStringOption

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
  isOpen = false

  @property({ type: Boolean, attribute: 'open-top' })
  openTop = false

  @property({ type: Boolean, attribute: 'is-large-icon' })
  isLargeIcon = false

  @property({ type: String })
  size: InputSize = 'medium'

  @state()
  private optionsParsed: SelectOption[] = []

  @state()
  private valueParsed: SelectOption | undefined = undefined

  private inputStyles = tv({
    base: `bg-neutral-100
      border border-solid placeholder:text-neutral-70 select-none whitespace-nowrap
      outline-none transition transition-all duration-150 appearance-none
      text-neutral-20 cursor-pointer border-neutral-90 group-hover:border-neutral-35
      flex items-center`,
    variants: {
      isFullWidth: {
        true: 'w-full',
      },
      isDisabled: {
        true: 'cursor-not-allowed text-neutral-60 group-hover:border-neutral-90',
      },
      hasError: {
        true: 'border-red-85 group-hover:border-red-65',
      },
      borderless: {
        true: 'border-0',
      },
      size: {
        small: 'h-[28px] px-3 py-2 pr-8 paragraph-inter-12-regular rounded-8',
        medium:
          'h-[48px] px-4 py-3 pr-11 paragraph-inter-14-regular rounded-12',
      },
    },
  })

  private dropdownWrapperStyles = tv({
    base: `bg-neutral-100 border w-auto border-neutral-90 shadow-1xl z-50
      flex absolute flex-col gap-1 overflow-y-auto max-h-64 `,
    variants: {
      openTop: {
        true: 'bottom-[48px] mb-2 mt-0',
      },
      size: {
        small: 'rounded-8 p-2 mt-1 max-w-[200px]',
        medium: 'rounded-12 p-3 mt-2 max-w-[300px]',
      },
    },
  })

  private optionsStyles = tv({
    base: `text-neutral-20 cursor-pointer
      whitespace-nowrap hover:bg-neutral-98 flex items-center truncate`,
    variants: {
      isSelected: {
        true: 'bg-neutral-95 hover:bg-neutral-95',
      },
      isActive: {
        true: 'bg-neutral-98',
      },
      isGroup: {
        true: '',
      },
      size: {
        small: 'paragraph-inter-12-regular rounded-4 py-1 px-2 min-h-[28px]',
        medium: 'paragraph-inter-14-regular rounded-8 p-2 min-h-[38px]',
      },
    },
    compoundVariants: [
      {
        isGroup: true,
        size: 'small',
        class: 'pl-3',
      },
      {
        isGroup: true,
        size: 'medium',
        class: 'pl-4',
      },
    ],
  })

  private iconStyles = tv({
    base: 'absolute right-0 transition cursor-pointer',
    variants: {
      isDisabled: {
        true: 'opacity-60 cursor-not-allowed',
      },
      isOpen: {
        true: 'rotate-180',
      },
      size: {
        small: 'mr-2',
        medium: 'mr-3',
      },
    },
  })

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
        if (
          'scrollIntoViewIfNeeded' in selectedOption &&
          typeof selectedOption.scrollIntoViewIfNeeded === 'function'
        ) {
          selectedOption.scrollIntoViewIfNeeded()
        } else {
          // if scrollIntoViewIfNeeded is not supported, we use scrollIntoView
          selectedOption.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
          })
        }
      }
    }

    if (changedProperties.has('options') && !!this.options) {
      try {
        this.optionsParsed = JSON.parse(this.options) as SelectOption[]
      } catch (error: unknown) {
        console.warn('Could not parse options', error)
      }
    }

    if (changedProperties.has('value') && !!this.value) {
      try {
        this.valueParsed = JSON.parse(this.value) as SelectOption
      } catch (error: unknown) {
        console.warn('Could not parse value', error)
      }
    }
  }

  inputTemplate() {
    const inputStyles = this.inputStyles({
      isFullWidth: this.isFullWidth,
      isDisabled: this.isDisabled,
      hasError: !!this.error,
      borderless: this.borderless,
      size: this.size,
    })

    return html`
      <div
        id=${this.id}
        data-testid=${this.id ? `select-${this.id}` : 'select'}
        class=${inputStyles}
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

      if ('values' in option[1]) {
        optionTemplates.push(this.optionGroupedStringTemplate(option[1], index))
      } else if ('value' in option[1]) {
        optionTemplates.push(this.optionStringTemplate(option[1], index))
      } else if ('address' in option[1]) {
        optionTemplates.push(this.optionProfileTemplate(option[1], index))
      } else {
        console.error('Unknown option type', option)
      }
    }

    return html`${this.dropdownWrapperTemplate(optionTemplates)}`
  }

  dropdownWrapperTemplate(
    innerTemplate: TemplateResult<1> | TemplateResult<1>[]
  ) {
    const dropdownWrapperStyles = this.dropdownWrapperStyles({
      openTop: this.openTop,
      size: this.size,
    })

    return html`<div class="${dropdownWrapperStyles}">${innerTemplate}</div>`
  }

  optionGroupedStringTemplate(
    option: SelectGroupedStringOption,
    index: number
  ) {
    return html`<div
        class="paragraph-inter-10-bold-uppercase text-neutral-20 p-1"
      >
        ${option.group}
      </div>
      ${option.values.map((value, valueIndex) =>
        this.optionStringTemplate(
          { id: `${index}-${valueIndex}`, group: option.group, value },
          index
        )
      )}`
  }

  optionStringTemplate(option: SelectStringOption, index: number) {
    const optionsStyles = this.optionsStyles({
      isSelected: this.valueParsed?.id === option.id,
      isActive:
        this.selected === index + 1 && this.valueParsed?.id !== option.id,
      size: this.size,
      isGroup: !!option.group,
    })

    return html`<div
      data-id="${option.id}"
      data-index="${index + 1}"
      class="${optionsStyles}"
      @click=${() => this.handleSelect(option)}
    >
      ${this.optionStringValue(option)}
    </div>`
  }

  optionProfileTemplate(option: SelectProfileOption, index: number) {
    const optionsStyles = this.optionsStyles({
      isSelected: this.valueParsed?.id === option.id,
      isActive:
        this.selected === index + 1 && this.valueParsed?.id !== option.id,
      size: this.size,
    })

    return html`<div
      data-id="${option.id}"
      data-index="${index + 1}"
      class="${optionsStyles}"
      @click=${() => this.handleSelect(option)}
    >
      ${this.optionProfileValue(option)}
    </div>`
  }

  private optionStringValue(option: SelectStringOption) {
    return option.value
  }

  private optionProfileValue(option: SelectProfileOption) {
    return html`<lukso-profile
        profile-address="${option.address}"
        profile-url="${option.image}"
        size="x-small"
        has-identicon
        class="mr-2"
      ></lukso-profile>
      <lukso-username
        name="${option.name?.toLowerCase()}"
        address="${option.address}"
        name-color="neutral-20"
        max-width="150"
        slice-by="4"
        size=${this.size}
      ></lukso-username>`
  }

  private selectedValue() {
    const foundValue = this.optionsParsed.find(
      option => option.id === this.valueParsed?.id
    )

    if (foundValue) {
      if ('value' in foundValue) {
        return this.optionStringValue(foundValue)
      }

      if ('address' in foundValue) {
        return this.optionProfileValue(foundValue)
      }

      console.error('Unknown value type', foundValue)
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
    if (
      event.key === 'ArrowUp' &&
      this.selected &&
      this.selected > 1 &&
      this.isOpen
    ) {
      event.preventDefault()
      this.selected = this.selected - 1
    }

    if (
      event.key === 'ArrowDown' &&
      this.optionsParsed?.length &&
      this.isOpen
    ) {
      event.preventDefault()

      if (!this.selected) {
        this.selected = 1
      } else if (this.selected < this.optionsParsed.length) {
        this.selected = this.selected + 1
      }
    }

    if (event.key === 'Enter' && this.isOpen) {
      if (this.optionsParsed?.length && this.selected) {
        const selectedResult = this.optionsParsed[this.selected - 1]
        await this.handleSelect(selectedResult)
      }
    }

    if (event.key === 'Escape') {
      this.isOpen = false
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
    const iconStyles = this.iconStyles({
      isDisabled: this.isDisabled,
      isOpen: this.isOpen,
      size: this.size,
    })

    return html`
      <div class="relative w-[inherit]">
        ${this.label ? this.labelTemplate() : nothing}
        ${this.description ? this.descriptionTemplate() : nothing}
        <div class="group">
          <div class="flex relative items-center">
            ${this.inputTemplate()}<lukso-icon
              name=${this.isLargeIcon ? 'arrow-down-lg' : 'arrow-down-sm'}
              class="${iconStyles}"
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
