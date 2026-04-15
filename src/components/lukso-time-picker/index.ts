import { html, nothing } from 'lit'
import { property, state } from 'lit/decorators.js'
import { tv } from 'tailwind-variants'

import { safeCustomElement } from '@/shared/safe-custom-element'
import '@/components/lukso-icon'
import '@/components/lukso-input'
import '@/components/lukso-sanitize'
import '@/components/lukso-form-label'
import '@/components/lukso-form-description'
import '@/components/lukso-form-error'
import '@/components/lukso-dropdown'
import '@/components/lukso-dropdown-option'
import { TailwindStyledElement } from '@/shared/tailwind-element'
import style from './style.css?inline'
import * as TimePickerRules from './rules'

import type { DatePickerTimeFormat, InputSize } from '@/shared/types'

/**
 * A standalone time picker component (HH:MM with optional AM/PM).
 *
 * When `is-standalone=true` (default) it renders a card with optional
 * label/description/error form fields.
 *
 * When `is-standalone=false` it renders only the time controls (bare row),
 * suitable for embedding inside `lukso-date-picker`.
 *
 * Emits `on-change` with `detail: { value: "HH:MM", event }`.
 */
@safeCustomElement('lukso-time-picker')
export class LuksoTimePicker extends TailwindStyledElement(style) {
  /** Current time value in "HH:MM" 24-hour format. */
  @property({ type: String })
  value?: string

  /** BCP-47 locale tag. Defaults to the device locale. */
  @property({ type: String })
  locale: string =
    typeof navigator !== 'undefined' ? navigator.language : 'en-US'

  /** Time display format. "auto" detects the device preference via Intl. */
  @property({ type: String, attribute: 'time-format' })
  timeFormat: DatePickerTimeFormat = 'auto'

  /** Component width — only relevant when is-standalone=true. */
  @property({ type: String })
  size: InputSize = 'medium'

  /**
   * When true (default) renders a card wrapper and form label/description/error.
   * Set to false when embedding inside another component.
   */
  @property({ type: Boolean, attribute: 'is-standalone' })
  isStandalone = true

  /** Optional label shown above the card (standalone only). */
  @property({ type: String })
  label?: string

  /** Optional description shown below the label (standalone only). */
  @property({ type: String })
  description?: string

  /** Optional error message shown below the card (standalone only). */
  @property({ type: String })
  error?: string

  /** Disables all interaction. */
  @property({ type: Boolean, attribute: 'is-disabled' })
  isDisabled = false

  @state() private _selectedHour: number = new Date().getHours()
  @state() private _selectedMinute: number = new Date().getMinutes()
  @state() private _showAmPmPicker = false

  // ─── Styles ────────────────────────────────────────────────────────────────

  private styles = tv({
    slots: {
      outer: 'flex flex-col',
      card: 'flex items-center bg-neutral-100 rounded-12 shadow-drop-shadow-small w-full',
      timeRow: 'flex items-center gap-2',
      timeSeparator: 'text-paragraph-sm text-neutral-40',
      ampmWrapper: 'relative',
      ampmBtn:
        'w-9 text-center text-paragraph-xxs-bold text-neutral-20 border border-neutral-85 rounded-4 px-1.5 py-0.5 hover:bg-neutral-95 cursor-pointer transition-colors',
    },
    variants: {
      size: {
        small: { outer: 'w-[240px]' },
        medium: { outer: 'w-[300px]' },
        large: { outer: 'w-[360px]' },
        'x-large': { outer: 'w-[420px]' },
        full: { outer: 'w-full' },
      },
      isDisabled: {
        true: { outer: 'opacity-50 pointer-events-none' },
      },
    },
  })

  // ─── Lifecycle ─────────────────────────────────────────────────────────────

  override willUpdate(changed: Map<string | number | symbol, unknown>) {
    if (changed.has('value') && this.value) {
      const [hStr, mStr] = this.value.split(':')
      const h = parseInt(hStr, 10)
      const m = parseInt(mStr, 10)
      if (!isNaN(h) && !isNaN(m)) {
        this._selectedHour = Math.max(0, Math.min(23, h))
        this._selectedMinute = Math.max(0, Math.min(59, m))
      }
    }
  }

  // ─── Computed helpers ───────────────────────────────────────────────────────

  private get _uses24Hour(): boolean {
    if (this.timeFormat === '24h') return true
    if (this.timeFormat === '12h') return false
    try {
      const resolved = new Intl.DateTimeFormat(this.locale, {
        hour: 'numeric',
      }).resolvedOptions()
      return resolved.hour12 === false
    } catch {
      return true
    }
  }

  private get _displayHour(): string {
    if (this._uses24Hour) return String(this._selectedHour).padStart(2, '0')
    const h = this._selectedHour % 12
    return String(h === 0 ? 12 : h)
  }

  private get _displayMinute(): string {
    return String(this._selectedMinute).padStart(2, '0')
  }

  private get _amPmLabel(): string {
    return this._selectedHour < 12 ? 'AM' : 'PM'
  }

  private _buildTimeValue(): string {
    return `${String(this._selectedHour).padStart(2, '0')}:${String(this._selectedMinute).padStart(2, '0')}`
  }

  // ─── Event handlers ─────────────────────────────────────────────────────────

  private _handleHourChange(event: Event) {
    const { value: rawStringValue, event: innerEvent } = (
      event as CustomEvent<{ value: string; event: Event }>
    ).detail
    const rule = this._uses24Hour
      ? TimePickerRules.RULES_MAP.isHour24
      : TimePickerRules.RULES_MAP.isHour12
    const sanitized = rule.sanitize(rawStringValue)
    const rawValue = parseInt(sanitized, 10)
    if (isNaN(rawValue) || (!this._uses24Hour && rawValue === 0)) return
    if (this._uses24Hour) {
      this._selectedHour = rawValue
    } else {
      const isPm = this._selectedHour >= 12
      this._selectedHour = isPm
        ? rawValue === 12
          ? 12
          : rawValue + 12
        : rawValue === 12
          ? 0
          : rawValue
    }
    this._emitChange(innerEvent)
  }

  private _handleMinuteChange(event: Event) {
    const { value: rawStringValue, event: innerEvent } = (
      event as CustomEvent<{ value: string; event: Event }>
    ).detail
    const sanitized =
      TimePickerRules.RULES_MAP.isMinute.sanitize(rawStringValue)
    const rawValue = parseInt(sanitized, 10)
    if (isNaN(rawValue)) return
    this._selectedMinute = rawValue
    this._emitChange(innerEvent)
  }

  private _toggleAmPmPicker(e: Event) {
    e.stopPropagation()
    this._showAmPmPicker = !this._showAmPmPicker
  }

  private _selectAmPm(period: 'AM' | 'PM', e: Event) {
    e.stopPropagation()
    const isCurrentlyAm = this._selectedHour < 12
    const wantAm = period === 'AM'
    if (isCurrentlyAm !== wantAm) {
      this._selectedHour = wantAm
        ? this._selectedHour - 12
        : this._selectedHour + 12
    }
    this._showAmPmPicker = false
    this._emitChange(e)
  }

  private _emitChange(event: Event) {
    this.dispatchEvent(
      new CustomEvent('on-change', {
        detail: { value: this._buildTimeValue(), event },
        bubbles: true,
        composed: true,
      })
    )
  }

  // ─── Render ─────────────────────────────────────────────────────────────────

  private _renderTimeRow(
    timeRow: () => string,
    timeSeparator: () => string,
    ampmWrapper: () => string,
    ampmBtn: () => string
  ) {
    return html`
      <div class=${timeRow()}>
        <div class="w-8">
          <lukso-input
            type="text"
            size="medium"
            ?borderless=${true}
            .rules=${['onlyNumbersAndDot', 'noDecimal']}
            ?is-full-width=${true}
            custom-class="text-center text-neutral-20 !px-1"
            .value=${this._displayHour}
            aria-label="Hours"
            @on-input=${this._handleHourChange}
          ></lukso-input>
        </div>
        <span class=${timeSeparator()}>:</span>
        <div class="w-8">
          <lukso-input
            type="text"
            size="medium"
            ?borderless=${true}
            .rules=${['onlyNumbersAndDot', 'noDecimal']}
            ?is-full-width=${true}
            custom-class="text-center text-neutral-20 !px-1"
            .value=${this._displayMinute}
            aria-label="Minutes"
            @on-input=${this._handleMinuteChange}
          ></lukso-input>
        </div>
        ${!this._uses24Hour
          ? html`
              <div
                class=${ampmWrapper()}
                @click=${(e: Event) => e.stopPropagation()}
              >
                <button
                  class=${ampmBtn()}
                  @click=${this._toggleAmPmPicker}
                  aria-haspopup="listbox"
                  aria-expanded=${this._showAmPmPicker ? 'true' : 'false'}
                >
                  ${this._amPmLabel}
                </button>
                <lukso-dropdown
                  ?is-open=${this._showAmPmPicker}
                  open-top
                  is-right
                  size="small"
                >
                  <lukso-dropdown-option
                    size="small"
                    ?is-selected=${this._amPmLabel === 'AM'}
                    @click=${(e: Event) => this._selectAmPm('AM', e)}
                    >AM</lukso-dropdown-option
                  >
                  <lukso-dropdown-option
                    size="small"
                    ?is-selected=${this._amPmLabel === 'PM'}
                    @click=${(e: Event) => this._selectAmPm('PM', e)}
                    >PM</lukso-dropdown-option
                  >
                </lukso-dropdown>
              </div>
            `
          : nothing}
      </div>
    `
  }

  override render() {
    const { outer, card, timeRow, timeSeparator, ampmWrapper, ampmBtn } =
      this.styles({
        size: this.size,
        isDisabled: this.isDisabled,
      })

    const controls = this._renderTimeRow(
      timeRow,
      timeSeparator,
      ampmWrapper,
      ampmBtn
    )

    if (!this.isStandalone) {
      // Bare mode: just the time row, no card, no form fields
      return controls
    }

    // Standalone mode: card + optional form fields
    return html`
      <div
        class=${outer()}
        @click=${() => {
          this._showAmPmPicker = false
        }}
      >
        <lukso-form-label label=${this.label ?? nothing}></lukso-form-label>
        <lukso-form-description
          description=${this.description ?? nothing}
        ></lukso-form-description>
        <div class=${card()}>${controls}</div>
        <lukso-form-error error=${this.error ?? nothing}></lukso-form-error>
      </div>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'lukso-time-picker': LuksoTimePicker
  }
}
