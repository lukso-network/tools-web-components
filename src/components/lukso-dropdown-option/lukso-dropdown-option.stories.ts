import { html, nothing } from 'lit-html'

import type { Meta } from '@storybook/web-components'

import '../lukso-button/index'

import './index'

/**  Documentation and examples of `lukso-dropdown-option` component. */
const meta: Meta = {
  title: 'Design System/Components/lukso-dropdown-option',
  component: 'lukso-dropdown-option',
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
      table: {
        category: 'Attributes',
      },
    },
    isReadonly: {
      name: 'is-readonly',
      control: { type: 'boolean' },
      table: {
        category: 'Attributes',
      },
    },
    isDisabled: {
      name: 'is-disabled',
      control: { type: 'boolean' },
      table: {
        category: 'Attributes',
      },
    },
    isSelected: {
      name: 'is-selected',
      control: { type: 'boolean' },
      table: {
        category: 'Attributes',
      },
    },
    isActive: {
      name: 'is-active',
      control: { type: 'boolean' },
      table: {
        category: 'Attributes',
      },
    },
    isGroup: {
      name: 'is-group',
      control: { type: 'boolean' },
      table: {
        category: 'Attributes',
      },
    },
    'is-readonly': {
      name: 'isReadonly',
    },
    'is-disabled': {
      name: 'isDisabled',
    },
    'is-selected': {
      name: 'isSelected',
    },
    'is-active': {
      name: 'isActive',
    },
    'is-group': {
      name: 'isGroup',
    },
  },
  args: {
    size: 'medium',
    isReadonly: false,
    isDisabled: false,
    isSelected: false,
    isActive: false,
    isGroup: false,
  },
  parameters: {
    controls: {
      exclude: [
        'styles',
        'isReadonly',
        'isDisabled',
        'isSelected',
        'isActive',
        'isGroup',
      ],
    },
  },
}

export default meta

const Template = ({
  size,
  isReadonly,
  isDisabled,
  isSelected,
  isActive,
  isGroup,
}) => {
  return html`
    <lukso-dropdown-option
      size=${size ? size : nothing}
      ?is-readonly=${isReadonly}
      ?is-disabled=${isDisabled}
      ?is-selected=${isSelected}
      ?is-active=${isActive}
      ?is-group=${isGroup}
    >
      Test
    </lukso-dropdown-option>
  </div>`
}

/** Example of dropdown option.  */
export const DefaultDropdownOption = Template.bind({})
DefaultDropdownOption.args = {}
