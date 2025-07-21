import { html } from 'lit-html'

import type { Meta } from '@storybook/web-components-vite'

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
    checked: {
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
    size: {
      control: {
        type: 'select',
      },
      options: ['x-small', 'small', 'medium'],
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
    'is-disabled': {
      name: 'isDisabled',
    },
  },
  args: {
    checked: false,
    label: 'Label',
    type: 'text',
    name: 'input',
    isReadonly: false,
    isDisabled: false,
    customClass: '',
  },
  parameters: {
    controls: {
      exclude: [
        'defaultInputStyles',
        'defaultCheckboxStyles',
        'defaultContainerStyles',
        'defaultLabelStyles',
        'hasFocus',
        'hasHighlight',
        'customClass',
        'isFullWidth',
        'isReadonly',
        'isDisabled',
        'onChangeEvent',
        'onChange',
      ],
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
  isReadonly,
  isDisabled,
  checked,
  customClass,
  onChange,
}) =>
  html` <lukso-checkbox
    name=${name}
    type=${type}
    error=${error}
    size=${size}
    ?is-readonly=${isReadonly}
    ?is-disabled=${isDisabled}
    ?checked=${checked}
    custom-class=${customClass}
    @on-change=${onChange}
  >
    ${label}
  </lukso-checkbox>`

/** Example of default input with `value`.  */
export const DefaultInput = Template.bind({})
DefaultInput.args = {
  checked: true,
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

const ProfileCheckboxTemplate = ({
  name,
  type,
  error,
  size,
  isReadonly,
  isDisabled,
  checked,
  customClass,
  onChange,

  profileUrl,
  profileAddress,
  hasIdenticon,
  profileSize,
  upName,
  upAddress,
}) =>
  html` <lukso-checkbox
    name=${name}
    type=${type}
    error=${error}
    size=${size}
    ?is-readonly=${isReadonly}
    ?is-disabled=${isDisabled}
    ?checked=${checked}
    custom-class=${customClass}
    @on-change=${onChange}
  >
    <lukso-profile
      profile-url=${profileUrl}
      profile-address=${profileAddress}
      ?has-identicon=${hasIdenticon}
      size=${profileSize}
    ></lukso-profile>
    <lukso-username
      name=${upName}
      address=${upAddress}
      size=${size}
      custom-class="!flex items-center"
    ></lukso-username>
  </lukso-checkbox>`

ProfileCheckboxTemplate.args = {
  upName: 'John',
  upAddress: '0x9671Db683406EE0817B1f5cB6A3b3BD111477457',
  profileUrl: 'images/sample-avatar.png',
  size: 'x-large',
  profileAddress: '0x9671Db683406EE0817B1f5cB6A3b3BD111477457',
  hasIdenticon: true,
  profileSize: 'small',
}

export const ProfileCheckboxMedium = ProfileCheckboxTemplate.bind({})
ProfileCheckboxMedium.args = {
  ...ProfileCheckboxTemplate.args,
  type: 'profile',
  size: 'medium',
}

export const ProfileCheckboxSmall = ProfileCheckboxTemplate.bind({})
ProfileCheckboxSmall.args = {
  ...ProfileCheckboxTemplate.args,
  type: 'profile',
  size: 'small',
  profileSize: 'x-small',
}

export const ProfileCheckboxXSmall = ProfileCheckboxTemplate.bind({})
ProfileCheckboxXSmall.args = {
  ...ProfileCheckboxTemplate.args,
  type: 'profile',
  size: 'x-small',
  profileSize: 'x-small',
}
