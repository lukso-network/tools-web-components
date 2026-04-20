// src/components/lukso-timeline/index.ts
import { html } from 'lit'
import { property } from 'lit/decorators.js'
import { styleMap } from 'lit/directives/style-map.js'
import { withIntlService } from '@lukso/core/mixins/intl'

import { safeCustomElement } from '@/shared/safe-custom-element'
import '@/components/lukso-icon'
import { TailwindStyledElement } from '@/shared/tailwind-element'
import style from './style.css?inline'

type TimelineState = 'before-start' | 'in-range' | 'after-end'

const GREY_STYLE = { backgroundColor: '#cddae4' }
const GREEN_STYLE = { backgroundColor: '#47cd68' }
const STRIPED_GREEN_STYLE = { color1: '#ccc', color2: '#cddae4' }
const STRIPED_STYLE = {
  backgroundImage: `repeating-linear-gradient(135deg, ${STRIPED_GREEN_STYLE.color1} 0px, ${STRIPED_GREEN_STYLE.color1} 5px, ${STRIPED_GREEN_STYLE.color2} 5px, ${STRIPED_GREEN_STYLE.color2} 10px, ${STRIPED_GREEN_STYLE.color2} 10px)`,
}
const FOREVER_GREEN_PCT = 35

/**
 * Displays the temporal state of an event as a horizontal progress bar with date labels.
 */
@safeCustomElement('lukso-timeline')
export class LuksoTimeline extends withIntlService(
  TailwindStyledElement(style)
) {
  @property({ type: String, attribute: 'start-date' })
  startDate = ''

  @property({ type: String, attribute: 'end-date' })
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

  private get _startIsNow(): boolean {
    if (!this.startDate) return false
    const start = new Date(this.startDate).getTime()
    return !isNaN(start) && Math.abs(Date.now() - start) < 60_000
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

  private _formatDate(date: Date): string {
    return (
      this._intl?.formatTimestamp(date.getTime(), {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      }) ?? ''
    )
  }

  private _formatTime(date: Date): string {
    return (
      this._intl?.formatTimestamp(date.getTime(), {
        hour: 'numeric',
        minute: '2-digit',
      }) ?? ''
    )
  }

  private _relativeTime(date: Date): string {
    const diffMs = date.getTime() - Date.now()
    const abs = Math.abs(diffMs)
    const opts = { numeric: 'auto' } as const
    if (abs < 60_000)
      return this._intl?.formatRelativeTime(0, 'second', opts) ?? ''
    if (abs < 3_600_000)
      return (
        this._intl?.formatRelativeTime(
          Math.round(diffMs / 60_000),
          'minute',
          opts
        ) ?? ''
      )
    if (abs < 86_400_000)
      return (
        this._intl?.formatRelativeTime(
          Math.round(diffMs / 3_600_000),
          'hour',
          opts
        ) ?? ''
      )
    return (
      this._intl?.formatRelativeTime(
        Math.round(diffMs / 86_400_000),
        'day',
        opts
      ) ?? ''
    )
  }

  // ── Sub-templates ───────────────────────────────────────────────────────

  private _todayLabelTemplate(leftPct: number) {
    const label =
      this._intl?.formatRelativeTime(0, 'day', { numeric: 'auto' }) ?? 'Today'
    return html`<span
      class="absolute -top-2 text-xs text-neutral-50 -translate-x-1/2 whitespace-nowrap capitalize"
      style="left: ${leftPct}%"
      >${label}</span
    >`
  }

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
    const barLeft = this._startIsNow ? 'left-3' : 'left-[10%]'
    const barRight = isForever ? 'right-[1%]' : 'right-[10%]'
    return html`
      <div class="relative flex items-center w-full" style="height: 2.5rem">
        <!-- Track line full-width -->
        <div
          class="absolute inset-x-0 top-[53%] -translate-y-1/2 h-px bg-neutral-85"
        ></div>

        <!-- Left endpoint dot -->
        ${this._state !== 'in-range' && this._state !== 'after-end'
          ? html`<div
              class="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-neutral-85 z-10"
            ></div>`
          : ''}

        <!-- Progress bar -->
        <div
          class="absolute ${barLeft} ${barRight} top-1/3 flex h-2 overflow-hidden "
        >
          <div
            style=${styleMap({ width: `${leftPercent}%`, ...leftStyle })}
          ></div>
          <div style=${styleMap({ flexGrow: '1', ...rightStyle })}></div>
        </div>

        <!-- Vertical tick left (start date) -->
        <div
          class="absolute  top-[53%] w-px h-10 bg-neutral-85 z-10 ${barLeft}"
        ></div>

        <!-- Vertical tick right(end date) -->
        ${!isForever
          ? html`<div
              class="absolute right-[10%] top-1/2 w-px h-10 bg-neutral-85 z-10"
            ></div>`
          : ''}

        <!-- Arrow right (replaces the right dot) -->
        <div
          class="absolute -right-2 top-[53%] -translate-y-1/2 z-10 flex items-center"
        >
          <lukso-icon
            name="arrow-right-sm"
            size="small"
            color="neutral-85"
          ></lukso-icon>
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
    const leftCls =
      align === 'start' && this._startIsNow ? 'left-[3%]' : 'left-[12%]'
    return html`
      <div class="flex flex-col ${cls} ${leftCls} right-[12%] absolute ">
        <span class="text-sm font-semibold text-neutral-50"
          >${this._formatDate(date)}</span
        >
        <span class="text-sm text-neutral-50">${this._formatTime(date)}</span>
        ${this._state !== 'after-end'
          ? html`<span class="text-xs text-neutral-70"
              >${this._relativeTime(date)}</span
            >`
          : ''}
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

    const barStartPct = this._startIsNow ? 3 : 10
    const todayLeftPct = barStartPct + (pct / 100) * (90 - barStartPct)
    const arrowLeft = this._startIsNow ? 'left-[3%]' : 'left-[12%]'
    return html`
      <div class="flex flex-col w-full">
        <div class="relative">
          ${this._state === 'in-range' && !this._startIsNow
            ? this._todayLabelTemplate(todayLeftPct)
            : ''}
          ${bar}
        </div>
        <div class="relative min-h-18 w-full">
          ${this._dateLabelTemplate(start, 'start')}
          <div
            class="absolute ${arrowLeft} right-[12%] flex justify-center pt-1"
          >
            <lukso-icon
              name="arrow-long-down"
              size="medium"
              class="rotate-270"
              color="neutral-55"
            ></lukso-icon>
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
        ? this._barTemplate(0, GREY_STYLE, GREY_STYLE, this.endDate === '')
        : this._barTemplate(
            FOREVER_GREEN_PCT,
            GREEN_STYLE,
            STRIPED_STYLE,
            this.endDate === ''
          )

    const barStartPct = this._startIsNow ? 3 : 10
    const todayLeftPct =
      barStartPct + (FOREVER_GREEN_PCT / 100) * (99 - barStartPct)
    const arrowLeft = this._startIsNow ? 'left-[3%]' : 'left-[12%]'
    return html`
      <div class="flex flex-col w-full">
        <div class="relative">
          ${this._state === 'in-range'
            ? this._todayLabelTemplate(todayLeftPct)
            : ''}
          ${bar}
        </div>
        <div class="relative min-h-18 w-full">
          ${this._dateLabelTemplate(start, 'start')}
          <div
            class="absolute ${arrowLeft} right-[12%] flex justify-center pt-1"
          >
            <lukso-icon
              name="arrow-long-down"
              size="medium"
              class="rotate-270"
              color="neutral-55"
            ></lukso-icon>
          </div>
          <div class="absolute right-[12%] flex flex-col items-end text-right">
            <span class="text-sm font-semibold text-neutral-50">Forever</span>
          </div>
        </div>
      </div>
    `
  }

  render() {
    const hasValidEndDate =
      !!this.endDate && !isNaN(new Date(this.endDate).getTime())
    return html`
      <div class="flex w-full">
        ${hasValidEndDate ? this.endDateTemplate() : this.foreverTemplate()}
      </div>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'lukso-timeline': LuksoTimeline
  }
}
