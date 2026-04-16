// src/components/lukso-timeline/lukso-timeline.stories.ts
import { html } from 'lit-html'

import type { Meta } from '@storybook/web-components-vite'

import './index'

/** Documentation and examples of `lukso-timeline` component. */
const meta: Meta = {
  title: 'Design System/Components/lukso-timeline',
  component: 'lukso-timeline',
  argTypes: {
    startDate: {
      name: 'start-date',
      control: { type: 'text' },
      table: { category: 'Attributes' },
    },
    endDate: {
      name: 'end-date',
      control: { type: 'text' },
      table: { category: 'Attributes' },
    },
    locale: {
      control: { type: 'text' },
      table: { category: 'Attributes' },
    },
  },
}

export default meta

// ── Helpers ────────────────────────────────────────────────────────────────

/** Returns an ISO 8601 date-time string offset from now by `ms` milliseconds. */
function relDate(ms: number): string {
  return new Date(Date.now() + ms).toISOString().slice(0, 16)
}

const H = 3_600_000
const D = 86_400_000

// ── Template: start → end ──────────────────────────────────────────────────

/**
 * Today is BEFORE the start date.
 * Bar is fully grey — the event hasn't started yet.
 * start-date = now + 2h, end-date = now + 5d
 */
export const TodayBeforeStart = () =>
  html`<lukso-timeline
    start-date=${relDate(2 * H)}
    end-date=${relDate(5 * D)}
  ></lukso-timeline>`

/**
 * Today is WITHIN the timeline (between start and end).
 * Bar shows green progress from start to today, then grey to end.
 * start-date = now − 1d, end-date = now + 4d
 */
export const TodayInRange = () =>
  html`<lukso-timeline
    start-date=${relDate(-D)}
    end-date=${relDate(4 * D)}
  ></lukso-timeline>`

/**
 * Today is AFTER the end date — event has expired.
 * Bar is fully green (completed).
 * start-date = now − 10d, end-date = now − 2d
 */
export const TodayAfterEnd = () =>
  html`<lukso-timeline
    start-date=${relDate(-10 * D)}
    end-date=${relDate(-2 * D)}
  ></lukso-timeline>`

// ── Template: start → forever ─────────────────────────────────────────────

/**
 * Forever mode — today is BEFORE the start date.
 * Bar is fully striped (event is in the future with no fixed end).
 * start-date = now + 5d, no end-date
 */
export const ForeverBeforeStart = () =>
  html`<lukso-timeline start-date=${relDate(5 * D)}></lukso-timeline>`

/**
 * Forever mode — today is WITHIN the timeline (past start, no end).
 * Bar shows 35% green (since start) then striped (indefinite future).
 * start-date = now − 5d, no end-date
 */
export const ForeverInRange = () =>
  html`<lukso-timeline start-date=${relDate(-5 * D)}></lukso-timeline>`
