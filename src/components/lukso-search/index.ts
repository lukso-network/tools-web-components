import makeBlockie from 'ethereum-blockies-base64'
import { type PropertyValues, type TemplateResult, html, nothing } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import { tv } from 'tailwind-variants'

import '@/components/lukso-dropdown'
import '@/components/lukso-dropdown-option'
import '@/components/lukso-icon'
import '@/components/lukso-input'
import '@/components/lukso-profile'
import '@/components/lukso-tag'
import '@/components/lukso-username'
import { TailwindStyledElement } from '@/shared/tailwind-element'
import { sliceAddress } from '@/shared/tools'
import style from './style.scss?inline'
import {
  SearchResultType,
  type Address,
  type InputSize,
  type Standard,
} from '@/shared/types'
import { SEARCH_RESULT_TYPES, STANDARDS } from '@/shared/enums'

export type SearchResult = {
  id: string
  type: SearchResultType
  address?: Address
  value?: string
  image?: string
  name?: string
  symbol?: string
  standard?: Standard
  status?: boolean
}

@customElement('lukso-search')
export class LuksoSearch extends TailwindStyledElement(style) {
  @property({ type: String })
  value = ''

  @property({ type: String })
  name = ''

  @property({ type: String })
  placeholder = ''

  @property({ type: String })
  label = ''

  @property({ type: String, attribute: 'group-labels' })
  groupLabels = JSON.stringify({
    [SEARCH_RESULT_TYPES.UNIVERSAL_NAME]: 'Universal Names',
    [SEARCH_RESULT_TYPES.PROFILE]: 'Profiles',
    [SEARCH_RESULT_TYPES.ASSET]: 'Assets',
    [SEARCH_RESULT_TYPES.APP]: 'Apps',
    [SEARCH_RESULT_TYPES.STRING]: 'Other',
  })

  @property({ type: String, attribute: 'available-text' })
  availableText = 'Available'

  @property({ type: String, attribute: 'unavailable-text' })
  unavailableText = 'Registered'

  @property({ type: String })
  autocomplete = 'off'

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

  @property({ type: Boolean })
  borderless = false

  @property({ type: String })
  results = ''

  @property({ type: String, attribute: 'right-icon' })
  rightIcon = 'search'

  @property({ type: Number })
  debounce = 700

  @property({ type: Boolean, attribute: 'is-searching' })
  isSearching = false

  @property({ type: String, attribute: 'no-results-text' })
  noResultsText = ''

  @property({ type: Boolean, attribute: 'show-no-results' })
  showNoResults = false

  @property({ type: Boolean, attribute: 'hide-loading' })
  hideLoading = false

  @property({ type: Boolean, attribute: 'has-reset' })
  hasReset = false

  @property({ type: Boolean, attribute: 'keep-value-on-escape-hit' })
  keepValueOnEscapeHit = false

  @property({ type: Number })
  selected = undefined

  @property({ type: String })
  size: InputSize | 'large' | 'x-large' = 'large'

  @property({ type: Number, attribute: 'max-height' })
  maxHeight = undefined

  @property({ type: Boolean, attribute: 'with-group-labels' })
  withGroupLabels = false

  @state()
  private isDebouncing = false

  @state()
  private debounceTimer: NodeJS.Timeout

  @state()
  private resultsParsed: SearchResult[] = []

  private styles = tv({
    slots: {
      loading: 'bg-neutral-95 w-full animate-pulse animation-delay-none',
    },
    variants: {
      size: {
        small: {
          loading: 'h-7 rounded-4',
        },
        medium: {
          loading: 'h-10 rounded-8',
        },
        large: {
          loading: 'h-10 rounded-8',
        },
        'x-large': {
          loading: 'h-12 rounded-8',
        },
      },
    },
  })

  private dropdownSize: Record<InputSize | 'large' | 'x-large', string> = {
    small: 'small',
    medium: 'medium',
    large: 'medium',
    'x-large': 'medium',
  }

  private profileSize: Record<InputSize | 'large' | 'x-large', string> = {
    small: '2x-small',
    medium: 'x-small',
    large: 'x-small',
    'x-large': 'small',
  }

  private usernameSize: Record<InputSize | 'large' | 'x-large', string> = {
    small: 'small',
    medium: 'medium',
    large: 'medium',
    'x-large': 'x-large',
  }

  private textSize: Record<InputSize | 'large' | 'x-large', string> = {
    small: 'text-12',
    medium: 'text-14',
    large: 'text-14',
    'x-large': 'text-16',
  }

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
  }

  resultsTemplate() {
    const resultTemplates: TemplateResult<1>[] = []
    this.resultsParsed = JSON.parse(this.results) as SearchResult[]
    const groupLabelsParsed = JSON.parse(this.groupLabels)

    // for every first element from type we add a group label
    for (const result of Object.entries(this.resultsParsed)) {
      const index = Number(result[0])

      if (this.withGroupLabels) {
        const currentType = result[1].type
        const prevType = index > 0 ? this.resultsParsed[index - 1].type : null

        if (index === 0 || currentType !== prevType) {
          let headerText = ''
          switch (currentType) {
            case SEARCH_RESULT_TYPES.UNIVERSAL_NAME:
              headerText = groupLabelsParsed[SEARCH_RESULT_TYPES.UNIVERSAL_NAME]
              break
            case SEARCH_RESULT_TYPES.PROFILE:
              headerText = groupLabelsParsed[SEARCH_RESULT_TYPES.PROFILE]
              break
            case SEARCH_RESULT_TYPES.ASSET:
              headerText = groupLabelsParsed[SEARCH_RESULT_TYPES.ASSET]
              break
            case SEARCH_RESULT_TYPES.APP:
              headerText = groupLabelsParsed[SEARCH_RESULT_TYPES.APP]
              break
            default:
              headerText = groupLabelsParsed[SEARCH_RESULT_TYPES.STRING]
              break
          }
          resultTemplates.push(
            html`<div
              class="py-1 my-1 text-neutral-35 paragraph-inter-12-medium tracking-wider border-b border-b-neutral-95 text-left"
            >
              ${headerText}
            </div>`
          )
        }
      }

      // depending on the type we render different result templates
      switch (result[1].type) {
        // UniversalName result
        case SEARCH_RESULT_TYPES.UNIVERSAL_NAME:
          resultTemplates.push(
            this.resultUniversalNameTemplate(result[1], index)
          )
          break
        // Profile result
        case SEARCH_RESULT_TYPES.PROFILE:
          resultTemplates.push(this.resultProfileTemplate(result[1], index))
          break
        // Asset result
        case SEARCH_RESULT_TYPES.ASSET:
          resultTemplates.push(this.resultAssetTemplate(result[1], index))
          break
        // App result
        case SEARCH_RESULT_TYPES.APP:
          resultTemplates.push(this.resultAppTemplate(result[1], index))
          break
        // Default string result
        default:
          resultTemplates.push(this.resultStringTemplate(result[1], index))
          break
      }
    }

    return html`<lukso-dropdown
      size=${this.dropdownSize[this.size]}
      is-open
      is-open-on-outside-click
      is-full-width
      max-height=${this.maxHeight || nothing}
      >${resultTemplates}</lukso-dropdown
    >`
  }

  noResultsTemplate() {
    return html`<lukso-dropdown
      size=${this.dropdownSize[this.size]}
      is-open
      is-open-on-outside-click
      is-full-width
      >${html`<div class="paragraph-inter-14-semi-bold text-neutral-20 pl-1">
        ${this.noResultsText}
      </div>`}</lukso-dropdown
    >`
  }

  loadingTemplate() {
    const { loading } = this.styles({
      size: this.size,
    })

    // when `showNoResults` is enabled we show just one placeholder line
    if (this.showNoResults) {
      return html`<lukso-dropdown
        size=${this.dropdownSize[this.size]}
        is-open
        is-open-on-outside-click
        is-full-width
        >${html`
          <div role="status" class="flex flex-col gap-1">
            <div class=${loading()}></div>
          </div>
        `}</lukso-dropdown
      >`
    }

    // when no results or there is more then dropdown size we show 5 placeholder lines
    if (this.resultsParsed.length === 0 || this.resultsParsed.length > 5) {
      return html`<lukso-dropdown
        size=${this.dropdownSize[this.size]}
        is-open
        is-open-on-outside-click
        is-full-width
        >${html`
          <div role="status" class="flex flex-col gap-1">
            ${[...Array(5)].map(() => html`<div class=${loading()}></div>`)}
          </div>
        `}</lukso-dropdown
      >`
    }

    // when show placeholder lines based on the number of results
    return html`<lukso-dropdown
      size=${this.dropdownSize[this.size]}
      is-open
      is-open-on-outside-click
      is-full-width
      >${html`
        <div role="status" class="flex flex-col gap-1">
          ${this.resultsParsed.map(() => html`<div class=${loading()}></div>`)}
        </div>
      `}</lukso-dropdown
    >`
  }

  resultStringTemplate(result: SearchResult, index: number) {
    const dropdownSize =
      this.size === 'large' || this.size === 'x-large' ? 'medium' : this.size
    return html`<lukso-dropdown-option
      data-id="${result.id}"
      data-index="${index + 1}"
      ?is-selected=${this.selected === index + 1}
      size=${dropdownSize}
      @click=${() => this.handleSelect(result)}
    >
      ${result.value}
    </lukso-dropdown-option>`
  }

  resultUniversalNameTemplate(result: SearchResult, index: number) {
    const tag = html`<lukso-tag
      is-rounded
      background-color="${result.status ? 'green-95' : 'neutral-95'}"
      text-color="${result.status ? 'green-45' : 'neutral-60'}"
      >${!!result.status ? this.availableText : this.unavailableText}</lukso-tag
    >`
    return html`<lukso-dropdown-option
      data-id="${result.id}"
      data-index="${index + 1}"
      ?is-selected=${this.selected === index + 1}
      size=${this.dropdownSize[this.size]}
      @click=${() => this.handleSelect(result)}
    >
      <div class="flex flex-row items-center justify-between w-full">
        <div class="paragraph-inter-14-semi-bold">${result.value}</div>
        ${tag}
      </div>
    </lukso-dropdown-option>`
  }

  resultProfileTemplate(result: SearchResult, index: number) {
    const eoaProfilePicture = html`<lukso-profile
      profile-address="${result.address}"
      profile-url="${result.address ? makeBlockie(result.address) : ''}"
      size=${this.profileSize[this.size]}
    ></lukso-profile>`

    const lsp3ProfilePicture = html`<lukso-profile
      profile-address="${result.address}"
      profile-url="${result.image}"
      size=${this.profileSize[this.size]}
      has-identicon
    ></lukso-profile>`

    const standard = result.standard || STANDARDS.LSP3

    const profilePicture =
      standard !== STANDARDS.LSP3 ? eoaProfilePicture : lsp3ProfilePicture

    const upProfileUsername = html`<lukso-username
      name="${result.name?.toLowerCase() || 'anonymous-profile'}"
      address="${result.address}"
      name-color="neutral-20"
      max-width="300"
      size=${this.usernameSize[this.size]}
      ?hide-prefix="${!result.name}"
      class="ml-1"
    ></lukso-username> `
    const eoaUsername = html`<lukso-username
      name="${sliceAddress(result.address, 8)}"
      address="__EOA"
      name-color="neutral-20"
      max-width="300"
      size=${this.usernameSize[this.size]}
      hide-prefix
      class="ml-1"
    ></lukso-username>`

    const scUsername = html`<lukso-username
      name=""
      address="${sliceAddress(result.address, 8)}"
      name-color="neutral-20"
      max-width="300"
      size=${this.usernameSize[this.size]}
      hide-prefix
      class="ml-1"
    ></lukso-username>`

    let profileName = scUsername
    if (standard === STANDARDS.EOA) {
      profileName = eoaUsername
    } else if (standard === STANDARDS.LSP3) {
      profileName = upProfileUsername
    }

    return html`<lukso-dropdown-option
      data-id="${result.address}"
      data-index="${index + 1}"
      ?is-selected=${this.selected === index + 1}
      size=${this.dropdownSize[this.size]}
      @click=${() => this.handleSelect(result)}
    >
      ${profilePicture} ${profileName}
    </lukso-dropdown-option>`
  }

  resultAssetTemplate(result: SearchResult, index: number) {
    return html`<lukso-dropdown-option
      data-id="${result.address}"
      data-index="${index + 1}"
      ?is-selected=${this.selected === index + 1}
      size=${this.dropdownSize[this.size]}
      @click=${() => this.handleSelect(result)}
    >
      <lukso-profile
        profile-address="${result.address}"
        profile-url="${result.image}"
        placeholder="/assets/images/token-default.svg"
        size=${this.profileSize[this.size]}
      ></lukso-profile>
      <span class="paragraph-inter-14-semi-bold ${this.textSize[this.size]}"
        >${result.name}
        <span
          class="text-neutral-60 paragraph-inter-14-regular ${this.textSize[
            this.size
          ]}"
          >${result.symbol}</span
        ></span
      >
    </lukso-dropdown-option>`
  }

  resultAppTemplate(result: SearchResult, index: number) {
    return html`<lukso-dropdown-option
      data-id="${result.address}"
      data-index="${index + 1}"
      ?is-selected=${this.selected === index + 1}
      size=${this.dropdownSize[this.size]}
      @click=${() => this.handleSelect(result)}
    >
      <lukso-profile
        profile-address="${result.address}"
        profile-url="${result.image}"
        size=${this.profileSize[this.size]}
      ></lukso-profile>
      <span class="paragraph-inter-14-semi-bold ${this.textSize[this.size]}"
        >${result.name}
      </span>
    </lukso-dropdown-option>`
  }

  private async handleOutsideDropdownClick(event: Event) {
    const element = event.target as HTMLElement

    if (element?.dataset?.component === 'lukso-search') {
      return
    }

    this.results = ''
  }

  private async handleDropdownKeydown(event: KeyboardEvent) {
    if (
      event.key === 'ArrowUp' &&
      this.selected &&
      this.selected > 1 &&
      this.resultsParsed?.length
    ) {
      event.preventDefault()
      this.selected = this.selected - 1
    }

    if (event.key === 'ArrowDown' && this.resultsParsed?.length) {
      event.preventDefault()

      if (!this.selected) {
        this.selected = 1
      } else if (this.selected < this.resultsParsed.length) {
        this.selected = this.selected + 1
      }
    }

    if (event.key === 'Enter' && this.resultsParsed?.length) {
      if (this.selected) {
        const selectedResult = this.resultsParsed[this.selected - 1]
        await this.handleSelect(selectedResult)
      }
    }

    if (event.key === 'Escape') {
      this.results = ''
    }
  }

  private async handleSelect(result: SearchResult) {
    await this.updateComplete
    const selectEvent = new CustomEvent('on-select', {
      detail: {
        value: result,
      },
      bubbles: false,
      composed: true,
    })
    this.dispatchEvent(selectEvent)
  }

  private async handleBlur(event: FocusEvent) {
    event.stopPropagation() // prevent double event firing
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

  private async handleInputClick(event: MouseEvent) {
    event.stopPropagation() // prevent double event firing
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

  private async handleKeyUp(event: CustomEvent) {
    event.stopPropagation() // prevent double event firing
    await this.updateComplete
    const value = event?.detail?.value

    // if escape key is pressed we clear the input
    if (!this.keepValueOnEscapeHit && event?.detail?.event?.key === 'Escape') {
      this.value = ''
      event.detail.value = ''
      this.handleSearch(event)
    }

    const keyEvent = new CustomEvent('on-key-up', {
      detail: {
        value,
        event,
      },
      bubbles: true,
      composed: true,
    })
    this.dispatchEvent(keyEvent)
  }

  private async handleReset(event: MouseEvent) {
    if (!this.hasReset) {
      return
    }

    await this.updateComplete
    this.value = ''
    const target = event.target as HTMLInputElement
    const clickEvent = new CustomEvent('on-reset', {
      detail: {
        value: target.value,
        event,
      },
      bubbles: false,
      composed: true,
    })
    this.dispatchEvent(clickEvent)
  }

  private async searchDebounce(searchTerm: string) {
    await this.updateComplete
    this.value = searchTerm
    this.debounceTimer = setTimeout(() => {
      const changeEvent = new CustomEvent('on-search', {
        detail: {
          value: searchTerm,
        },
        bubbles: false,
        composed: true,
      })

      this.dispatchEvent(changeEvent)
      this.isDebouncing = false
    }, this.debounce)
  }

  private handleSearch(event: Event) {
    if (this.isDebouncing) {
      clearTimeout(this.debounceTimer)
    }

    this.isDebouncing = true
    const target = event.target as HTMLInputElement
    this.searchDebounce(target.value)
  }

  render() {
    return html`
      <div class="relative w-full">
        <lukso-input
          name=${this.name}
          type="text"
          .value=${this.value}
          placeholder=${this.placeholder}
          autocomplete=${this.autocomplete}
          label=${this.label}
          description=${this.description}
          error=${this.error}
          custom-class=${this.customClass}
          id=${this.id}
          size=${this.size}
          data-component="lukso-search"
          right-icon="${this.hasReset && this.value
            ? 'close-sm'
            : this.rightIcon}"
          ?is-right-icon-clickable=${this.hasReset && this.value}
          ?autofocus=${this.autofocus}
          ?is-readonly=${this.isReadonly}
          ?is-disabled=${this.isDisabled}
          ?is-full-width=${this.isFullWidth}
          keep-focus-on-escape
          @on-input=${this.handleSearch}
          @on-blur=${this.handleBlur}
          @on-input-click=${this.handleInputClick}
          @on-right-icon-click=${this.handleReset}
          @on-key-up=${this.handleKeyUp}
        ></lukso-input>
        <!-- results dropdown -->
        ${this.results && !(this.isSearching || this.isDebouncing)
          ? this.resultsTemplate()
          : nothing}
        <!-- no results dropdown -->
        ${this.showNoResults && !(this.isSearching || this.isDebouncing)
          ? this.noResultsTemplate()
          : nothing}
        <!-- loading dropdown -->
        ${!this.hideLoading &&
        this.value &&
        (this.isSearching || this.isDebouncing)
          ? this.loadingTemplate()
          : nothing}
      </div>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'lukso-search': LuksoSearch
  }
}
