import { html, nothing } from 'lit'
import { property, state } from 'lit/decorators.js'
import { tv } from 'tailwind-variants'

import { safeCustomElement } from '@/shared/safe-custom-element'
import '@/components/lukso-icon'
import '@/components/lukso-dropdown'
import '@/components/lukso-date-picker'
import '@/components/lukso-form-label'
import '@/components/lukso-form-description'
import '@/components/lukso-form-error'
import { TailwindStyledElement } from '@/shared/tailwind-element'
import { uniqId } from '@/shared/tools/uniq-id'
import style from './style.css?inline'

import type {
  DatePickerDateFormat,
  DatePickerTimeFormat,
  DatePickerWeekStartDay,
  InputSize,
} from '@/shared/types'

export type LuksoInputDatePickerOnChangeEventDetail = {
  value: string
  event: Event
}

/**
 * An input that opens a date picker dropdown when clicked.
 * Displays the selected date/time inline with customizable formatting.
 * Emits `on-change` with `{ value: string, event }` where `value` is an ISO 8601 date-time string.
 */
@safeCustomElement('lukso-input-date-picker')
export class LuksoInputDatePicker extends TailwindStyledElement(style) {
  /** ISO 8601 date-time string, e.g. "2026-05-15T20:00" */
  @property({ type: String })
  value?: string

  /** Minimum selectable date as ISO date string, e.g. "2026-01-01" */
  @property({ type: String })
  min?: string

  /** Maximum selectable date as ISO date string, e.g. "2026-12-31" */
  @property({ type: String })
  max?: string

  /** BCP-47 locale tag for Intl formatting. Defaults to the device locale. */
  @property({ type: String })
  locale: string =
    typeof navigator !== 'undefined' ? navigator.language : 'en-US'

  /** Component size preset. */
  @property({ type: String })
  size: InputSize = 'large'

  /** Placeholder text shown when no date is selected. */
  @property({ type: String })
  placeholder = ''

  /** Optional label shown above the input. */
  @property({ type: String })
  label?: string

  /** Optional description shown below the label. */
  @property({ type: String })
  description?: string

  /** Optional error message shown below the input. */
  @property({ type: String })
  error?: string

  /** Whether to show the time picker and include time in the displayed value. */
  @property({ type: Boolean, attribute: 'show-time' })
  showTime = true

  /** How to display the date in the input field. */
  @property({ type: String, attribute: 'date-format' })
  dateFormat: DatePickerDateFormat = 'short'

  /** Time display format. "auto" detects the device preference via Intl. */
  @property({ type: String, attribute: 'time-format' })
  timeFormat: DatePickerTimeFormat = 'auto'

  /** First day of the week in the calendar grid. */
  @property({ type: String, attribute: 'week-start-day' })
  weekStartDay: DatePickerWeekStartDay = 'monday'

  /** Disables all interaction. */
  @property({ type: Boolean, attribute: 'is-disabled' })
  isDisabled = false

  /** Makes the input read-only (display only, cannot open picker). */
  @property({ type: Boolean, attribute: 'is-readonly' })
  isReadonly = false

  /** Stretches the input to full width. */
  @property({ type: Boolean, attribute: 'is-full-width' })
  isFullWidth = false

  /** Removes the border from the input. */
  @property({ type: Boolean })
  borderless = false

  /** CSS color value for the selected day background. Forwarded to date picker. */
  @property({ type: String, attribute: 'selected-bg-color' })
  selectedBgColor?: string

  /** CSS color value for the selected day text. Forwarded to date picker. */
  @property({ type: String, attribute: 'selected-text-color' })
  selectedTextColor?: string

  /** Opens the calendar above the input instead of below. */
  @property({ type: Boolean, attribute: 'open-top' })
  openTop = false

  /** Aligns the calendar to the right edge of the input. */
  @property({ type: Boolean, attribute: 'open-right' })
  openRight = false

  @state() private _isOpen = false
  @state() private _internalValue?: string

  private readonly _inputId = uniqId()
  private _boundOutsideClick?: (e: Event) => void

  // ─── Styles ────────────────────────────────────────────────────────────────

  private wrapperStyles = tv({
    base: 'group',
    variants: {
      isFullWidth: {
        true: 'w-full',
        false: 'w-[350px]',
      },
      size: {
        small: '',
        medium: '',
        large: '',
        'x-large': '',
      },
    },
    compoundVariants: [
      { isFullWidth: false, size: 'small', class: 'w-[190px]' },
    ],
  })

  private inputStyles = tv({
    base: `bg-neutral-100 border border-solid select-none
      outline-none transition-all duration-150 text-neutral-20 cursor-pointer
      border-neutral-90 group-hover:border-neutral-35 flex items-center w-full`,
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
        'x-large':
          'h-17 px-5 py-5 pr-14 paragraph-inter-16-regular rounded-[14px]',
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
        'x-large': 'mr-4',
      },
    },
  })

  // ─── Lifecycle ─────────────────────────────────────────────────────────────

  override connectedCallback() {
    super.connectedCallback()
    this._boundOutsideClick = this._handleOutsideClick.bind(this)
    window.addEventListener('click', this._boundOutsideClick)
  }

  override disconnectedCallback() {
    super.disconnectedCallback()
    if (this._boundOutsideClick) {
      window.removeEventListener('click', this._boundOutsideClick)
    }
  }

  override willUpdate(changed: Map<string | number | symbol, unknown>) {
    if (changed.has('value')) {
      this._internalValue = this.value
    }
  }

  // ─── Computed helpers ───────────────────────────────────────────────────────

  private _formatDisplayValue(): string {
    if (!this._internalValue) return ''
    try {
      const d = new Date(this._internalValue)
      if (isNaN(d.getTime())) return ''
      const dateOpts: Intl.DateTimeFormatOptions =
        this.dateFormat === 'long'
          ? { month: 'long', day: 'numeric', year: 'numeric' }
          : { month: 'short', day: 'numeric', year: 'numeric' }
      const dateStr = new Intl.DateTimeFormat(this.locale, dateOpts).format(d)
      if (!this.showTime) return dateStr
      let hour12: boolean | undefined
      if (this.timeFormat === '12h') hour12 = true
      else if (this.timeFormat === '24h') hour12 = false
      else {
        hour12 = /AM|PM/i.test(
          new Intl.DateTimeFormat(this.locale, { hour: 'numeric' }).format(d)
        )
      }
      const timeStr = new Intl.DateTimeFormat(this.locale, {
        hour: '2-digit',
        minute: '2-digit',
        hour12,
      }).format(d)
      return `${dateStr} ${timeStr}`
    } catch {
      return this._internalValue ?? ''
    }
  }

  // ─── Event handlers ─────────────────────────────────────────────────────────

  private _handleOutsideClick(event: Event) {
    const el = event.target as HTMLElement
    if (el.tagName === 'LUKSO-INPUT-DATE-PICKER' && el === this) return
    this._isOpen = false
  }

  private _handleInputClick() {
    if (this.isDisabled || this.isReadonly) return
    this._isOpen = !this._isOpen
  }

  private _handleDatePickerChange(e: CustomEvent) {
    this._internalValue = e.detail.value as string
    this.dispatchEvent(
      new CustomEvent<LuksoInputDatePickerOnChangeEventDetail>('on-change', {
        detail: { value: this._internalValue, event: e.detail.event },
        bubbles: true,
        composed: true,
      })
    )
  }

  // ─── Render ─────────────────────────────────────────────────────────────────

  override render() {
    const displayValue = this._formatDisplayValue()

    const wrapperClass = this.wrapperStyles({
      isFullWidth: this.isFullWidth,
      size: this.size,
    })

    const inputClass = this.inputStyles({
      isDisabled: this.isDisabled,
      hasError: !!this.error,
      borderless: this.borderless,
      size: this.size,
    })

    const iconClass = this.iconStyles({
      isDisabled: this.isDisabled,
      isOpen: this._isOpen,
      size: this.size,
    })

    return html`
      <div class="relative w-[inherit]">
        <lukso-form-label label=${this.label ?? nothing}></lukso-form-label>
        <lukso-form-description
          description=${this.description ?? nothing}
        ></lukso-form-description>

        <div class=${wrapperClass}>
          <div class="flex relative items-center w-full">
            <!-- Input trigger -->
            <div
              id=${this._inputId}
              class=${inputClass}
              @click=${this._handleInputClick}
              aria-haspopup="true"
              aria-expanded=${this._isOpen ? 'true' : 'false'}
              role="combobox"
            >
              ${displayValue
                ? displayValue
                : this.placeholder
                  ? html`<span class="text-neutral-70"
                      >${this.placeholder}</span
                    >`
                  : nothing}
            </div>
            <!-- Arrow icon -->
            <lukso-icon
              name="arrow-down-sm"
              class=${iconClass}
              @click=${this._handleInputClick}
            ></lukso-icon>
          </div>

          <!-- Date picker dropdown -->
          ${this._isOpen
            ? html`
                <lukso-dropdown
                  ?is-open=${true}
                  is-open-on-outside-click
                  ?open-top=${this.openTop}
                  ?is-right=${this.openRight}
                  ?is-full-width=${this.isFullWidth}
                  max-height="full"
                  custom-class="!p-0 !border-0 !shadow-none !bg-transparent !gap-0 !overflow-visible"
                  size=${this.size}
                >
                  <lukso-date-picker
                    value=${this._internalValue ?? nothing}
                    min=${this.min ?? nothing}
                    max=${this.max ?? nothing}
                    locale=${this.locale}
                    size=${this.size}
                    ?show-time=${this.showTime}
                    ?show-summary=${this.showTime}
                    show-summary
                    date-format=${this.dateFormat}
                    time-format=${this.timeFormat}
                    week-start-day=${this.weekStartDay}
                    ?is-disabled=${this.isDisabled}
                    ?is-full-width=${this.isFullWidth}
                    selected-bg-color=${this.selectedBgColor ?? nothing}
                    selected-text-color=${this.selectedTextColor ?? nothing}
                    @on-change=${this._handleDatePickerChange}
                  ></lukso-date-picker>
                </lukso-dropdown>
              `
            : nothing}
        </div>

        <lukso-form-error error=${this.error ?? nothing}></lukso-form-error>
      </div>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'lukso-input-date-picker': LuksoInputDatePicker
  }
}
