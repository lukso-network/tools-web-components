import { html } from 'lit-html'
import { useArgs } from '@storybook/client-api'

import type { Meta } from '@storybook/web-components'

import './index'

/**  Documentation and examples of `lukso-switch` component.  */
const meta: Meta = {
  title: 'Design System/Forms/lukso-switch',
  component: 'lukso-switch',
  argTypes: {
    color: {
      control: {
        type: 'text',
      },
      table: {
        category: 'Attributes',
      },
    },
    isDisabled: {
      control: {
        type: 'boolean',
      },
      name: 'is-disabled',
      table: {
        category: 'Attributes',
      },
    },
    isChecked: {
      name: 'is-checked',
      control: {
        type: 'boolean',
      },
      table: {
        category: 'Attributes',
      },
    },
    'is-checked': {
      name: 'isChecked',
    },
    'is-disabled': {
      name: 'isDisabled',
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
    color: '',
    isDisabled: false,
    isChecked: false,
  },
  parameters: {
    controls: {
      exclude: ['checked', 'isDisabled', 'isChecked'],
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/NFCh20xAq3Jg2g8A0DNC9I/UI-Library?type=design&node-id=376-3984&t=20P0yRhnEEulAelu-0',
    },
  },
}

export default meta

const Template = ({ color, isDisabled }) => {
  const [{ isChecked }, updateArgs] = useArgs()

  const handleToggle = () => {
    updateArgs({ isChecked: !isChecked })
  }

  return html`<lukso-switch
    @on-change=${handleToggle}
    color=${color}
    ?is-disabled=${isDisabled}
    ?is-checked=${isChecked}
  ></lukso-switch>`
}

/** Example of default switch.  */
export const DefaultInput = Template.bind({})
DefaultInput.args = {
  isChecked: true,
}

/** Example of disabled switch.  */
export const DisabledInput = Template.bind({})
DisabledInput.args = {
  isChecked: true,
  isDisabled: true,
}

/** Example of switch in different color.  */
export const ColoredInput = Template.bind({})
ColoredInput.args = {
  color: 'red-65',
  isChecked: true,
}
