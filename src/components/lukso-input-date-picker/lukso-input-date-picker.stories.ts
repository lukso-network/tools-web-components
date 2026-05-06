import { html, nothing } from 'lit-html'
import { expect, userEvent, within } from '@storybook/test'

import { wait } from '../../../.storybook/test-helpers'

import type { Meta, StoryObj } from '@storybook/web-components-vite'

import './index'

/** Documentation and examples of the `lukso-input-date-picker` component. */
const meta: Meta = {
  title: 'Design System/Forms/lukso-input-date-picker',
  component: 'lukso-input-date-picker',
  argTypes: {
    presets: {
      control: { type: 'text' },
      description:
        'JSON array of preset objects `[{label, time}]`. `time` is `"now"`, `"forever"`, `"pick"`, or a relative offset object `{ amount: number, unit: "minute" | "hour" | "day" | "week" | "month" | "year" }`. Negative `amount` selects a past date. `"forever"` emits an empty string (no date). When provided, replaces the raw date input with a preset selector.',
      table: { category: 'Attributes' },
    },
    value: {
      control: { type: 'text' },
      description:
        'ISO 8601 date-time string (e.g. "2026-05-15T20:00"). Controls the selected date and time.',
      table: { category: 'Attributes' },
    },
    min: {
      control: { type: 'text' },
      description:
        'Minimum selectable date as ISO date string (e.g. "2026-01-01").',
      table: { category: 'Attributes' },
    },
    max: {
      control: { type: 'text' },
      description:
        'Maximum selectable date as ISO date string (e.g. "2026-12-31").',
      table: { category: 'Attributes' },
    },
    locale: {
      control: { type: 'text' },
      description:
        'BCP-47 locale tag for Intl date/time formatting. Defaults to device locale.',
      table: { category: 'Attributes' },
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large', 'x-large'],
      description: 'Component size preset.',
      table: { category: 'Attributes' },
    },
    placeholder: {
      control: { type: 'text' },
      description: 'Placeholder text shown when no date is selected.',
      table: { category: 'Attributes' },
    },
    label: {
      control: { type: 'text' },
      description: 'Optional label shown above the input.',
      table: { category: 'Attributes' },
    },
    description: {
      control: { type: 'text' },
      description: 'Optional description shown below the label.',
      table: { category: 'Attributes' },
    },
    error: {
      control: { type: 'text' },
      description: 'Optional error message shown below the input.',
      table: { category: 'Attributes' },
    },
    'show-time': {
      control: { type: 'boolean' },
      description:
        'Whether to show the time picker and include time in the displayed value.',
      table: { category: 'Attributes' },
    },
    'date-format': {
      control: { type: 'select' },
      options: ['short', 'long'],
      description: 'How to display the date in the input field.',
      table: { category: 'Attributes' },
    },
    'time-format': {
      control: { type: 'select' },
      options: ['auto', '12h', '24h'],
      description: '"auto" detects the device preference via Intl.',
      table: { category: 'Attributes' },
    },
    'week-start-day': {
      control: { type: 'select' },
      options: ['monday', 'sunday'],
      description: 'First day of the week in the calendar grid.',
      table: { category: 'Attributes' },
    },
    'is-disabled': {
      control: { type: 'boolean' },
      description: 'Disables all interaction.',
      table: { category: 'Attributes' },
    },
    'is-readonly': {
      control: { type: 'boolean' },
      description: 'Makes the input read-only (cannot open picker).',
      table: { category: 'Attributes' },
    },
    'is-full-width': {
      control: { type: 'boolean' },
      description: 'Stretches the input to full width.',
      table: { category: 'Attributes' },
    },
    borderless: {
      control: { type: 'boolean' },
      description: 'Removes the border from the input.',
      table: { category: 'Attributes' },
    },
    'selected-bg-color': {
      control: { type: 'color' },
      description:
        'CSS color for the selected day background. Forwarded to date picker.',
      table: { category: 'Attributes' },
    },
    'selected-text-color': {
      control: { type: 'color' },
      description:
        'CSS color for the selected day text. Forwarded to date picker.',
      table: { category: 'Attributes' },
    },
    'open-top': {
      control: { type: 'boolean' },
      description: 'Opens the calendar above the input instead of below.',
      table: { category: 'Attributes' },
    },
    'open-right': {
      control: { type: 'boolean' },
      description: 'Aligns the calendar to the right edge of the input.',
      table: { category: 'Attributes' },
    },
    onChange: {
      name: 'on-change',
      action: 'on-change',
      description:
        'Emitted when the user selects a date, changes the time, or picks a preset. `detail: { value: string, preset?: DatePickerPresetTime, event }` — `value` is a resolved ISO date string, or an empty string when the `"forever"` preset is selected; `preset` is the full preset `time` value when a preset triggered the change.',
      table: { category: 'Events' },
    },
  },
  args: {
    presets: undefined,
    value: '2026-11-15T20:00',
    min: undefined,
    max: undefined,
    locale: 'en-US',
    size: 'large',
    placeholder: 'Select date...',
    label: undefined,
    description: undefined,
    error: undefined,
    'show-time': true,
    'date-format': 'short',
    'time-format': 'auto',
    'week-start-day': 'monday',
    'is-disabled': false,
    'is-readonly': false,
    'is-full-width': false,
    borderless: false,
    'selected-bg-color': undefined,
    'selected-text-color': undefined,
    'open-top': false,
    'open-right': false,
  },
  decorators: [
    (story: () => unknown) =>
      html`<div style="padding: 20px; padding-bottom: 420px;">${story()}</div>`,
  ],
  parameters: {
    controls: { exclude: ['styles', 'onChange'] },
  },
  render: args => html`
    <lukso-input-date-picker
      presets=${args['presets'] || nothing}
      value=${args['value'] || nothing}
      min=${args['min'] || nothing}
      max=${args['max'] || nothing}
      locale=${args['locale'] || nothing}
      size=${args['size'] || nothing}
      placeholder=${args['placeholder'] || nothing}
      label=${args['label'] || nothing}
      description=${args['description'] || nothing}
      error=${args['error'] || nothing}
      selected-bg-color=${args['selected-bg-color'] || nothing}
      selected-text-color=${args['selected-text-color'] || nothing}
      ?show-time=${args['show-time']}
      date-format=${args['date-format'] || nothing}
      time-format=${args['time-format'] || nothing}
      week-start-day=${args['week-start-day'] || nothing}
      ?is-disabled=${args['is-disabled']}
      ?is-readonly=${args['is-readonly']}
      ?is-full-width=${args['is-full-width']}
      ?borderless=${args['borderless']}
      ?open-top=${args['open-top']}
      ?open-right=${args['open-right']}
      @on-change=${(event: CustomEvent) => args['onChange'](event.detail)}
    ></lukso-input-date-picker>
  `,
}

export default meta

/** Input with a pre-selected date and time. Click to open the calendar. */
export const Default: StoryObj = {}

/** No initial value — shows placeholder text. */
export const NoValue: StoryObj = {
  name: 'No Value (placeholder)',
  args: { value: undefined },
}

/** Date-only mode: hides the time picker and time from the displayed value. */
export const DateOnly: StoryObj = {
  name: 'Date Only (no time)',
  args: { 'show-time': false },
}

/** Long date format (e.g. "May 15, 2026 08:00 PM"). */
export const LongFormat: StoryObj = {
  name: 'Long Date Format',
  args: { 'date-format': 'long' },
}

/** Explicit 12-hour time format with AM/PM. */
export const TwelveHour: StoryObj = {
  name: '12-Hour Time Format',
  args: { 'time-format': '12h' },
}

/** Explicit 24-hour time format. */
export const TwentyFourHour: StoryObj = {
  name: '24-Hour Time Format',
  args: { 'time-format': '24h' },
}

/** With label and description above the input. */
export const WithLabelAndDescription: StoryObj = {
  name: 'With Label & Description',
  args: {
    label: 'Return after',
    description: 'Select the date and time for this action.',
  },
}

/** With error state. */
export const WithError: StoryObj = {
  name: 'With Error',
  args: {
    label: 'Return after',
    value: undefined,
    error: 'Please select a valid date.',
  },
}

/** Small size preset. */
export const SmallSize: StoryObj = {
  name: 'Small',
  args: { size: 'small' },
}

/** Medium size preset. */
export const MediumSize: StoryObj = {
  name: 'Medium',
  args: { size: 'medium' },
}

/** X-large size preset. */
export const XLargeSize: StoryObj = {
  name: 'X-Large',
  args: { size: 'x-large' },
}

/** Full-width input. */
export const FullWidth: StoryObj = {
  name: 'Full Width',
  args: { 'is-full-width': true },
}

/** Only dates within a specific range are selectable. */
export const WithMinMax: StoryObj = {
  name: 'With Min/Max Range',
  args: {
    value: '2026-05-15T10:00',
    min: '2026-05-10',
    max: '2026-05-20',
  },
}

/** Italian locale. */
export const ItalianLocale: StoryObj = {
  name: 'Italian Locale (it-IT)',
  args: { locale: 'it-IT', 'date-format': 'long' },
}

/** Custom selected-day color forwarded to the date picker. */
export const CustomColor: StoryObj = {
  name: 'Custom Selected Color',
  args: {
    'selected-bg-color': '#3b82f6',
    'selected-text-color': '#ffffff',
  },
}

/** Disabled — input cannot be opened. */
export const Disabled: StoryObj = {
  name: 'Disabled',
  args: { 'is-disabled': true },
}

/** Read-only — shows value but cannot open picker. */
export const Readonly: StoryObj = {
  name: 'Readonly',
  args: { 'is-readonly': true },
}

// ─── Positioning variants ───────────────────────────────────────────────────

/**
 * Calendar opens below the input, aligned to the right edge.
 * Useful when the input is near the left edge of the screen.
 */
export const OpenRight: StoryObj = {
  name: 'Position — Open Right',
  args: { 'open-right': true },
}

/**
 * Calendar opens above the input (aligned left).
 * The story adds padding-top so the calendar has room to render upward.
 */
export const OpenTop: StoryObj = {
  name: 'Position — Open Top',
  args: { 'open-top': true },
  decorators: [
    (story: () => unknown) =>
      html`<div style="padding: 20px; padding-top: 420px;">${story()}</div>`,
  ],
}

/**
 * Calendar opens above the input, aligned to the right edge.
 * Ideal when the input is in the bottom-right area of the screen.
 */
export const OpenTopRight: StoryObj = {
  name: 'Position — Open Top Right',
  args: { 'open-top': true, 'open-right': true },
  decorators: [
    (story: () => unknown) =>
      html`<div
        style="padding: 20px; padding-top: 420px; display: flex; justify-content: flex-end;"
      >
        ${story()}
      </div>`,
  ],
}

// ─── Preset variants ────────────────────────────────────────────────────────

/**
 * Preset selector with common time shortcuts.
 * Selecting "Now" or "Forever" emits the resolved value immediately.
 * Selecting a relative preset (e.g. "In a month") opens the calendar pre-navigated
 * to the resolved date so the user can fine-tune before confirming.
 * The emitted `on-change` event carries both the chosen ISO date and the originating
 * preset reference (`preset: { amount, unit }`).
 * Selecting "Pick a date…" opens the calendar for fully manual selection.
 */
export const WithPresets: StoryObj = {
  name: 'With Presets',
  args: {
    presets: JSON.stringify([
      { label: 'Forever', time: 'forever' },
      { label: 'Now', time: 'now' },
      { label: 'In an hour', time: { amount: 1, unit: 'hour' } },
      { label: 'In a day', time: { amount: 1, unit: 'day' } },
      { label: 'In a week', time: { amount: 1, unit: 'week' } },
      { label: 'In a month', time: { amount: 1, unit: 'month' } },
      { label: 'Pick a date…', time: 'pick' },
    ]),
    value: undefined,
    placeholder: 'Select time range…',
    label: 'Start date',
  },
}

/**
 * Presets with a default preset pre-selected via the `value` prop.
 * Any string sentinel ('now', 'forever', 'pick') can be passed as `value` to pre-select a preset.
 * Object-based presets ({ amount, unit }) cannot be pre-selected via `value` since objects don't round-trip through HTML attributes.
 */
export const WithPresetsPreselected: StoryObj = {
  name: 'With Presets — Pre-selected',
  args: {
    presets: JSON.stringify([
      { label: 'Now', time: 'now' },
      { label: 'In a week', time: { amount: 1, unit: 'week' } },
      { label: 'In a month', time: { amount: 1, unit: 'month' } },
      { label: 'Pick a date…', time: 'pick' },
    ]),
    value: 'now',
    placeholder: 'Select time range…',
    label: 'Return after',
  },
}

// ─── Interaction tests ───────────────────────────────────────────────────────

const presetsForTests = JSON.stringify([
  { label: 'Forever', time: 'forever' },
  { label: 'Now', time: 'now' },
  { label: 'In a month', time: { amount: 1, unit: 'month' } },
  { label: 'Pick a date…', time: 'pick' },
])

/**
 * Selecting a relative preset opens the calendar — no immediate emit.
 * The display should show the formatted date after the user confirms.
 */
export const TestRelativePresetOpensPicker: StoryObj = {
  name: 'Test: Relative preset opens calendar',
  parameters: { docs: { disable: true } },
  render: () => html`
    <div style="padding: 20px; padding-bottom: 460px;">
      <lukso-input-date-picker
        presets=${presetsForTests}
        placeholder="Select…"
      ></lukso-input-date-picker>
    </div>
  `,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const picker = canvasElement.querySelector('lukso-input-date-picker')

    const emittedEvents: CustomEvent[] = []
    picker.addEventListener('on-change', (e: Event) =>
      emittedEvents.push(e as CustomEvent)
    )

    // Open the preset dropdown
    const trigger = canvas.getByRole('combobox')
    await userEvent.click(trigger)
    await wait(100)

    // Click the relative preset option — should open calendar, NOT emit
    const shadowRoot = picker.shadowRoot
    const relativeOption = Array.from(
      shadowRoot.querySelectorAll('lukso-dropdown-option')
    ).find(el => el.textContent?.trim() === 'In a month')
    await userEvent.click(relativeOption)
    await wait(100)

    expect(emittedEvents).toHaveLength(0)

    // Calendar dropdown should now be open
    const calendarDropdown = shadowRoot.querySelector(
      'lukso-dropdown[is-open="true"], lukso-dropdown[is-open]'
    )
    expect(calendarDropdown).not.toBeNull()
  },
}

/**
 * Selecting "Now" emits immediately without opening the calendar.
 */
export const TestNowPresetEmitsImmediately: StoryObj = {
  name: 'Test: "Now" preset emits immediately',
  parameters: { docs: { disable: true } },
  render: () => html`
    <div style="padding: 20px; padding-bottom: 460px;">
      <lukso-input-date-picker
        presets=${presetsForTests}
        placeholder="Select…"
      ></lukso-input-date-picker>
    </div>
  `,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const picker = canvasElement.querySelector('lukso-input-date-picker')

    const emittedEvents: CustomEvent[] = []
    picker.addEventListener('on-change', (e: Event) =>
      emittedEvents.push(e as CustomEvent)
    )

    const trigger = canvas.getByRole('combobox')
    await userEvent.click(trigger)
    await wait(100)

    const shadowRoot = picker.shadowRoot
    const nowOption = Array.from(
      shadowRoot.querySelectorAll('lukso-dropdown-option')
    ).find(el => el.textContent?.trim() === 'Now')
    await userEvent.click(nowOption)
    await wait(100)

    expect(emittedEvents).toHaveLength(1)
    expect(emittedEvents[0].detail.preset).toBe('now')
    expect(emittedEvents[0].detail.value).toBeTruthy()
  },
}

/**
 * Two date pickers side by side — use this to verify that opening one
 * closes the other and that outside-click works correctly.
 */
export const TwoPickers: StoryObj = {
  name: 'Two Pickers (close behavior)',
  render: () => html`
    <div
      style="display: flex; gap: 16px; padding: 20px; padding-bottom: 460px;"
    >
      <lukso-input-date-picker
        value="2026-11-15T20:00"
        placeholder="Pick start date..."
        label="Start date"
      ></lukso-input-date-picker>
      <lukso-input-date-picker
        value="2026-12-01T10:00"
        placeholder="Pick end date..."
        label="End date"
      ></lukso-input-date-picker>
    </div>
  `,
}
