import { html } from 'lit-html'
import { Meta } from '@storybook/web-components'

import './index'

/**  Documentation and examples of `lukso-switch` component.  */
const meta: Meta = {
  title: 'Design System/Forms/lukso-switch',
  component: 'lukso-switch',
  argTypes: {
    color: {
      control: { type: 'text' },
    },
    onChange: {
      name: 'on-change',
      description: 'Emitted when checkbox is clicked',
      table: {
        category: 'Events',
      },
    },
  },
  args: {
    color: 'green-54',
    isDisabled: false,
    isChecked: false,
  },
  parameters: {
    controls: {
      exclude: ['defaultLabelStyles', 'defaultInputStyles', 'checked'],
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/NFCh20xAq3Jg2g8A0DNC9I/UI-Library?type=design&node-id=376-3984&t=20P0yRhnEEulAelu-0',
    },
  },
}

export default meta

const Template = ({ color, onChange, isDisabled, isChecked }) =>
  html`<lukso-switch
    @on-change=${onChange}
    color=${color}
    ?isDisabled=${isDisabled}
    ?isChecked=${isChecked}
  ></lukso-switch>`

/** Example of default switch.  */
export const DefaultInput = Template.bind({})
DefaultInput.args = {
  color: 'green-54',
  isChecked: true,
  isDisabled: false,
}

/** Example of readonly switch.  */
export const ReadonlyInput = Template.bind({})
ReadonlyInput.args = {
  color: 'red-65',
  isChecked: true,
  isDisabled: true,
}
