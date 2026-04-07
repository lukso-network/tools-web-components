import { html, nothing } from 'lit'
import { property, state } from 'lit/decorators.js'
import { tv } from 'tailwind-variants'

import { safeCustomElement } from '@/shared/safe-custom-element'
import '@/components/lukso-icon'
import '@/components/lukso-sanitize'
import '@/components/lukso-form-label'
import '@/components/lukso-form-description'
import '@/components/lukso-form-error'
import { TailwindStyledElement } from '@/shared/tailwind-element'
import style from './style.css?inline'

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
  size: InputSize = 'large'

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
      card: 'flex items-center bg-neutral-100 rounded-12 shadow-drop-shadow-small px-4 py-3 w-full',
      timeRow: 'flex items-center gap-2',
      timeInput:
        'w-7 text-center text-paragraph-sm bg-transparent border-0 outline-none text-neutral-20 appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none',
      timeSeparator: 'text-paragraph-sm text-neutral-40',
      ampmContainer: 'relative',
      ampmBtn:
        'w-9 text-center text-paragraph-xxs-bold text-neutral-20 border border-neutral-85 rounded-4 px-1.5 py-0.5 hover:bg-neutral-95 cursor-pointer transition-colors',
      ampmPopover:
        'absolute bottom-full right-0 mb-1 bg-neutral-100 rounded-8 shadow-drop-shadow-small border border-neutral-90 overflow-hidden z-10 min-w-[2.5rem]',
      ampmOption:
        'flex items-center justify-center px-3 py-1.5 text-paragraph-xxs-bold cursor-pointer hover:bg-neutral-95 transition-colors w-full',
    },
    variants: {
      size: {
        small: { outer: 'w-[240px]' },
        medium: { outer: 'w-[300px]' },
        large: { outer: 'w-[360px]' },
        'x-large': { outer: 'w-[420px]' },
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
    return String(h === 0 ? 12 : h).padStart(2, '0')
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

  private _handleHourInput(event: Event) {
    const input = event.target as HTMLInputElement
    const raw = parseInt(input.value, 10)
    if (isNaN(raw)) return
    if (this._uses24Hour) {
      this._selectedHour = Math.max(0, Math.min(23, raw))
    } else {
      const h = Math.max(1, Math.min(12, raw))
      const isPm = this._selectedHour >= 12
      this._selectedHour = isPm ? (h === 12 ? 12 : h + 12) : h === 12 ? 0 : h
    }
    input.value = this._displayHour
    this._emitChange(event)
  }

  private _handleMinuteInput(event: Event) {
    const input = event.target as HTMLInputElement
    const raw = parseInt(input.value, 10)
    if (isNaN(raw)) return
    this._selectedMinute = Math.max(0, Math.min(59, raw))
    input.value = this._displayMinute
    this._emitChange(event)
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
    timeInput: () => string,
    timeSeparator: () => string,
    ampmContainer: () => string,
    ampmBtn: () => string,
    ampmPopover: () => string,
    ampmOption: () => string
  ) {
    return html`
      <div class=${timeRow()}>
        <lukso-icon name="clock" size="small" color="currentColor"></lukso-icon>
        <input
          class=${timeInput()}
          type="number"
          min=${this._uses24Hour ? '0' : '1'}
          max=${this._uses24Hour ? '23' : '12'}
          .value=${this._displayHour}
          @change=${this._handleHourInput}
          aria-label="Hours"
        />
        <span class=${timeSeparator()}>:</span>
        <input
          class=${timeInput()}
          type="number"
          min="0"
          max="59"
          .value=${this._displayMinute}
          @change=${this._handleMinuteInput}
          aria-label="Minutes"
        />
        ${!this._uses24Hour
          ? html`
              <div
                class=${ampmContainer()}
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
                ${this._showAmPmPicker
                  ? html`
                      <div
                        class=${ampmPopover()}
                        role="listbox"
                        aria-label="AM/PM"
                      >
                        <button
                          class=${ampmOption()}
                          role="option"
                          aria-selected=${this._amPmLabel === 'AM'
                            ? 'true'
                            : 'false'}
                          @click=${(e: Event) => this._selectAmPm('AM', e)}
                        >
                          AM
                        </button>
                        <button
                          class=${ampmOption()}
                          role="option"
                          aria-selected=${this._amPmLabel === 'PM'
                            ? 'true'
                            : 'false'}
                          @click=${(e: Event) => this._selectAmPm('PM', e)}
                        >
                          PM
                        </button>
                      </div>
                    `
                  : nothing}
              </div>
            `
          : nothing}
      </div>
    `
  }

  override render() {
    const {
      outer,
      card,
      timeRow,
      timeInput,
      timeSeparator,
      ampmContainer,
      ampmBtn,
      ampmPopover,
      ampmOption,
    } = this.styles({
      size: this.size,
      isDisabled: this.isDisabled,
    })

    const controls = this._renderTimeRow(
      timeRow,
      timeInput,
      timeSeparator,
      ampmContainer,
      ampmBtn,
      ampmPopover,
      ampmOption
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
