// src/components/lukso-timeline/index.ts
import { html } from 'lit'
import { property } from 'lit/decorators.js'

import { safeCustomElement } from '@/shared/safe-custom-element'
import '@/components/lukso-icon'
import { TailwindStyledElement } from '@/shared/tailwind-element'
import style from './style.css?inline'

type TimelineState = 'before-start' | 'in-range' | 'after-end'

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

  render() {
    return html`<div class="flex w-full"></div>`
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'lukso-timeline': LuksoTimeline
  }
}
