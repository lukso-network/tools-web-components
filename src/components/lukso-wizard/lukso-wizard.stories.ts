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
    activeStep: { control: { type: 'number', min: 1, step: 1 } },
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
  },
  parameters: {
    controls: {
      exclude: ['activeStepStyles', 'completedStepStyles', 'active-step'],
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/NFCh20xAq3Jg2g8A0DNC9I/UI-Library?node-id=1094%3A13512&t=AGmdbG8fXRENuU3o-4',
    },
  },
}

export default meta

const Template = ({ steps, activeStep }) =>
  html`<lukso-wizard
    steps=${JSON.stringify(steps)}
    active-step=${activeStep}
  ></lukso-wizard>`

export const BasicWizard = Template.bind({})
