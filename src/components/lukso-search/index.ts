import { PropertyValues, TemplateResult, html, nothing } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'

import { TailwindStyledElement } from '@/shared/tailwind-element'
import { customClassMap } from '@/shared/directives'
import style from './style.scss?inline'
import '@/components/lukso-icon'
import '@/components/lukso-profile'
import '@/components/lukso-username'
import { Address } from '@/shared/types'

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
  private hasFocus = false

  @state()
  private hasHighlight = false

  @state()
  private isDebouncing = false

  @state()
  private debounceTimer: NodeJS.Timeout

  @state()
  private resultsParsed: SearchResult[] = []

  @state()
  private searchTerm = ''

  private defaultInputStyles = `bg-neutral-100 paragraph-inter-14-regular px-4 py-3 pr-10
    border-solid h-[48px] placeholder:text-neutral-70
    outline-none transition transition-all duration-150 appearance-none rounded-12`

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
          inline: 'nearest',
        })
      }
    }
  }

  inputTemplate() {
    return html`
      <input
        name=${this.name}
        type="text"
        .value=${this.value}
        placeholder=${this.placeholder}
        ?autofocus=${this.autofocus}
        autocomplete=${this.autocomplete}
        id=${this.id || this.name}
        data-testid=${this.name ? `input-${this.name}` : 'input'}
        ?readonly=${this.isReadonly ? true : undefined}
        ?disabled=${this.isDisabled ? true : undefined}
        class=${customClassMap({
          [this.defaultInputStyles]: true,
          [this.error === '' ? 'border-neutral-90' : 'border-red-85']:
            !this.hasHighlight,
          [this.error === '' ? 'border-neutral-35' : 'border-red-65']:
            this.hasHighlight,
          ['w-full']: this.isFullWidth,
          ['w-[350px]']: !this.isFullWidth,
          ['cursor-not-allowed text-neutral-60']: this.isDisabled,
          ['text-neutral-20']: !this.isDisabled,
          ['cursor-not-allowed']: this.isReadonly,
          [this.customClass]: !!this.customClass,
          [this.borderless ? 'border-0' : 'border']: true,
        })}
        @focus=${this.handleFocus}
        @input=${this.handleSearch}
        @blur=${this.handleBlur}
        @click=${this.handleInputClick}
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
          ['bg-neutral-98']: this.selected === index + 1,
        }
      )}'"
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
          ['bg-neutral-98']: this.selected === index + 1,
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

  private handleFocus() {
    if (!this.isReadonly && !this.isDisabled) {
      this.hasFocus = true
      this.hasHighlight = true
    }
  }

  private async handleBlur(event: FocusEvent) {
    await this.updateComplete
    this.hasFocus = false
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

  render() {
    return html`
      <div class="relative w-full">
        ${this.label ? this.labelTemplate() : nothing}
        ${this.description ? this.descriptionTemplate() : nothing}
        <div class="flex relative items-center">
          ${this.inputTemplate()}
          <lukso-icon
            name="search"
            class="absolute right-0 mr-3 ${customClassMap({
              ['opacity-60 cursor-not-allowed']: this.isDisabled,
              ['cursor-not-allowed']: this.isReadonly,
            })}"
            @mouseenter=${this.handleMouseOver}
          ></lukso-icon>
        </div>
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
        <!-- error -->
        ${this.error ? this.errorTemplate() : nothing}
      </div>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'lukso-search': LuksoSearch
  }
}
