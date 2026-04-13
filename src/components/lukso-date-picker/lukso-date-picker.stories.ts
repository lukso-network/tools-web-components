import { html, nothing } from 'lit-html'

import type { Meta, StoryObj } from '@storybook/web-components-vite'

import './index'

/** Documentation and examples of the `lukso-date-picker` component. */
const meta: Meta = {
  title: 'Design System/Components/lukso-date-picker',
  component: 'lukso-date-picker',
  argTypes: {
    value: {
      control: { type: 'text' },
      description:
        'ISO 8601 date-time string (e.g. "2026-05-01T20:00"). Controls the selected date and time.',
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
      description: 'Component width preset.',
      table: { category: 'Attributes' },
    },
    'show-summary': {
      control: { type: 'boolean' },
      description:
        'Whether to show the summary footer (selected date label + optional time picker).',
      table: { category: 'Attributes' },
    },
    'show-time': {
      control: { type: 'boolean' },
      description:
        'Whether to show the time picker inside the summary footer (requires show-summary=true).',
      table: { category: 'Attributes' },
    },
    'date-format': {
      control: { type: 'select' },
      options: ['short', 'long'],
      description: 'How to display the selected date in the footer label.',
      table: { category: 'Attributes' },
    },
    'time-format': {
      control: { type: 'select' },
      options: ['auto', '12h', '24h'],
      description:
        '"auto" detects the device preference via Intl (12h for en-US, 24h for most others).',
      table: { category: 'Attributes' },
    },
    'week-start-day': {
      control: { type: 'select' },
      options: ['monday', 'sunday'],
      description: 'First day of the week in the calendar grid.',
      table: { category: 'Attributes' },
    },
    label: {
      control: { type: 'text' },
      description: 'Optional label shown above the calendar.',
      table: { category: 'Attributes' },
    },
    description: {
      control: { type: 'text' },
      description: 'Optional description shown below the label.',
      table: { category: 'Attributes' },
    },
    error: {
      control: { type: 'text' },
      description: 'Optional error message shown below the calendar.',
      table: { category: 'Attributes' },
    },
    'selected-bg-color': {
      control: { type: 'color' },
      description:
        'CSS color for the selected day background. Defaults to black.',
      table: { category: 'Attributes' },
    },
    'selected-text-color': {
      control: { type: 'color' },
      description: 'CSS color for the selected day text. Defaults to white.',
      table: { category: 'Attributes' },
    },
    'is-disabled': {
      control: { type: 'boolean' },
      description: 'Disables all interaction.',
      table: { category: 'Attributes' },
    },
    'is-full-width': {
      control: { type: 'boolean' },
      description:
        'Whether the component should take the full width of its container.',
      table: { category: 'Attributes' },
    },
    'on-change': {
      description:
        'Emitted when the user selects a date or changes the time. `detail: { value: string, event }`',
      table: { category: 'Events' },
    },
  },
  args: {
    value: '2026-05-01T20:00',
    min: undefined,
    max: undefined,
    locale: 'en-US',
    size: 'large',
    label: undefined,
    description: undefined,
    error: undefined,
    'show-summary': true,
    'show-time': true,
    'date-format': 'short',
    'time-format': 'auto',
    'week-start-day': 'monday',
    'selected-bg-color': undefined,
    'selected-text-color': undefined,
    'is-disabled': false,
    'is-full-width': false,
  },
  parameters: {
    controls: { exclude: ['styles'] },
  },
  // Storybook passes args as-is (kebab-case keys stay kebab-case).
  // Use bracket notation for any arg whose key contains a hyphen.
  render: args => html`
    <lukso-date-picker
      value=${args['value'] || nothing}
      min=${args['min'] || nothing}
      max=${args['max'] || nothing}
      locale=${args['locale'] || nothing}
      size=${args['size'] || nothing}
      label=${args['label'] || nothing}
      description=${args['description'] || nothing}
      error=${args['error'] || nothing}
      selected-bg-color=${args['selected-bg-color'] || nothing}
      selected-text-color=${args['selected-text-color'] || nothing}
      ?show-summary=${args['show-summary']}
      ?show-time=${args['show-time']}
      date-format=${args['date-format'] || nothing}
      time-format=${args['time-format'] || nothing}
      week-start-day=${args['week-start-day'] || nothing}
      ?is-disabled=${args['is-disabled']}
      ?is-full-width=${args['is-full-width']}
    ></lukso-date-picker>
  `,
}

export default meta

/** Full date + time picker with default settings. */
export const Default: StoryObj = {}

/** Calendar with summary but without time picker. */
export const DateOnly: StoryObj = {
  name: 'Date Only (no time picker)',
  args: { 'show-time': false },
}

/** Calendar without summary footer at all. */
export const NoSummary: StoryObj = {
  name: 'No Summary',
  args: { 'show-summary': false },
}

/** Long date format in the footer label. */
export const LongFormat: StoryObj = {
  name: 'Long Date Format',
  args: { 'date-format': 'long' },
}

/** 12-hour time format with AM/PM selector. */
export const TwelveHour: StoryObj = {
  name: '12-Hour Time Format',
  args: { locale: 'en-US', 'time-format': '12h' },
}

/** Explicit 24-hour time format. */
export const TwentyFourHour: StoryObj = {
  name: '24-Hour Time Format',
  args: { 'time-format': '24h' },
}

/** Italian locale — month name, day abbreviations and long date in Italian. */
export const ItalianLocale: StoryObj = {
  name: 'Italian Locale (it-IT)',
  args: { locale: 'it-IT', 'date-format': 'long' },
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

/** Week starts on Sunday instead of Monday. */
export const SundayStart: StoryObj = {
  name: 'Sunday Week Start',
  args: { 'week-start-day': 'sunday' },
}

/** Small size preset. */
export const SmallSize: StoryObj = {
  name: 'Small',
  args: { size: 'small' },
}

/** X-large size preset. */
export const XLargeSize: StoryObj = {
  name: 'X-Large',
  args: { size: 'x-large' },
}

/** Custom selected-day color. */
export const CustomColor: StoryObj = {
  name: 'Custom Selected Color',
  args: {
    'selected-bg-color': '#3b82f6',
    'selected-text-color': '#ffffff',
  },
}

/** With optional label and description above the calendar. */
export const WithLabelAndDescription: StoryObj = {
  name: 'With Label & Description',
  args: {
    label: 'Event date',
    description: 'Select the date and time of your event.',
  },
}

/** With error message below the calendar. */
export const WithError: StoryObj = {
  name: 'With Error',
  args: {
    label: 'Event date',
    error: 'Please select a valid date.',
  },
}

/** No initial value selected. */
export const NoValueSelected: StoryObj = {
  name: 'No Value Selected',
  args: { value: undefined },
}

/** All interaction disabled. */
export const Disabled: StoryObj = {
  name: 'Disabled',
  args: { 'is-disabled': true },
}
