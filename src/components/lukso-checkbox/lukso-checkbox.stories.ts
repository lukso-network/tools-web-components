import { html } from 'lit-html'
import { Meta } from '@storybook/web-components'

import './index'

/**  Documentation and examples of `lukso-checkbox` component.  */
const meta: Meta = {
  title: 'Design System/Forms/lukso-checkbox',
  component: 'lukso-checkbox',
  argTypes: {
    label: {
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
    type: {
      control: { type: 'text' },
      table: {
        category: 'Attributes',
      },
    },
    ref: {
      control: { type: 'text' },
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
    error: {
      control: { type: 'text' },
      table: {
        category: 'Attributes',
      },
    },
    isChecked: {
      name: 'is-checked',
      control: { type: 'boolean' },
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
    isFullWidth: {
      name: 'is-full-width',
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
    customClass: {
      name: 'custom-class',
      control: { type: 'text' },
      table: {
        category: 'Attributes',
      },
    },
    onBlur: {
      name: 'on-blur',
      description: 'Emitted on input blur event.',
      table: {
        category: 'Events',
      },
    },
    onChange: {
      name: 'on-change',
      description: 'Emitted on input change event.',
      table: {
        category: 'Events',
      },
    },
    onClick: {
      name: 'on-click',
      description: 'Emitted on input change event.',
      table: {
        category: 'Events',
      },
    },
    profileAddress: {
      name: 'profile-address',
      control: { type: 'text' },
      table: {
        category: 'Attributes',
      },
    },
    hasIdenticon: {
      name: 'has-identicon',
      control: { type: 'boolean' },
      table: {
        category: 'Attributes',
      },
    },
    upUsername: {
      name: 'up-username',
      control: { type: 'text' },
      table: {
        category: 'Attributes',
      },
    },
    upAddress: {
      name: 'up-address',
      control: { type: 'text' },
      table: {
        category: 'Attributes',
      },
    },
    'is-full-width': {
      name: 'isFullWidth',
    },
    'custom-class': {
      name: 'customClass',
    },
    'is-readonly': {
      name: 'isReadonly',
    },
    'is-checked': {
      name: 'isChecked',
    },
    'is-disabled': {
      name: 'isDisabled',
    },
    'profile-url': {
      name: 'profileUrl',
    },
    'profile-address': {
      name: 'profileAddress',
    },
    'has-identicon': {
      name: 'hasIdenticon',
    },
    'up-username': {
      name: 'upUsername',
    },
    'up-address': {
      name: 'upAddress',
    },
  },
  args: {
    label: 'Label',
    type: 'text',
    name: 'input',
    isReadonly: false,
    customClass: '',
    isFullWidth: false,
    isDisabled: false,
    isChecked: false,
    profileUrl: 'images/sample-avatar.png',
    profileAddress: '0x9671Db683406EE0817B1f5cB6A3b3BD111477457',
    hasIdenticon: true,
    upUsername: 'John',
    upAddress: '0x9671Db683406EE0817B1f5cB6A3b3BD111477457',
  },
  parameters: {
    controls: {
      exclude: [
        'defaultInputStyles',
        'defaultCheckboxStyles',
        'defaultContainerStyles',
        'defaultLabelStyles',
        'isFullWidth',
        'hasFocus',
        'hasHighlight',
        'customClass',
        'isReadonly',
        'isDisabled',
        'isChecked',
        'hasChecked',
        'profileUrl',
        'profileAddress',
        'hasIdenticon',
        'upUsername',
        'upAddress',
      ],
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/NFCh20xAq3Jg2g8A0DNC9I/UI-Library?node-id=420%3A3617&t=JAexoWba0Re3ntDk-4',
    },
  },
}

export default meta

const Template = ({
  name,
  type,
  label,
  error,
  size,
  isFullWidth,
  isReadonly,
  isDisabled,
  isChecked,
  customClass,
  onBlur,
  onChange,
  onClick,

  // Profile image properties
  profileUrl,
  profileAddress,
  hasIdenticon,

  // Username properties
  upUsername,
  upAddress,
}) =>
  html` <lukso-checkbox
    label=${label}
    name=${name}
    type=${type}
    error=${error}
    size=${size}
    ?is-full-width=${isFullWidth}
    ?is-readonly=${isReadonly}
    ?is-disabled=${isDisabled}
    ?is-checked=${isChecked}
    custom-class=${customClass}
    @on-blur=${onBlur}
    @on-change=${onChange}
    @on-click=${onClick}
    profile-url=${profileUrl}
    profile-address=${profileAddress}
    has-identicon=${hasIdenticon}
    up-username=${upUsername}
    up-address=${upAddress}
  ></lukso-checkbox>`

/** Example of default input with `value`.  */
export const DefaultInput = Template.bind({})
DefaultInput.args = {
  isChecked: true,
  label: 'Checkbox',
  size: 'medium',
}

/** Example of input with `error`. */
export const Error = Template.bind({})
Error.args = {
  error: 'Error message',
  size: 'medium',
}
export const Small = Template.bind({})
Small.args = {
  size: 'small',
  label: 'Small',
}

export const XSmall = Template.bind({})
XSmall.args = {
  size: 'x-small',
  label: 'XSmall',
}

export const ProfileCheckboxMedium = Template.bind({})
ProfileCheckboxMedium.args = {
  type: 'profile',
  size: 'medium',
}

export const ProfileCheckboxSmall = Template.bind({})
ProfileCheckboxSmall.args = {
  type: 'profile',
  size: 'small',
}

export const ProfileCheckboxXSmall = Template.bind({})
ProfileCheckboxXSmall.args = {
  type: 'profile',
  size: 'x-small',
}
