import { html, nothing } from 'lit-html'

import type { Meta, StoryObj } from '@storybook/web-components-vite'

import './index'

/** Documentation and examples of the `lukso-time-picker` component. */
const meta: Meta = {
  title: 'Design System/Forms/lukso-time-picker',
  component: 'lukso-time-picker',
  argTypes: {
    value: {
      control: { type: 'text' },
      description: 'Current time in "HH:MM" 24-hour format (e.g. "14:30").',
      table: { category: 'Attributes' },
    },
    locale: {
      control: { type: 'text' },
      description:
        'BCP-47 locale tag. Used to auto-detect 12h/24h when time-format is "auto".',
      table: { category: 'Attributes' },
    },
    'time-format': {
      control: { type: 'select' },
      options: ['auto', '12h', '24h'],
      description:
        '"auto" detects the device preference via Intl (12h for en-US, 24h for most others).',
      table: { category: 'Attributes' },
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large', 'x-large'],
      description: 'Component width (only relevant in standalone mode).',
      table: { category: 'Attributes' },
    },
    'is-standalone': {
      control: { type: 'boolean' },
      description:
        'When true (default) renders a card + form fields. Set to false to embed inside another component.',
      table: { category: 'Attributes' },
    },
    label: {
      control: { type: 'text' },
      description: 'Optional label shown above the card (standalone only).',
      table: { category: 'Attributes' },
    },
    description: {
      control: { type: 'text' },
      description:
        'Optional description shown below the label (standalone only).',
      table: { category: 'Attributes' },
    },
    error: {
      control: { type: 'text' },
      description:
        'Optional error message shown below the card (standalone only).',
      table: { category: 'Attributes' },
    },
    'is-disabled': {
      control: { type: 'boolean' },
      description: 'Disables all interaction.',
      table: { category: 'Attributes' },
    },
    'on-change': {
      description:
        'Emitted when the user changes the time. `detail: { value: "HH:MM", event }`',
      table: { category: 'Events' },
    },
  },
  args: {
    value: '20:00',
    locale: 'en-US',
    'time-format': 'auto',
    size: 'large',
    'is-standalone': true,
    label: undefined,
    description: undefined,
    error: undefined,
    'is-disabled': false,
  },
  parameters: {
    controls: { exclude: ['styles'] },
  },
  render: args => html`
    <lukso-time-picker
      value=${args['value'] || nothing}
      locale=${args['locale'] || nothing}
      time-format=${args['time-format'] || nothing}
      size=${args['size'] || nothing}
      label=${args['label'] || nothing}
      description=${args['description'] || nothing}
      error=${args['error'] || nothing}
      ?is-standalone=${args['is-standalone']}
      ?is-disabled=${args['is-disabled']}
      @on-change=${(e: CustomEvent) => console.log('on-change', e.detail)}
    ></lukso-time-picker>
  `,
}

export default meta

/** Default standalone time picker with auto time format. */
export const Default: StoryObj = {}

/** 12-hour format with AM/PM selector. */
export const TwelveHour: StoryObj = {
  name: '12-Hour Format',
  args: { 'time-format': '12h' },
}

/** Explicit 24-hour format. */
export const TwentyFourHour: StoryObj = {
  name: '24-Hour Format',
  args: { 'time-format': '24h' },
}

/** With optional label and description. */
export const WithLabel: StoryObj = {
  name: 'With Label & Description',
  args: {
    label: 'Event time',
    description: 'Select the time for your event.',
  },
}

/** With error message. */
export const WithError: StoryObj = {
  name: 'With Error',
  args: {
    label: 'Event time',
    error: 'Please select a valid time.',
  },
}

/** Small size. */
export const SmallSize: StoryObj = {
  name: 'Small',
  args: { size: 'small' },
}

/** X-large size. */
export const XLargeSize: StoryObj = {
  name: 'X-Large',
  args: { size: 'x-large' },
}

/** All interaction disabled. */
export const Disabled: StoryObj = {
  name: 'Disabled',
  args: { 'is-disabled': true },
}
