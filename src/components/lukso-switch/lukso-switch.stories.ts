import { html, nothing } from 'lit-html'
import { useArgs } from 'storybook/preview-api'

import type { Meta } from '@storybook/web-components-vite'

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
    id: {
      control: { type: 'text' },
      table: {
        category: 'Attributes',
      },
    },
    name: {
      control: { type: 'text' },
      table: {
        category: 'Attributes',
      },
    },
    label: {
      control: { type: 'text' },
      table: {
        category: 'Attributes',
      },
    },
    description: {
      control: { type: 'text' },
      table: {
        category: 'Attributes',
      },
    },
    error: {
      control: { type: 'text' },
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
    name: 'input',
    label: '',
    description: '',
    error: '',
    id: '',
  },
  parameters: {
    controls: {
      exclude: ['checked', 'isDisabled', 'isChecked'],
    },
  },
}

export default meta

const Template = ({
  color,
  isDisabled,
  name,
  label,
  description,
  error,
  id,
}) => {
  const [{ isChecked }, updateArgs] = useArgs()

  const handleToggle = () => {
    updateArgs({ isChecked: !isChecked })
  }

  return html`<lukso-switch
    @on-change=${handleToggle}
    id=${id ? id : nothing}
    color=${color}
    name=${name ? name : nothing}
    label=${label ? label : nothing}
    description=${description ? description : nothing}
    error=${error ? error : nothing}
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
  color: 'sky-64',
  isChecked: true,
}

/** Example with form decorators: `label`, `description` and `error`. */
export const FormDecorators = Template.bind({})
FormDecorators.args = {
  label: 'Title label',
  description: 'My component <i>description</i> text',
  error: 'Error <i>message</i>',
}
