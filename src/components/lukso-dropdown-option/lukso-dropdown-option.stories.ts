import { html, nothing } from 'lit-html'

import type { Meta } from '@storybook/web-components-vite'

import './index'
import '../lukso-icon/index'
import '../lukso-tooltip/index'

/**  Documentation and examples of `lukso-dropdown-option` component. */
const meta: Meta = {
  title: 'Design System/Components/lukso-dropdown-option',
  component: 'lukso-dropdown-option',
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['small', 'medium'],
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
      Proof of Attendance
    </lukso-dropdown-option>
  </div>`
}

/** Example of dropdown option.  */
export const DefaultDropdownOption = Template.bind({})
DefaultDropdownOption.args = {}

/** Dropdown option with secondary label and tooltip passed via the `right` slot. */
export const SecondaryWithTooltip = {
  args: {
    size: 'small',
  },
  render: ({ size }: { size: string }) => html`
    <lukso-dropdown-option size=${size}>
      Proof of Attendance
      <span class="paragraph-inter-14-regular text-neutral-60 shrink-0"
        >LSP7 NDT</span
      >
      <div slot="right" class="ml-auto shrink-0 flex items-center">
        <lukso-tooltip text="Token standard information">
          <lukso-icon size=${size} name="information"></lukso-icon>
        </lukso-tooltip>
      </div>
    </lukso-dropdown-option>
  `,
}
