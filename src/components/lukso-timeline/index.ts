// src/components/lukso-timeline/index.ts
import { html } from 'lit'
import { property } from 'lit/decorators.js'

import { safeCustomElement } from '@/shared/safe-custom-element'
import '@/components/lukso-icon'
import { TailwindStyledElement } from '@/shared/tailwind-element'
import style from './style.css?inline'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
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

  render() {
    return html`<div class="flex w-full"></div>`
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'lukso-timeline': LuksoTimeline
  }
}
