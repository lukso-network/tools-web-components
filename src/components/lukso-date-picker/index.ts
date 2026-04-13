import { html, nothing } from 'lit'
import { property, state } from 'lit/decorators.js'
import { tv } from 'tailwind-variants'

import { safeCustomElement } from '@/shared/safe-custom-element'
import '@/components/lukso-icon'
import '@/components/lukso-sanitize'
import '@/components/lukso-form-label'
import '@/components/lukso-form-description'
import '@/components/lukso-form-error'
import '@/components/lukso-time-picker'
import { TailwindStyledElement } from '@/shared/tailwind-element'
import style from './style.css?inline'

import type {
  DatePickerDateFormat,
  DatePickerTimeFormat,
  DatePickerWeekStartDay,
  InputSize,
} from '@/shared/types'

type DayCell = {
  day: number | null
  date: Date | null
  isCurrentMonth: boolean
}

/**
 * An inline calendar + time picker component.
 * Emits `on-change` with `{ value: string, event }` where `value` is an ISO 8601 date-time string.
 */
@safeCustomElement('lukso-date-picker')
export class LuksoDatePicker extends TailwindStyledElement(style) {
  /** ISO 8601 date-time string, e.g. "2026-05-01T20:00" */
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

  /** Component width preset. */
  @property({ type: String })
  size: InputSize = 'large'

  /** Whether to show the summary footer (selected date label + optional time picker). */
  @property({ type: Boolean, attribute: 'show-summary' })
  showSummary = true

  /** Whether to show the time picker inside the summary footer. */
  @property({ type: Boolean, attribute: 'show-time' })
  showTime = true

  /** How to display the selected date label in the footer. */
  @property({ type: String, attribute: 'date-format' })
  dateFormat: DatePickerDateFormat = 'short'

  /** Time display format. "auto" detects the device preference via Intl. */
  @property({ type: String, attribute: 'time-format' })
  timeFormat: DatePickerTimeFormat = 'auto'

  /** First day of the week in the calendar grid. */
  @property({ type: String, attribute: 'week-start-day' })
  weekStartDay: DatePickerWeekStartDay = 'monday'

  /** Optional label shown above the calendar. */
  @property({ type: String })
  label?: string

  /** Optional description shown below the label. */
  @property({ type: String })
  description?: string

  /** Optional error message shown below the calendar. */
  @property({ type: String })
  error?: string

  /** CSS color value for the selected day background (e.g. "#3b82f6"). Defaults to black. */
  @property({ type: String, attribute: 'selected-bg-color' })
  selectedBgColor?: string

  /** CSS color value for the selected day text (e.g. "#ffffff"). Defaults to white. */
  @property({ type: String, attribute: 'selected-text-color' })
  selectedTextColor?: string

  /** Disables all interaction. */
  @property({ type: Boolean, attribute: 'is-disabled' })
  isDisabled = false

  /** Whether the component should take the full width of its container. */
  @property({ type: Boolean, attribute: 'is-full-width' })
  isFullWidth = false

  @state() private _viewYear: number = new Date().getFullYear()
  @state() private _viewMonth: number = new Date().getMonth()
  @state() private _selectedDate: Date | null = null
  @state() private _selectedHour: number = new Date().getHours()
  @state() private _selectedMinute: number = new Date().getMinutes()

  // ─── Styles ────────────────────────────────────────────────────────────────

  private styles = tv({
    slots: {
      outer: 'flex flex-col',
      wrapper:
        'flex flex-col w-full bg-neutral-100 rounded-12 shadow-drop-shadow-small overflow-hidden select-none',
      header: 'flex items-center justify-between px-4 py-3',
      monthLabel: 'text-paragraph-sm-bold text-neutral-20 capitalize',
      navBtn:
        'flex items-center justify-center w-8 h-8 rounded-full hover:bg-neutral-95 transition-colors cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed',
      dayHeaderRow: 'grid grid-cols-7 px-2 pb-1',
      dayHeaderCell:
        'flex items-center justify-center h-8 text-paragraph-xxs text-neutral-40',
      calendarGrid: 'grid grid-cols-7 px-2 pb-2 justify-items-center',
      divider: 'h-px bg-neutral-90 mx-4',
      // Row: reserve space for time picker (max-w on label); min-w avoids flex collapse to ~0.
      timeSection:
        'flex flex-row flex-nowrap items-center justify-between gap-3 px-4 py-3 w-full min-w-0',
      dateLabel:
        'flex flex-1 flex-col overflow-hidden min-w-[8rem] max-w-[calc(100%-9.5rem)]',
      dateLabelWeekday:
        'min-w-0 text-paragraph-xxs text-neutral-40 uppercase tracking-wider truncate',
      dateLabelDate: 'min-w-0 text-paragraph-xs-bold text-neutral-20 truncate',
      timeRowWrap: 'shrink-0',
    },
    variants: {
      size: {
        small: { outer: 'w-[200px]' },
        medium: { outer: 'w-[250px]' },
        large: { outer: 'w-[300px]' },
        'x-large': { outer: 'w-[420px]' },
      },
      isDisabled: {
        true: { outer: 'opacity-50 pointer-events-none' },
      },
      isFullWidth: {
        true: { outer: 'w-full' },
      },
    },
  })

  private dayCellStyles = tv({
    base: 'relative flex items-center justify-center h-9 w-9 rounded-full text-paragraph-sm transition-colors',
    variants: {
      isSelected: {
        true: 'bg-neutral-20 text-neutral-100',
        false: '',
      },
      isToday: {
        true: '',
        false: '',
      },
      isOutOfRange: {
        true: 'opacity-30 cursor-not-allowed pointer-events-none',
        false: 'cursor-pointer hover:bg-neutral-95',
      },
      isEmpty: {
        true: 'pointer-events-none',
        false: '',
      },
    },
    compoundVariants: [
      {
        isSelected: false,
        isToday: true,
        isOutOfRange: false,
        class: 'ring-1 ring-neutral-20 ring-inset',
      },
    ],
  })

  // ─── Lifecycle ─────────────────────────────────────────────────────────────

  override willUpdate(changed: Map<string | number | symbol, unknown>) {
    if (changed.has('value')) {
      if (this.value) {
        const d = new Date(this.value)
        if (!isNaN(d.getTime())) {
          this._selectedDate = d
          this._viewYear = d.getFullYear()
          this._viewMonth = d.getMonth()
          this._selectedHour = d.getHours()
          this._selectedMinute = d.getMinutes()
        }
      } else {
        this._selectedDate = null
      }
    }
  }

  // ─── Computed helpers ───────────────────────────────────────────────────────

  private get _monthYearLabel(): string {
    try {
      return new Intl.DateTimeFormat(this.locale, {
        month: 'long',
        year: 'numeric',
      }).format(new Date(this._viewYear, this._viewMonth))
    } catch {
      return `${this._viewMonth + 1}/${this._viewYear}`
    }
  }

  private get _dayNames(): string[] {
    const names: string[] = []
    const monday = new Date(2025, 0, 6)
    const format = new Intl.DateTimeFormat(this.locale, { weekday: 'narrow' })
    for (let i = 0; i < 7; i++) {
      const d = new Date(monday)
      d.setDate(monday.getDate() + i)
      names.push(format.format(d))
    }
    if (this.weekStartDay === 'sunday') {
      const sun = names.pop()!
      names.unshift(sun)
    }
    return names
  }

  private _getDayGrid(): DayCell[] {
    const firstDay = new Date(this._viewYear, this._viewMonth, 1)
    const lastDay = new Date(this._viewYear, this._viewMonth + 1, 0)

    let startOffset = firstDay.getDay()
    if (this.weekStartDay === 'monday') {
      startOffset = (startOffset + 6) % 7
    }

    const grid: DayCell[] = []

    for (let i = 0; i < startOffset; i++) {
      grid.push({ day: null, date: null, isCurrentMonth: false })
    }
    for (let d = 1; d <= lastDay.getDate(); d++) {
      grid.push({
        day: d,
        date: new Date(this._viewYear, this._viewMonth, d),
        isCurrentMonth: true,
      })
    }
    while (grid.length % 7 !== 0) {
      grid.push({ day: null, date: null, isCurrentMonth: false })
    }

    return grid
  }

  private _isSelected(date: Date | null): boolean {
    if (!date || !this._selectedDate) return false
    return (
      date.getFullYear() === this._selectedDate.getFullYear() &&
      date.getMonth() === this._selectedDate.getMonth() &&
      date.getDate() === this._selectedDate.getDate()
    )
  }

  private _isToday(date: Date | null): boolean {
    if (!date) return false
    const today = new Date()
    return (
      date.getFullYear() === today.getFullYear() &&
      date.getMonth() === today.getMonth() &&
      date.getDate() === today.getDate()
    )
  }

  private _isOutOfRange(date: Date | null): boolean {
    if (!date) return false
    if (this.min) {
      const minDate = new Date(this.min)
      minDate.setHours(0, 0, 0, 0)
      if (date < minDate) return true
    }
    if (this.max) {
      const maxDate = new Date(this.max)
      maxDate.setHours(23, 59, 59, 999)
      if (date > maxDate) return true
    }
    return false
  }

  private _formattedDateLabel(): { weekday: string; date: string } | null {
    if (!this._selectedDate) return null
    try {
      const weekday = new Intl.DateTimeFormat(this.locale, {
        weekday: 'short',
      }).format(this._selectedDate)
      const dateOpts: Intl.DateTimeFormatOptions =
        this.dateFormat === 'long'
          ? { month: 'long', day: 'numeric', year: 'numeric' }
          : { month: 'short', day: 'numeric', year: 'numeric' }
      const date = new Intl.DateTimeFormat(this.locale, dateOpts).format(
        this._selectedDate
      )
      return { weekday: weekday.toUpperCase(), date }
    } catch {
      return null
    }
  }

  private get _timeValue(): string {
    return `${String(this._selectedHour).padStart(2, '0')}:${String(this._selectedMinute).padStart(2, '0')}`
  }

  private _buildIsoValue(): string {
    const d = this._selectedDate ?? new Date()
    const year = d.getFullYear()
    const month = String(d.getMonth() + 1).padStart(2, '0')
    const day = String(d.getDate()).padStart(2, '0')
    const hour = String(this._selectedHour).padStart(2, '0')
    const minute = String(this._selectedMinute).padStart(2, '0')
    return `${year}-${month}-${day}T${hour}:${minute}`
  }

  // ─── Event handlers ─────────────────────────────────────────────────────────

  private _prevMonth() {
    if (this._viewMonth === 0) {
      this._viewMonth = 11
      this._viewYear -= 1
    } else {
      this._viewMonth -= 1
    }
  }

  private _nextMonth() {
    if (this._viewMonth === 11) {
      this._viewMonth = 0
      this._viewYear += 1
    } else {
      this._viewMonth += 1
    }
  }

  private _selectDay(cell: DayCell, event: Event) {
    if (!cell.date || this._isOutOfRange(cell.date)) return
    this._selectedDate = cell.date
    this._emitChange(event)
  }

  private _handleTimeChange(e: CustomEvent) {
    // Stop the time-picker's on-change from composing out of this shadow root.
    // Without this, lukso-input-date-picker would receive the "HH:MM" event
    // in addition to the ISO string event re-emitted below.
    e.stopPropagation()
    const value = e.detail.value as string
    //[bug] Guard: lukso-input dispatches on-change (bubbles:false, composed:true) on blur,
    // which is retargeted to lukso-time-picker and reaches this listener with a raw
    // number string (no colon). Ignore anything that isn't "HH:MM".
    if (!value?.includes(':')) return
    const [hStr, mStr] = value.split(':')
    const h = parseInt(hStr, 10)
    const m = parseInt(mStr, 10)
    if (isNaN(h) || isNaN(m)) return
    this._selectedHour = h
    this._selectedMinute = m
    this._emitChange(e.detail.event)
  }

  private _emitChange(event: Event) {
    const value = this._buildIsoValue()
    this.dispatchEvent(
      new CustomEvent('on-change', {
        detail: { value, event },
        bubbles: true,
        composed: true,
      })
    )
  }

  // ─── Render ─────────────────────────────────────────────────────────────────

  override render() {
    const {
      outer,
      wrapper,
      header,
      monthLabel,
      navBtn,
      dayHeaderRow,
      dayHeaderCell,
      calendarGrid,
      divider,
      timeSection,
      dateLabel,
      dateLabelWeekday,
      dateLabelDate,
      timeRowWrap,
    } = this.styles({
      size: this.size,
      isDisabled: this.isDisabled,
      isFullWidth: this.isFullWidth,
    })

    const grid = this._getDayGrid()
    const labelInfo = this._formattedDateLabel()

    const selectedInlineStyle =
      this.selectedBgColor || this.selectedTextColor
        ? [
            this.selectedBgColor
              ? `background-color:${this.selectedBgColor}`
              : '',
            this.selectedTextColor ? `color:${this.selectedTextColor}` : '',
          ]
            .filter(Boolean)
            .join(';')
        : ''

    return html`
      <div class=${outer()}>
        <lukso-form-label label=${this.label ?? nothing}></lukso-form-label>
        <lukso-form-description
          description=${this.description ?? nothing}
        ></lukso-form-description>

        <div class=${wrapper()}>
          <!-- Calendar header -->
          <div class=${header()}>
            <button
              class=${navBtn()}
              @click=${this._prevMonth}
              aria-label="Previous month"
            >
              <lukso-icon name="arrow-left-sm" size="small"></lukso-icon>
            </button>
            <span class=${monthLabel()}>${this._monthYearLabel}</span>
            <button
              class=${navBtn()}
              @click=${this._nextMonth}
              aria-label="Next month"
            >
              <lukso-icon name="arrow-right-sm" size="small"></lukso-icon>
            </button>
          </div>

          <!-- Day-of-week headers -->
          <div class=${dayHeaderRow()}>
            ${this._dayNames.map(
              name => html`<div class=${dayHeaderCell()}>${name}</div>`
            )}
          </div>

          <!-- Calendar grid -->
          <div class=${calendarGrid()}>
            ${grid.map(cell => {
              const selected = this._isSelected(cell.date)
              const today = this._isToday(cell.date)
              const outOfRange = this._isOutOfRange(cell.date)
              const empty = cell.day === null

              return html`
                <button
                  class=${this.dayCellStyles({
                    isSelected: selected,
                    isToday: today,
                    isOutOfRange: outOfRange,
                    isEmpty: empty,
                  })}
                  style=${selected && selectedInlineStyle
                    ? selectedInlineStyle
                    : nothing}
                  ?disabled=${empty || outOfRange}
                  aria-label=${cell.date ? cell.date.toDateString() : nothing}
                  aria-pressed=${selected ? 'true' : 'false'}
                  @click=${(e: Event) => this._selectDay(cell, e)}
                >
                  ${cell.day !== null ? cell.day : nothing}
                </button>
              `
            })}
          </div>

          <!-- Summary footer -->
          ${this.showSummary
            ? html`
                <div class=${divider()}></div>
                <div class=${timeSection()}>
                  <div class=${dateLabel()}>
                    <span class=${dateLabelWeekday()}
                      >${labelInfo?.weekday ?? '—'}</span
                    >
                    <span class=${dateLabelDate()}
                      >${labelInfo?.date ?? ''}</span
                    >
                  </div>
                  ${this.showTime
                    ? html`
                        <div class=${timeRowWrap()}>
                          <lukso-time-picker
                            value=${this._timeValue}
                            locale=${this.locale}
                            time-format=${this.timeFormat}
                            ?is-standalone=${false}
                            ?is-disabled=${this.isDisabled}
                            @on-change=${this._handleTimeChange}
                            size="full"
                          ></lukso-time-picker>
                        </div>
                      `
                    : nothing}
                </div>
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
    'lukso-date-picker': LuksoDatePicker
  }
}
