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

const GREY_STYLE = { backgroundColor: 'var(--neutral-90)' }
const GREEN_STYLE = { backgroundColor: 'var(--green-54)' }
const STRIPED_COLOR = {
  color1: 'var(--neutral-95)',
  color2: 'var(--neutral-90)',
}
const STRIPED_STYLE = {
  backgroundImage: `repeating-linear-gradient(135deg, ${STRIPED_COLOR.color1} 0px, ${STRIPED_COLOR.color1} 5px, ${STRIPED_COLOR.color2} 5px, ${STRIPED_COLOR.color2} 10px, ${STRIPED_COLOR.color2} 10px)`,
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

  /** True when no startDate is provided — treated as "since creation" (always in the past). */
  private get _startIsCreation(): boolean {
    return !this.startDate
  }

  private get _state(): TimelineState {
    if (this._startIsCreation) return 'in-range'
    const now = Date.now()
    const start = new Date(this.startDate).getTime()
    if (Number.isNaN(start) || now < start) return 'before-start'
    if (!this.endDate) return 'in-range'
    const end = new Date(this.endDate).getTime()
    if (!Number.isNaN(end) && now > end) return 'after-end'
    return 'in-range'
  }

  private get _startIsNow(): boolean {
    if (!this.startDate) return false
    const start = new Date(this.startDate).getTime()
    return !Number.isNaN(start) && Math.abs(Date.now() - start) < 60_000
  }

  private get _progressPercent(): number {
    if (!this.startDate || !this.endDate) return 0
    const now = Date.now()
    const start = new Date(this.startDate).getTime()
    const end = new Date(this.endDate).getTime()
    if (Number.isNaN(start) || Number.isNaN(end) || end <= start) return 0
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
   * @param leftPercent    - width of the left (coloured) segment, 0–100
   * @param leftStyle      - CSSStyleDeclaration-style object for the left segment
   * @param rightStyle     - CSSStyleDeclaration-style object for the right segment
   * @param isForever      - whether the timeline has no fixed end date
   * @param dotOnStartTick - when true the start dot is placed on the vertical tick instead of far left
   */
  private _barTemplate(
    leftPercent: number,
    leftStyle: Record<string, string>,
    rightStyle: Record<string, string>,
    isForever: boolean = false,
    dotOnStartTick: boolean = false
  ) {
    const barLeft = this._startIsNow || dotOnStartTick ? 'left-3' : 'left-[10%]'
    const barRight = isForever ? 'right-[1%]' : 'right-[10%]'
    const dotOnTick = this._startIsNow || dotOnStartTick
    const dotLeft = dotOnTick ? barLeft : 'left-0'
    const dotTranslateX = dotOnTick ? '-translate-x-1/2' : ''
    return html`
      <div class="relative flex items-center w-full h-6 sm:h-8 md:h-10">
        <!-- Track line full-width -->
        <div
          class="absolute inset-x-0 top-[53%] -translate-y-1/2 h-px bg-neutral-85"
        ></div>

        <!-- Left endpoint dot -->
        <div
          class="absolute ${dotLeft} top-[53%] ${dotTranslateX} -translate-y-1/2 w-2 h-2 rounded-full bg-neutral-85 z-10"
        ></div>

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
          class="absolute top-[53%] w-px h-[5rem] bg-neutral-85 z-10 ${barLeft}"
        ></div>

        <!-- Vertical tick right(end date) -->
        ${!isForever
          ? html`<div
              class="absolute right-[10%] top-[53%] w-px h-[5rem] bg-neutral-85 z-10"
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
    return html`
      <div class="flex flex-col ${cls} min-w-0">
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

  /**
   * Renders the 3-column label row below the bar.
   * The outer columns represent the space outside the ticks (left edge → left tick,
   * right tick → right edge). The inner content sits between the ticks, split into
   * left-date | arrow | right-date via a nested 3-column grid.
   *
   * @param startLabel  - content for the start (left) label
   * @param endLabel    - content for the end (right) label
   * @param leftOffset  - CSS width matching the left tick position from the left edge
   * @param rightOffset - CSS width matching the right tick position from the right edge
   */
  private _labelRowTemplate(
    startLabel: unknown,
    endLabel: unknown,
    leftOffset: string,
    rightOffset: string
  ) {
    return html`
      <div
        class="grid w-full min-h-14"
        style="grid-template-columns: ${leftOffset} 1fr ${rightOffset}"
      >
        <!-- spacer matching left tick offset -->
        <div></div>
        <!-- inner area between the ticks: date | arrow | date -->
        <div
          class="grid px-3 sm:px-4 md:px-5"
          style="grid-template-columns: 1fr auto 1fr"
        >
          <div class="flex flex-col items-start min-w-0">${startLabel}</div>
          <div class="flex justify-center items-start px-2">
            <lukso-icon
              name="arrow-long-down"
              size="medium"
              class="rotate-270"
              color="neutral-55"
            ></lukso-icon>
          </div>
          <div class="flex flex-col items-end text-right min-w-0">
            ${endLabel}
          </div>
        </div>
        <!-- spacer matching right tick offset -->
        <div></div>
      </div>
    `
  }

  // ── Main templates ──────────────────────────────────────────────────────

  private endDateTemplate() {
    if (!this.endDate) return html``
    const isCreation = this._startIsCreation
    const start = isCreation ? null : new Date(this.startDate)
    const end = new Date(this.endDate)

    if (!isCreation && (start === null || Number.isNaN(start.getTime()))) {
      return html``
    }
    if (Number.isNaN(end.getTime())) return html``

    const pct = this._progressPercent
    const isStartNowOrCreation = isCreation || this._startIsNow

    const bar =
      this._state === 'before-start'
        ? this._barTemplate(
            0,
            GREY_STYLE,
            GREY_STYLE,
            false,
            isStartNowOrCreation
          )
        : this._state === 'in-range'
          ? this._barTemplate(
              pct,
              GREEN_STYLE,
              STRIPED_STYLE,
              false,
              isStartNowOrCreation
            )
          : this._barTemplate(
              100,
              GREEN_STYLE,
              GREEN_STYLE,
              false,
              isStartNowOrCreation
            )

    const barStartPct = isStartNowOrCreation ? 3 : 10
    const todayLeftPct = barStartPct + (pct / 100) * (90 - barStartPct)

    // left offset matches the left tick position in the bar
    const leftOffset = isStartNowOrCreation ? '0.75rem' : '10%'
    // right offset matches the right tick position in the bar
    const rightOffset = '10%'

    const startLabel = isStartNowOrCreation
      ? html`<span class="text-sm font-semibold text-neutral-50"
          >Creation</span
        >`
      : start !== null
        ? this._dateLabelTemplate(start, 'start')
        : ''
    const endLabel = this._dateLabelTemplate(end, 'end')

    return html`
      <div class="flex flex-col w-full">
        <div class="relative">
          ${this._state === 'in-range' && !isStartNowOrCreation
            ? this._todayLabelTemplate(todayLeftPct)
            : ''}
          ${bar}
        </div>
        ${this._labelRowTemplate(startLabel, endLabel, leftOffset, rightOffset)}
      </div>
    `
  }

  private foreverTemplate() {
    const isCreation = this._startIsCreation
    const start = isCreation ? null : new Date(this.startDate)

    if (!isCreation && (start === null || Number.isNaN(start.getTime()))) {
      return html``
    }
    const isStartNowOrCreation = isCreation || this._startIsNow
    const greenPct = isStartNowOrCreation ? 0 : FOREVER_GREEN_PCT

    const bar =
      this._state === 'before-start'
        ? this._barTemplate(
            0,
            GREY_STYLE,
            GREY_STYLE,
            this.endDate === '',
            isStartNowOrCreation
          )
        : this._barTemplate(
            greenPct,
            GREEN_STYLE,
            STRIPED_STYLE,
            this.endDate === '',
            isStartNowOrCreation
          )

    const barStartPct = isStartNowOrCreation ? 3 : 10
    const todayLeftPct = barStartPct + (greenPct / 100) * (99 - barStartPct)

    // left offset matches the left tick; right has no tick so mirrors same width
    const leftOffset = isStartNowOrCreation ? '0.75rem' : '10%'
    // forever has no right tick — right spacer is zero so "Forever" sits at the edge
    const rightOffset = '0px'

    const startLabel = isStartNowOrCreation
      ? html`<span class="text-sm font-semibold text-neutral-50"
          >Creation</span
        >`
      : start !== null
        ? this._dateLabelTemplate(start, 'start')
        : ''
    const endLabel = html`<span class="text-sm font-semibold text-neutral-50"
      >Forever</span
    >`

    return html`
      <div class="flex flex-col w-full">
        <div class="relative">
          ${this._state === 'in-range' && !isStartNowOrCreation
            ? this._todayLabelTemplate(todayLeftPct)
            : ''}
          ${bar}
        </div>
        ${this._labelRowTemplate(startLabel, endLabel, leftOffset, rightOffset)}
      </div>
    `
  }

  render() {
    const hasValidEndDate =
      !!this.endDate && !Number.isNaN(new Date(this.endDate).getTime())
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
