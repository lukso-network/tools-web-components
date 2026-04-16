// src/components/lukso-timeline/index.ts
import { html } from 'lit'
import { property } from 'lit/decorators.js'
import { styleMap } from 'lit-html/directives/style-map.js'

import { safeCustomElement } from '@/shared/safe-custom-element'
import '@/components/lukso-icon'
import { TailwindStyledElement } from '@/shared/tailwind-element'
import style from './style.css?inline'

type TimelineState = 'before-start' | 'in-range' | 'after-end'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const GREY_STYLE = { backgroundColor: '#cddae4' }
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const GREEN_STYLE = { backgroundColor: '#47cd68' }
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const STRIPED_STYLE = {
  backgroundImage:
    'repeating-linear-gradient(145deg, gray 0px, gray 5px, #ccc 5px, #ccc 10px, gray 10px)',
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const FOREVER_GREEN_PCT = 35

/**
 * Displays the temporal state of an event as a horizontal progress bar with date labels.
 */
@safeCustomElement('lukso-timeline')
export class LuksoTimeline extends TailwindStyledElement(style) {
  @property({ type: String, attribute: 'start-date' })
  startDate = ''

  @property({ type: String, attribute: 'end-date' })
  endDate = ''

  @property({ type: String })
  locale = 'en-US'

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
    const month = new Intl.DateTimeFormat(this.locale, {
      month: 'short',
    }).format(date)
    return `${day}${this._ordinal(day)} ${month} ${date.getFullYear()}`
  }

  private _formatTime(date: Date): string {
    return new Intl.DateTimeFormat(this.locale, {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    })
      .format(date)
      .toLowerCase()
      .replace(/[\s\u202f]/g, '')
  }

  private _relativeTime(date: Date): string {
    const diffMs = date.getTime() - Date.now()
    const abs = Math.abs(diffMs)
    const fmt = new Intl.RelativeTimeFormat(this.locale, { numeric: 'auto' })
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
    rightStyle: Record<string, string>
  ) {
    return html`
      <div class="flex items-center w-full gap-1">
        <div class="w-2 h-2 rounded-full bg-neutral-85 shrink-0"></div>
        <div class="flex flex-1 h-2 rounded-full overflow-hidden">
          <div
            style=${styleMap({ width: `${leftPercent}%`, ...leftStyle })}
          ></div>
          <div style=${styleMap({ flexGrow: '1', ...rightStyle })}></div>
        </div>
        <div class="w-2 h-2 rounded-full bg-neutral-85 shrink-0"></div>
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
      <div class="flex flex-col ${cls}">
        <span class="text-sm font-semibold text-neutral-20"
          >${this._formatDate(date)}</span
        >
        <span class="text-sm text-neutral-20">${this._formatTime(date)}</span>
        <span class="text-xs text-neutral-60">${this._relativeTime(date)}</span>
      </div>
    `
  }

  render() {
    return html`<div class="flex w-full"></div>`
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'lukso-timeline': LuksoTimeline
  }
}
