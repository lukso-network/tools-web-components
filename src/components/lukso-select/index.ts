import { type PropertyValues, type TemplateResult, html, nothing } from 'lit'
import { property, state } from 'lit/decorators.js'
import { tv } from 'tailwind-variants'
import makeBlockie from 'ethereum-blockies-base64'

import { safeCustomElement } from '@/shared/safe-custom-element'
import { TailwindStyledElement } from '@/shared/tailwind-element'
import '@/components/lukso-icon'
import '@/components/lukso-profile'
import '@/components/lukso-username'
import '@/components/lukso-dropdown'
import '@/components/lukso-dropdown-option'
import '@/components/lukso-sanitize'
import '@/components/lukso-form-label'
import '@/components/lukso-form-description'
import '@/components/lukso-form-error'
import style from './style.css?inline'
import { uniqId } from '@/shared/tools/uniq-id'

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
  isEOA?: boolean
}

export type SelectOption = SelectStringOption | SelectProfileOption

@safeCustomElement('lukso-select')
export class LuksoSelect extends TailwindStyledElement(style) {
  @property({ type: String })
  value: string | undefined = ''

  @property({ type: String })
  placeholder: string | undefined = ''

  @property({ type: String })
  label: string | undefined = ''

  @property({ type: String })
  id: string | undefined = ''

  @property({ type: String })
  description: string | undefined = ''

  @property({ type: String })
  error: string | undefined = ''

  @property({ type: Boolean, attribute: 'is-full-width' })
  isFullWidth = false

  @property({ type: Boolean, attribute: 'is-readonly' })
  isReadonly = false

  @property({ type: Boolean, attribute: 'is-disabled' })
  isDisabled = false

  @property({ type: Boolean })
  borderless = false

  @property({ type: String })
  options: string | undefined = ''

  @property({ type: Number })
  selected: number | undefined

  @property({ type: Boolean, attribute: 'is-open' })
  isOpen = false

  @property({ type: Boolean, attribute: 'open-top' })
  openTop = false

  @property({ type: Boolean, attribute: 'is-large-icon' })
  isLargeIcon = false

  @property({ type: Boolean, attribute: 'is-right' })
  isRight = false

  @property({ type: String })
  size: InputSize = 'large'

  @property({ type: Boolean, attribute: 'show-selection-counter' })
  showSelectionCounter = false

  @property({ type: Number, attribute: 'max-height', reflect: true })
  maxHeight: number | undefined

  @state()
  private optionsParsed: SelectOption[] = []

  @state()
  private valueParsed: SelectOption[] | undefined = undefined

  constructor() {
    super()

    if (!this.id) {
      this.id = uniqId()
    }
  }

  private inputStyles = tv({
    base: `bg-neutral-100
      border border-solid placeholder:text-neutral-70 select-none whitespace-nowrap
      outline-none transition transition-all duration-150 appearance-none
      text-neutral-20 cursor-pointer border-neutral-90 group-hover:border-neutral-35
      flex items-center w-full`,
    variants: {
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
        small: 'h-7 px-3 py-2 pr-8 paragraph-inter-12-regular rounded-8',
        medium: 'h-10 px-3 py-3 pr-11 paragraph-inter-14-regular rounded-10',
        large: 'h-12 px-4 py-3 pr-11 paragraph-inter-14-regular rounded-12',
        'x-large': '',
      },
    },
  })

  private counterStyles = tv({
    base: 'border border-neutral-20',
    variants: {
      isDisabled: {
        true: 'opacity-60 cursor-not-allowed',
      },
      size: {
        small:
          'paragraph-inter-10-semi-bold rounded-4 py-[1px] px-[5px] ml-1.5',
        medium:
          'paragraph-inter-14-semi-bold rounded-8 py-[2px] px-[10px] ml-3',
        large: 'paragraph-inter-14-semi-bold rounded-8 py-[2px] px-[10px] ml-3',
        'x-large': '',
      },
    },
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
        large: 'mr-3',
        'x-large': '',
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
        this.optionsParsed = []
      }
    }

    if (changedProperties.has('value') && !!this.value) {
      try {
        const value = JSON.parse(this.value)
        this.valueParsed = Array.isArray(value) ? value : [value]
      } catch (error: unknown) {
        console.warn('Could not parse value', error)
      }
    }
  }

  inputTemplate() {
    const inputStyles = this.inputStyles({
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
        ${this.placeholder ? this.placeholder : nothing}
        ${!this.placeholder && this.valueParsed?.length
          ? this.selectedValueTemplate()
          : nothing}
        ${this.showSelectionCounter && this.valueParsed?.length
          ? this.selectedOptionsCounterTemplate()
          : nothing}
      </div>
    `
  }

  selectedOptionsCounterTemplate() {
    const counterStyles = this.counterStyles({
      isDisabled: this.isDisabled,
      size: this.size,
    })

    return html`<div class=${counterStyles}>${this.valueParsed?.length}</div>`
  }

  optionsTemplate() {
    const optionTemplates: TemplateResult<1>[] = []
    let _options = []

    // get list of groups names
    const groups: string[] = this.optionsParsed.reduce((acc, option) => {
      if ('group' in option && !acc.includes(option.group)) {
        acc.push(option.group)
      }
      return acc
    }, [] as string[])

    // if there are groups, we need to group the options
    if (groups.length > 0) {
      for (const group of groups) {
        _options.push({
          group,
          values: this.optionsParsed.filter(
            option => 'group' in option && option.group === group
          ),
        })
      }
    } else {
      _options = this.optionsParsed
    }

    for (const option of Object.entries(_options)) {
      const index = Number(option[0])

      if ('group' in option[1]) {
        optionTemplates.push(this.optionGroupedStringTemplate(option[1], index))
      } else if ('value' in option[1]) {
        optionTemplates.push(this.optionStringTemplate(option[1], index))
      } else if ('address' in option[1]) {
        optionTemplates.push(this.optionProfileTemplate(option[1], index))
      } else {
        console.error('Unknown option type', option)
      }
    }

    return html`<lukso-dropdown
      size=${this.size}
      is-open
      is-open-on-outside-click
      max-height=${this.maxHeight}
      ?is-full-width=${this.isFullWidth}
      ?is-right=${this.isRight}
      ?open-top=${this.openTop}
      >${optionTemplates}</lukso-dropdown
    >`
  }

  optionGroupedStringTemplate(
    option: {
      group: string
      values: SelectStringOption[]
    },
    index: number
  ) {
    return html`<div
        class="paragraph-inter-10-bold-uppercase text-neutral-20 p-1 text-left"
      >
        ${option.group}
      </div>
      ${option.values.map(value => {
        return this.optionStringTemplate(
          { id: value.id, group: option.group, value: value.value },
          index
        )
      })}`
  }

  optionStringTemplate(option: SelectStringOption, index: number) {
    return html`<lukso-dropdown-option
      data-id="${option.id}"
      data-index="${index + 1}"
      ?is-selected=${!!this.valueParsed?.find(value => value.id === option.id)}
      ?is-active=${this.selected === index + 1 &&
      !this.valueParsed?.find(value => value.id === option.id)}
      size=${this.size}
      ?is-group=${!!option.group}
      ?is-disabled=${this.isDisabled}
      ?is-readonly=${this.isReadonly}
      @click=${() => this.handleSelect(option)}
    >
      ${this.optionStringValue(option)}
    </lukso-dropdown-option>`
  }

  optionProfileTemplate(option: SelectProfileOption, index: number) {
    return html`<lukso-dropdown-option
      data-id="${option.id}"
      data-index="${index + 1}"
      ?is-selected=${!!this.valueParsed?.find(value => value.id === option.id)}
      ?is-active=${this.selected === index + 1 &&
      !this.valueParsed?.find(value => value.id === option.id)}
      size=${this.size}
      ?is-disabled=${this.isDisabled}
      ?is-readonly=${this.isReadonly}
      @click=${() => this.handleSelect(option)}
    >
      ${this.optionProfileValue(option)}
    </lukso-dropdown-option>`
  }

  private optionStringValue(option: SelectStringOption) {
    return option.value
  }

  private optionProfileValue(option: SelectProfileOption) {
    const eoaProfilePicture = html`<lukso-profile
      profile-address="${option.address}"
      profile-url="${option.address ? makeBlockie(option.address) : ''}"
      size="x-small"
    ></lukso-profile>`

    const lsp3ProfilePicture = html`<lukso-profile
      profile-address="${option.address}"
      profile-url="${option.image}"
      size="x-small"
      has-identicon
    ></lukso-profile>`

    const profilePicture = option.isEOA ? eoaProfilePicture : lsp3ProfilePicture

    return html`${profilePicture}
      <lukso-username
        name="${option.name?.toLowerCase()}"
        address="${option.address}"
        name-color="neutral-20"
        max-width="150"
        slice-by="4"
        size=${this.size}
        class="ml-1"
      ></lukso-username>`
  }

  private selectedValueTemplate() {
    const firstOption = this.optionsParsed[0]

    if (!firstOption) {
      return ''
    }

    if ('value' in firstOption) {
      const foundValues = this.optionsParsed.filter(
        option => !!this.valueParsed?.find(value => value.id === option.id)
      )
      return foundValues
        .map(value => this.optionStringValue(value as SelectStringOption))
        .join(', ')
    }

    if ('address' in firstOption) {
      const foundValues = this.optionsParsed.filter(
        option => !!this.valueParsed?.find(value => value.id === option.id)
      )
      const optionProfileValues = []

      for (const value of foundValues) {
        optionProfileValues.push(
          this.optionProfileValue(value as SelectProfileOption)
        )
      }

      return optionProfileValues
    }

    console.error('Unknown value type', this.valueParsed)

    return ''
  }

  private handleOutsideDropdownClick(event: Event) {
    const element = event.target as HTMLElement

    if (element.tagName === 'LUKSO-SELECT' && this.id === element.id) {
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
        <lukso-form-label label=${this.label}></lukso-form-label>
        <lukso-form-description
          description=${this.description}
        ></lukso-form-description>
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
        <lukso-form-error error=${this.error}></lukso-form-error>
      </div>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'lukso-select': LuksoSelect
  }
}
