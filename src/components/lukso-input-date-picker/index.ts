import { html, nothing } from 'lit'
import { property, state } from 'lit/decorators.js'
import { tv } from 'tailwind-variants'

import { safeCustomElement } from '@/shared/safe-custom-element'
import '@/components/lukso-icon'
import '@/components/lukso-dropdown'
import '@/components/lukso-dropdown-option'
import '@/components/lukso-date-picker'
import '@/components/lukso-form-label'
import '@/components/lukso-form-description'
import '@/components/lukso-form-error'
import { TailwindStyledElement } from '@/shared/tailwind-element'
import { uniqId } from '@/shared/tools/uniq-id'
import style from './style.css?inline'

import type {
  DatePickerDateFormat,
  DatePickerPreset,
  DatePickerPresetTime,
  DatePickerTimeFormat,
  DatePickerWeekStartDay,
  InputSize,
} from '@/shared/types'

export type LuksoInputDatePickerOnChangeEventDetail = {
  /** Resolved ISO 8601 date-time string, e.g. "2026-05-15T20:00". */
  value: string
  /**
   * The active preset when a preset triggered the change.
   * Omitted when the user picks a date directly without a preset active.
   */
  preset?: DatePickerPresetTime
  event: Event
}

/**
 * An input that opens a date picker dropdown when clicked.
 * Displays the selected date/time inline with customizable formatting.
 * Emits `on-change` with `{ value: string, preset?: DatePickerPresetTime, event }` where `value`
 * is a resolved ISO 8601 date-time string, or an empty string when `'forever'` is selected.
 *
 * When `presets` is provided the trigger becomes a preset selector.
 * Selecting `'now'` or `'forever'` immediately emits `on-change` without opening the calendar.
 * Selecting a relative object preset (`{ amount, unit }`) opens the calendar pre-navigated to
 * the resolved date so the user can adjust before confirming; the emitted event carries both
 * the chosen ISO date and the originating preset reference.
 * Selecting `{ time: 'pick' }` opens the calendar for fully manual date selection.
 */
@safeCustomElement('lukso-input-date-picker')
export class LuksoInputDatePicker extends TailwindStyledElement(style) {
  /** ISO 8601 date-time string, e.g. "2026-05-15T20:00". Can also be a string sentinel ("now", "forever", "pick") to pre-select a matching preset when `presets` is configured. */
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

  /**
   * JSON-stringified array of DatePickerPreset objects.
   * When provided, replaces the plain date input with a preset-selector dropdown.
   * Example: '[{"label":"Now","time":"now"},{"label":"Pick a date…","time":"pick"}]'
   * Preset time values: "now" | "forever" | "pick" | { amount: number, unit: "minute" | "hour" | "day" | "week" | "month" | "year" }.
   * Negative `amount` selects a past date. "forever" emits an empty string value (no date).
   */
  @property({ type: String })
  presets?: string

  @state() private _isOpen = false
  @state() private _internalValue?: string
  @state() private _presetsParsed: DatePickerPreset[] = []
  @state() private _activePreset: DatePickerPreset | null = null
  @state() private _isPresetOpen = false
  /** Holds the preset that triggered an open-calendar flow for relative presets, until the user confirms a date. */
  @state() private _pendingPreset: DatePickerPreset | null = null

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
    // Parse presets string first so value matching below uses the latest parsed array
    if (changed.has('presets')) {
      try {
        const parsed = this.presets ? JSON.parse(this.presets) : []
        this._presetsParsed = Array.isArray(parsed) ? parsed : []
        if (!Array.isArray(parsed)) {
          console.warn(
            '[lukso-input-date-picker] `presets` must be a JSON array'
          )
        }
      } catch {
        console.warn('[lukso-input-date-picker] Invalid JSON in `presets` prop')
        this._presetsParsed = []
      }
    }

    if (changed.has('value') || changed.has('presets')) {
      // When only `value` changed and the consumer echoed back the ISO we emitted,
      // keep the active preset — the round-trip should not reset preset state.
      // Skip this when `presets` also changed so stale presets are always re-evaluated.
      if (
        !changed.has('presets') &&
        this._activePreset &&
        this.value === this._internalValue
      )
        return

      // String sentinels match directly. Object presets match by parsing the
      // stored value as JSON and comparing amount/unit fields, so that
      // key-insertion order in persisted JSON does not cause mismatches.
      const parsedValue = this.value?.startsWith('{')
        ? (() => {
            try {
              return JSON.parse(this.value)
            } catch {
              return null
            }
          })()
        : null
      const matchedPreset = this._presetsParsed.find(preset => {
        if (typeof preset.time === 'string') return preset.time === this.value
        if (
          parsedValue !== null &&
          typeof parsedValue === 'object' &&
          typeof parsedValue.amount === 'number' &&
          typeof parsedValue.unit === 'string'
        ) {
          return this._presetTimesMatch(
            preset.time,
            parsedValue as DatePickerPresetTime
          )
        }
        return false
      })
      if (matchedPreset) {
        this._activePreset = matchedPreset
        // 'pick' has no computed date — keep whatever the calendar last set
        this._internalValue =
          matchedPreset.time !== 'pick'
            ? this._resolvePresetTime(matchedPreset.time)
            : this._internalValue
      } else {
        this._activePreset = null
        this._internalValue = this.value
      }
    }
  }

  // ─── Computed helpers ───────────────────────────────────────────────────────

  /**
   * Compares two preset time values for structural equality.
   * For object presets, compares amount and unit rather than stringified form
   * so that key-insertion order in persisted JSON does not cause mismatches.
   */
  private _presetTimesMatch(
    a: DatePickerPresetTime,
    b: DatePickerPresetTime
  ): boolean {
    if (typeof a === 'string' || typeof b === 'string') return a === b
    return a.amount === b.amount && a.unit === b.unit
  }

  /**
   * Converts a preset time value into an ISO 8601 local-time string.
   * Uses local time (not UTC) to match lukso-date-picker's internal _buildIsoValue().
   */
  private _resolvePresetTime(time: DatePickerPresetTime): string {
    const now = new Date()
    const toLocalISO = (date: Date): string => {
      const pad = (number: number) => String(number).padStart(2, '0')
      return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`
    }

    if (time === 'now') return toLocalISO(now)
    if (time === 'forever') return ''
    if (time === 'pick') return this._internalValue ?? ''

    const date = new Date(now)
    const { amount, unit } = time

    switch (unit) {
      case 'minute':
        date.setMinutes(date.getMinutes() + amount)
        break
      case 'hour':
        date.setHours(date.getHours() + amount)
        break
      case 'day':
        date.setDate(date.getDate() + amount)
        break
      case 'week':
        date.setDate(date.getDate() + amount * 7)
        break
      case 'month':
        date.setMonth(date.getMonth() + amount)
        break
      case 'year':
        date.setFullYear(date.getFullYear() + amount)
        break
      default:
        console.warn(
          `[lukso-input-date-picker] Unknown preset unit "${(time as { unit: string }).unit}" — returning current time`
        )
        return toLocalISO(now)
    }

    return toLocalISO(date)
  }

  private _formatDisplayValue(): string {
    // Non-pick preset: show the label instead of the formatted date
    if (this._activePreset && this._activePreset.time !== 'pick') {
      return this._activePreset.label
    }

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
        hour12 = new Intl.DateTimeFormat(this.locale, {
          hour: 'numeric',
        }).resolvedOptions().hour12
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

  private _stopDropdownChange(event: Event) {
    event.stopPropagation()
  }

  private _handleOutsideClick(event: Event) {
    if (!event.composedPath().includes(this)) {
      this._isOpen = false
      this._isPresetOpen = false
      this._pendingPreset = null
    }
  }

  private _handleInputClick() {
    if (this.isDisabled || this.isReadonly) return
    if (this._presetsParsed.length > 0) {
      this._isPresetOpen = !this._isPresetOpen
      this._isOpen = false
    } else {
      this._isOpen = !this._isOpen
    }
  }

  /**
   * Handles preset selection from the dropdown.
   *
   * - `now` / `forever`: emit immediately without opening the calendar.
   * - `pick`: open blank calendar (existing behaviour).
   * - Relative object presets: open the calendar pre-navigated to the resolved
   *   date so the user can adjust before confirming. The preset is stored in
   *   `_pendingPreset` and adopted into `_activePreset` only once the user
   *   picks a date from the calendar.
   */
  private _handlePresetSelect(preset: DatePickerPreset, event: Event) {
    this._isPresetOpen = false

    if (preset.time === 'now' || preset.time === 'forever') {
      this._activePreset = preset
      const resolvedDate = this._resolvePresetTime(preset.time)
      this._internalValue = resolvedDate
      this.dispatchEvent(
        new CustomEvent<LuksoInputDatePickerOnChangeEventDetail>('on-change', {
          detail: { value: resolvedDate, preset: preset.time, event },
          bubbles: true,
          composed: true,
        })
      )
      return
    }

    if (preset.time === 'pick') {
      this._activePreset = preset
      this._pendingPreset = null
      this._isOpen = true
      return
    }

    // Relative object preset — open calendar pre-navigated to the resolved date.
    // _activePreset is intentionally left unset until the user confirms.
    this._pendingPreset = preset
    this._activePreset = null
    this._internalValue = this._resolvePresetTime(preset.time)
    this._isOpen = true
  }

  /**
   * Handles date selection from the calendar.
   *
   * When a `_pendingPreset` exists (i.e. the calendar was opened via a relative
   * preset), it is adopted into `_activePreset` on close so the round-trip guard
   * in `willUpdate` keeps the preset state stable.
   */
  private _handleDatePickerChange(e: CustomEvent) {
    this._internalValue = e.detail.value as string
    const shouldClose =
      !this.showTime ||
      (e.detail.event instanceof MouseEvent && e.detail.event.type === 'click')
    if (shouldClose) {
      this._isOpen = false
      if (this._pendingPreset) {
        this._activePreset = this._pendingPreset
        this._pendingPreset = null
      }
    }
    this.dispatchEvent(
      new CustomEvent<LuksoInputDatePickerOnChangeEventDetail>('on-change', {
        detail: {
          value: this._internalValue,
          preset: (this._pendingPreset ?? this._activePreset)?.time,
          event: e.detail.event,
        },
        bubbles: true,
        composed: true,
      })
    )
  }

  // ─── Render helpers ─────────────────────────────────────────────────────────

  private _renderStandardTrigger(
    displayValue: string,
    inputClass: string,
    iconClass: string
  ) {
    return html`
      <div class="flex relative items-center w-full">
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
              ? html`<span class="text-neutral-70">${this.placeholder}</span>`
              : nothing}
        </div>
        <lukso-icon
          name="arrow-down-sm"
          class=${iconClass}
          @click=${this._handleInputClick}
        ></lukso-icon>
      </div>

      <!-- Date picker dropdown: always in DOM to preserve internal date state -->
      <lukso-dropdown
        ?is-open=${this._isOpen}
        @on-change=${this._stopDropdownChange}
        is-open-on-outside-click
        ?open-top=${this.openTop}
        ?is-right=${this.openRight}
        ?is-full-width=${this.isFullWidth}
        size="large"
        custom-class="min-w-[300px] min-h-[390px]"
        max-height="500"
      >
        <lukso-date-picker
          value=${this._internalValue ?? nothing}
          min=${this.min ?? nothing}
          max=${this.max ?? nothing}
          locale=${this.locale}
          size="large"
          ?show-time=${this.showTime}
          ?show-summary=${this.showTime}
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
  }

  private _renderPresetTrigger(
    displayValue: string,
    inputClass: string,
    iconClass: string
  ) {
    return html`
      <div class="flex relative items-center w-full">
        <div
          id=${this._inputId}
          class=${inputClass}
          @click=${this._handleInputClick}
          aria-haspopup="listbox"
          aria-expanded=${this._isPresetOpen ? 'true' : 'false'}
          role="combobox"
        >
          ${displayValue
            ? displayValue
            : this.placeholder
              ? html`<span class="text-neutral-70">${this.placeholder}</span>`
              : nothing}
        </div>
        <lukso-icon
          name="arrow-down-sm"
          class=${iconClass}
          @click=${this._handleInputClick}
        ></lukso-icon>
      </div>

      <!-- Preset options list -->
      <lukso-dropdown
        ?is-open=${this._isPresetOpen}
        @on-change=${this._stopDropdownChange}
        is-open-on-outside-click
        ?open-top=${this.openTop}
        ?is-right=${this.openRight}
        ?is-full-width=${this.isFullWidth}
        size=${this.size}
      >
        ${this._presetsParsed.map(
          preset => html`
            <lukso-dropdown-option
              ?is-selected=${this._activePreset != null &&
              this._presetTimesMatch(this._activePreset.time, preset.time)}
              size=${this.size}
              ?is-disabled=${this.isDisabled}
              ?is-readonly=${this.isReadonly}
              @click=${(event: Event) =>
                this._handlePresetSelect(preset, event)}
            >
              ${preset.label}
            </lukso-dropdown-option>
          `
        )}
      </lukso-dropdown>

      <!-- Calendar: rendered for 'pick' preset or while a relative preset is pending user confirmation -->
      ${this._activePreset?.time === 'pick' || this._pendingPreset != null
        ? html`
            <lukso-dropdown
              ?is-open=${this._isOpen}
              @on-change=${this._stopDropdownChange}
              is-open-on-outside-click
              ?open-top=${this.openTop}
              ?is-right=${this.openRight}
              ?is-full-width=${this.isFullWidth}
              size="large"
              custom-class="min-w-[300px] min-h-[390px]"
              max-height="500"
            >
              <lukso-date-picker
                value=${this._internalValue ?? nothing}
                min=${this.min ?? nothing}
                max=${this.max ?? nothing}
                locale=${this.locale}
                size="large"
                ?show-time=${this.showTime}
                ?show-summary=${this.showTime}
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
    `
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
      isOpen:
        this._presetsParsed.length > 0 ? this._isPresetOpen : this._isOpen,
      size: this.size,
    })

    return html`
      <div class="relative w-[inherit]">
        <lukso-form-label label=${this.label ?? nothing}></lukso-form-label>
        <lukso-form-description
          description=${this.description ?? nothing}
        ></lukso-form-description>

        <div class=${wrapperClass}>
          ${this._presetsParsed.length > 0
            ? this._renderPresetTrigger(displayValue, inputClass, iconClass)
            : this._renderStandardTrigger(displayValue, inputClass, iconClass)}
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
