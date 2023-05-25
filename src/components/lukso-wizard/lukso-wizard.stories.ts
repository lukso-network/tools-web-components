import { html } from 'lit-html'
import { Meta } from '@storybook/web-components'

import '../index'

/** Documentation and examples of `lukso-wizard` component. Steps are passed in `step` property as object containing different labels.
 *  To specify which step is active set `active-step` property.
 */
const meta: Meta = {
  title: 'Design System/Components/lukso-wizard',
  component: 'lukso-wizard',
  argTypes: {
    steps: {
      control: { type: 'object' },
    },
    activeStep: {
      name: 'active-step',
      control: { type: 'number', min: 1, step: 1 },
    },
    isFullWidth: {
      name: 'is-full-width',
      control: { type: 'boolean' },
    },
    'active-step': {
      name: 'activeStep',
    },
    'is-full-width': {
      name: 'isFullWidth',
    },
  },
  args: {
    steps: [
      {
        label: `Select
Profile`,
      },
      {
        label: `Connect
Wallet`,
      },
      {
        label: `Migrate
LYXe`,
      },
      { label: 'Status' },
    ],
    activeStep: 3,
    isFullWidth: false,
  },
  parameters: {
    controls: {
      exclude: [
        'activeStepStyles',
        'completedStepStyles',
        'activeStep',
        'isFullWidth',
      ],
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/NFCh20xAq3Jg2g8A0DNC9I/UI-Library?node-id=1094%3A13512&t=AGmdbG8fXRENuU3o-4',
    },
  },
}

export default meta

const Template = ({ steps, activeStep, isFullWidth }) =>
  html`<lukso-wizard
    steps=${JSON.stringify(steps)}
    active-step=${activeStep}
    ?is-full-width=${isFullWidth}
  ></lukso-wizard>`

export const BasicWizard = Template.bind({})

/** If you need button to take full width of the parent element add `is-full-width` property. */
export const FullWidthWizard = Template.bind({})
FullWidthWizard.args = {
  isFullWidth: true,
}
