// src/components/lukso-timeline/index.ts
import { html } from 'lit'
import { property } from 'lit/decorators.js'
import { styleMap } from 'lit-html/directives/style-map.js'
import { withIntlService } from '@lukso/core/mixins/intl'

import { safeCustomElement } from '@/shared/safe-custom-element'
import '@/components/lukso-icon'
import { TailwindStyledElement } from '@/shared/tailwind-element'
import style from './style.css?inline'

type TimelineState = 'before-start' | 'in-range' | 'after-end'

const GREY_STYLE = { backgroundColor: '#cddae4' }
const GREEN_STYLE = { backgroundColor: '#47cd68' }
const STRIPED_STYLE = {
  backgroundImage:
    'repeating-linear-gradient(145deg, gray 0px, gray 5px, #ccc 5px, #ccc 10px, gray 10px)',
}
const FOREVER_GREEN_PCT = 35

/**
 * Displays the temporal state of an event as a horizontal progress bar with date labels.
 */
@safeCustomElement('lukso-timeline')
export class LuksoTimeline extends withIntlService(
  TailwindStyledElement(style)
) {
  @property({ type: Date, attribute: 'start-date' })
  startDate = ''

  @property({ type: Date, attribute: 'end-date' })
  endDate = ''

  private get _intl() {
    return this.setupLocalIntl()
  }

  // ── Computed state ──────────────────────────────────────────────────────

  private get _state(): TimelineState {
    if (!this.startDate) return 'before-start'
    const now = Date.now()
    const start = new Date(this.startDate).getTime()
    if (isNaN(start) || now < start) return 'before-start'
    if (!this.endDate) return 'in-range'
    const end = new Date(this.endDate).getTime()
    if (!isNaN(end) && now > end) return 'after-end'
    return 'in-range'
  }

  private get _progressPercent(): number {
    if (!this.startDate || !this.endDate) return 0
    const now = Date.now()
    const start = new Date(this.startDate).getTime()
    const end = new Date(this.endDate).getTime()
    if (isNaN(start) || isNaN(end) || end <= start) return 0
    if (now <= start) return 0
    if (now >= end) return 100
    return ((now - start) / (end - start)) * 100
  }

  // ── Formatting helpers ──────────────────────────────────────────────────

  private _ordinal(n: number): string {
    if (n >= 11 && n <= 13) return 'th'
    switch (n % 10) {
      case 1:
        return 'st'
      case 2:
        return 'nd'
      case 3:
        return 'rd'
      default:
        return 'th'
    }
  }

  private _formatDate(date: Date): string {
    const day = date.getDate()
    const month =
      this._intl?.formatTimestamp(date.getTime(), { month: 'short' }) ?? ''
    return `${day}${this._ordinal(day)} ${month} ${date.getFullYear()}`
  }

  private _formatTime(date: Date): string {
    return (
      this._intl?.formatTimestamp(date.getTime(), {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      }) ?? ''
    )
      .toLowerCase()
      .replace(/[\s\u202f]/g, '')
  }

  private _relativeTime(date: Date): string {
    const diffMs = date.getTime() - Date.now()
    const abs = Math.abs(diffMs)
    const fmt = new Intl.RelativeTimeFormat(
      this._intl?.getLocale() ?? 'en-US',
      { numeric: 'auto' }
    )
    if (abs < 60_000) return fmt.format(Math.round(diffMs / 1_000), 'second')
    if (abs < 3_600_000)
      return fmt.format(Math.round(diffMs / 60_000), 'minute')
    if (abs < 86_400_000)
      return fmt.format(Math.round(diffMs / 3_600_000), 'hour')
    return fmt.format(Math.round(diffMs / 86_400_000), 'day')
  }

  // ── Sub-templates ───────────────────────────────────────────────────────

  /**
   * Renders the horizontal bar with endpoint dots and two colour segments.
   *
   * @param leftPercent - width of the left (coloured) segment, 0–100
   * @param leftStyle   - CSSStyleDeclaration-style object for the left segment
   * @param rightStyle  - CSSStyleDeclaration-style object for the right segment
   */
  private _barTemplate(
    leftPercent: number,
    leftStyle: Record<string, string>,
    rightStyle: Record<string, string>,
    isForever: boolean = false
  ) {
    const rightInset = isForever ? 'right-1/20' : ''
    return html`
      <div class="relative flex items-center w-full" style="height: 2.5rem">
        <!-- Track line full-width -->
        <div
          class="absolute inset-x-0 top-1/2 -translate-y-1/2 h-px bg-neutral-85"
        ></div>

        <!-- Left endpoint dot -->
        <div
          class="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-neutral-85 z-10"
        ></div>

        <!-- Progress bar, inset 10% -->
        <div
          class="absolute inset-x-[10%] ${rightInset} top-1/3 flex h-2 overflow-hidden z-10"
        >
          <div
            style=${styleMap({ width: `${leftPercent}%`, ...leftStyle })}
          ></div>
          <div style=${styleMap({ flexGrow: '1', ...rightStyle })}></div>
        </div>

        <!-- Vertical tick left (start date) -->
        <div
          class="absolute left-[10%] top-1/2 w-px h-10 bg-neutral-85 z-10"
        ></div>

        <!-- Vertical tick right(end date) -->
        ${!isForever
          ? html`<div
              class="absolute right-[10%] top-1/2 w-px h-10 bg-neutral-85 z-10"
            ></div>`
          : ''}

        <!-- Arrow right (replaces the right dot) -->
        <div
          class="absolute -right-2 top-1/2 -translate-y-1/2 z-10 flex items-center"
        >
          <lukso-icon name="arrow-right-sm" size="small"></lukso-icon>
        </div>
      </div>
    `
  }

  /**
   * Renders a date's label block: formatted date, time, and relative time.
   *
   * @param date  - the Date to format
   * @param align - 'start' (left-aligned) or 'end' (right-aligned)
   */
  private _dateLabelTemplate(date: Date, align: 'start' | 'end') {
    const cls = align === 'end' ? 'items-end text-right' : 'items-start'
    return html`
      <div class="flex flex-col ${cls} left-[12%] right-[12%] absolute ">
        <span class="text-sm font-semibold text-neutral-50"
          >${this._formatDate(date)}</span
        >
        <span class="text-sm text-neutral-50">${this._formatTime(date)}</span>
        <span class="text-xs text-neutral-70">${this._relativeTime(date)}</span>
      </div>
    `
  }

  // ── Main templates ──────────────────────────────────────────────────────

  private endDateTemplate() {
    if (!this.startDate || !this.endDate) return html``
    const start = new Date(this.startDate)
    const end = new Date(this.endDate)
    if (isNaN(start.getTime()) || isNaN(end.getTime())) return html``
    const pct = this._progressPercent

    const bar =
      this._state === 'before-start'
        ? this._barTemplate(0, GREY_STYLE, GREY_STYLE)
        : this._state === 'in-range'
          ? this._barTemplate(pct, GREEN_STYLE, GREY_STYLE)
          : this._barTemplate(100, GREEN_STYLE, GREEN_STYLE)

    return html`
      <div class="flex flex-col w-full">
        ${bar}
        <div class="flex items-start w-full">
          ${this._dateLabelTemplate(start, 'start')}
          <div class="flex-1 flex justify-center pt-1">
            <lukso-icon name="arrow-right-sm" size="small"></lukso-icon>
          </div>
          ${this._dateLabelTemplate(end, 'end')}
        </div>
      </div>
    `
  }

  private foreverTemplate() {
    if (!this.startDate) return html``
    const start = new Date(this.startDate)
    if (isNaN(start.getTime())) return html``

    const bar =
      this._state === 'before-start'
        ? this._barTemplate(
            0,
            STRIPED_STYLE,
            STRIPED_STYLE,
            this.endDate === ''
          )
        : this._barTemplate(
            FOREVER_GREEN_PCT,
            GREEN_STYLE,
            STRIPED_STYLE,
            this.endDate === ''
          )

    return html`
      <div class="flex flex-col w-full">
        ${bar}
        <div class="flex items-start w-full">
          ${this._dateLabelTemplate(start, 'start')}
          <div class="flex-1 flex justify-center pt-1">
            <lukso-icon name="arrow-right-sm" size="small"></lukso-icon>
          </div>
          <div class="flex flex-col items-end text-right">
            <span class="text-sm font-semibold text-neutral-20">Forever</span>
            <span class="text-sm text-neutral-20">-</span>
          </div>
        </div>
      </div>
    `
  }

  render() {
    return html`
      <div class="flex w-full">
        ${this.endDate ? this.endDateTemplate() : this.foreverTemplate()}
      </div>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'lukso-timeline': LuksoTimeline
  }
}
