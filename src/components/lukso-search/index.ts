import { type PropertyValues, type TemplateResult, html, nothing } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'

import { TailwindStyledElement } from '@/shared/tailwind-element'
import { customClassMap } from '@/shared/directives'
import '@/components/lukso-icon'
import '@/components/lukso-profile'
import '@/components/lukso-username'
import '@/components/lukso-input'
import style from './style.scss?inline'

import type { Address } from '@/shared/types'

export type SearchStringResult = {
  id?: string
  value: string
}

export type SearchProfileResult = {
  address: Address
  image?: string
  name?: string
}

export type SearchResult = SearchStringResult | SearchProfileResult

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

  @property({ type: Number })
  debounce = 700

  @property({ type: Boolean, attribute: 'is-searching' })
  isSearching = false

  @property({ type: String, attribute: 'no-results-text' })
  noResultsText = ''

  @property({ type: Boolean, attribute: 'show-no-results' })
  showNoResults = false

  @property({ type: Number })
  selected = undefined

  @state()
  private isDebouncing = false

  @state()
  private debounceTimer: NodeJS.Timeout

  @state()
  private resultsParsed: SearchResult[] = []

  @state()
  private searchTerm = ''

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

    for (const result of Object.entries(this.resultsParsed)) {
      const index = Number(result[0])

      if ('value' in result[1]) {
        // StringResult dropdown
        resultTemplates.push(this.resultStringTemplate(result[1], index))
      } else if ('address' in result[1]) {
        // ProfileResult dropdown
        resultTemplates.push(this.resultProfileTemplate(result[1], index))
      } else {
        console.error('Unknown result type', result)
      }
    }

    return html`${this.dropdownWrapperTemplate(resultTemplates)}`
  }

  noResultsTemplate() {
    return html`${this.dropdownWrapperTemplate(
      html`<div class="paragraph-inter-14-semi-bold text-neutral-20 pl-1">
        ${this.noResultsText}
      </div>`
    )}`
  }

  loadingTemplate() {
    // when `showNoResults` is enabled we show just one placeholder line
    if (this.showNoResults) {
      return html`${this.dropdownWrapperTemplate(html`
        <div role="status" class="flex flex-col gap-1">
          <div
            class="h-10 bg-neutral-95 w-full rounded-8 animate-pulse animation-delay-none"
          ></div>
        </div>
      `)}`
    }

    // when no results or there is more then dropdown size we show 5 placeholder lines
    if (this.resultsParsed.length === 0 || this.resultsParsed.length > 5) {
      return html`${this.dropdownWrapperTemplate(html`
        <div role="status" class="flex flex-col gap-1">
          ${[...Array(5)].map(
            () =>
              html`<div
                class="h-10 bg-neutral-95 w-full rounded-8 animate-pulse animation-delay-none"
              ></div>`
          )}
        </div>
      `)}`
    }

    // when show placeholder lines based on the number of results
    return html`${this.dropdownWrapperTemplate(html`
      <div role="status" class="flex flex-col gap-1">
        ${this.resultsParsed.map(
          () =>
            html`<div
              class="h-10 bg-neutral-95 w-full rounded-8 animate-pulse animation-delay-none"
            ></div>`
        )}
      </div>
    `)}`
  }

  dropdownWrapperTemplate(
    innerTemplate: TemplateResult<1> | TemplateResult<1>[]
  ) {
    return html`<div
      class="bg-neutral-100 border border-neutral-90 shadow-1xl rounded-12 p-3 mt-2 z-50 flex absolute w-full flex-col gap-1 overflow-y-auto max-h-64"
    >
      ${innerTemplate}
    </div>`
  }

  resultStringTemplate(result: SearchStringResult, index: number) {
    return html`<div
      data-id="${result.id}"
      data-index="${index + 1}"
      class="paragraph-inter-14-regular text-neutral-20 cursor-pointer hover:bg-neutral-98 rounded-8 p-2 ${customClassMap(
        {
          'bg-neutral-98': this.selected === index + 1,
        }
      )}"
      @click=${() => this.handleSelect(result)}
    >
      ${result.value}
    </div>`
  }

  resultProfileTemplate(result: SearchProfileResult, index: number) {
    return html`<div
      data-id="${result.address}"
      data-index="${index + 1}"
      class="cursor-pointer hover:bg-neutral-98 rounded-8 p-2 flex gap-2 items-center ${customClassMap(
        {
          'bg-neutral-98': this.selected === index + 1,
        }
      )}"
      @click=${() => this.handleSelect(result)}
    >
      <lukso-profile
        profile-address="${result.address}"
        profile-url="${result.image}"
        size="x-small"
        has-identicon
      ></lukso-profile>
      <lukso-username
        name="${result.name?.toLowerCase()}"
        address="${result.address}"
        name-color="neutral-20"
        max-width="300"
        size="medium"
      ></lukso-username>
    </div>`
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

  // private handleFocus() {
  //   if (!this.isReadonly && !this.isDisabled) {
  //     this.hasFocus = true
  //     this.hasHighlight = true
  //   }
  // }

  private async handleBlur(event: FocusEvent) {
    await this.updateComplete
    // this.hasFocus = false
    // this.hasHighlight = false
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
    this.handleSearch(event)
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
          value=${this.value}
          placeholder=${this.placeholder}
          autocomplete=${this.autocomplete}
          label=${this.label}
          description=${this.description}
          error=${this.error}
          custom-class=${this.customClass}
          id=${this.id}
          data-component="lukso-search"
          right-icon="search"
          ?autofocus=${this.autofocus}
          ?readonly=${this.isReadonly}
          ?disabled=${this.isDisabled}
          ?is-full-width=${this.isFullWidth}
          @on-input=${this.handleSearch}
          @on-blur=${this.handleBlur}
          @on-input-click=${this.handleInputClick}
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
        ${this.value && (this.isSearching || this.isDebouncing)
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
