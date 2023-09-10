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
    'is-disabled': {
      name: 'isDisabled',
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
    checked: false,
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
      ],
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/NFCh20xAq3Jg2g8A0DNC9I/UI-Library?type=design&node-id=433-3775&mode=design&t=eIMaDzPGbg85o9rf-0',
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
  checked,
  customClass,
  onBlur,
  onChange,
  onClick,
}) =>
  html` <lukso-checkbox
    name=${name}
    type=${type}
    error=${error}
    size=${size}
    ?is-full-width=${isFullWidth}
    ?is-readonly=${isReadonly}
    ?is-disabled=${isDisabled}
    ?checked=${checked}
    custom-class=${customClass}
    @on-blur=${onBlur}
    @on-change=${onChange}
    @on-click=${onClick}
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
  isFullWidth,
  isReadonly,
  isDisabled,
  checked,
  customClass,
  onBlur,
  onChange,
  onClick,

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
    ?is-full-width=${isFullWidth}
    ?is-readonly=${isReadonly}
    ?is-disabled=${isDisabled}
    ?checked=${checked}
    custom-class=${customClass}
    @on-blur=${onBlur}
    @on-change=${onChange}
    @on-click=${onClick}
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
