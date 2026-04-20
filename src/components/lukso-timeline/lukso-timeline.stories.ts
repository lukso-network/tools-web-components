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
  parameters: {
    controls: {
      exclude: [],
    },
  },
}

export default meta

// ── Helpers ────────────────────────────────────────────────────────────────

/** Returns an ISO 8601 date-time string offset from now by `ms` milliseconds. */
function relDate(ms: number): string {
  return new Date(Date.now() + ms).toISOString()
}

const H = 3_600_000
const D = 86_400_000

const Template = ({
  startDate,
  endDate,
}: {
  startDate: string
  endDate?: string
}) =>
  endDate
    ? html`<lukso-timeline
        start-date=${startDate}
        end-date=${endDate}
      ></lukso-timeline>`
    : html`<lukso-timeline start-date=${startDate}></lukso-timeline>`

// ── Template: start → end ──────────────────────────────────────────────────

/**
 * Today is BEFORE the start date.
 * Bar is fully grey — the event hasn't started yet.
 */
export const TodayBeforeStart = Template.bind({})
TodayBeforeStart.args = {
  startDate: relDate(2 * H),
  endDate: relDate(5 * D),
}

/**
 * Today is WITHIN the timeline (between start and end).
 * Bar shows green progress from start to today, then grey to end.
 */
export const TodayInRange = Template.bind({})
TodayInRange.args = {
  startDate: relDate(-D),
  endDate: relDate(4 * D),
}

/**
 * Today is AFTER the end date — event has expired.
 * Bar is fully green (completed).
 */
export const TodayAfterEnd = Template.bind({})
TodayAfterEnd.args = {
  startDate: relDate(-10 * D),
  endDate: relDate(-2 * D),
}

// ── Template: start → forever ─────────────────────────────────────────────

/**
 * Forever mode — today is BEFORE the start date.
 * Bar is fully striped (event is in the future with no fixed end).
 */
export const ForeverBeforeStart = Template.bind({})
ForeverBeforeStart.args = {
  startDate: relDate(5 * D),
}

/**
 * Forever mode — today is WITHIN the timeline (past start, no end).
 * Bar shows 35% green (since start) then striped (indefinite future).
 */
export const ForeverInRange = Template.bind({})
ForeverInRange.args = {
  startDate: relDate(-5 * D),
}
