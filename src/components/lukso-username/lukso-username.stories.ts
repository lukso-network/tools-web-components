import { html } from 'lit-html'

import type { Meta } from '@storybook/web-components'

import './index'

/**  Documentation and examples of `lukso-username` component. It's used to display user name and address in standardized way. */
const meta: Meta = {
  title: 'Design System/Components/lukso-username',
  component: 'lukso-username',
  argTypes: {
    name: {
      control: { type: 'text' },
      table: {
        category: 'Attributes',
      },
    },
    address: {
      control: { type: 'text' },
      table: {
        category: 'Attributes',
      },
    },
    maxWidth: {
      name: 'max-width',
      control: { type: 'number' },
      if: { arg: 'name', neq: '' },
      table: {
        category: 'Attributes',
      },
    },
    size: {
      control: { type: 'select' },
      options: ['x-small', 'small', 'medium', 'large', 'x-large'],
      table: {
        category: 'Attributes',
      },
    },
    sliceBy: {
      name: 'slice-by',
      control: { type: 'number' },
      if: { arg: 'name', eq: '' },
      table: {
        category: 'Attributes',
      },
    },
    addressColor: {
      name: 'address-color',
      control: { type: 'text' },
      table: {
        category: 'Attributes',
      },
    },
    nameColor: {
      name: 'name-color',
      control: { type: 'text' },
      table: {
        category: 'Attributes',
      },
    },
    prefix: {
      name: 'prefix',
      control: { type: 'text' },
      table: {
        category: 'Attributes',
      },
    },
    hidePrefix: {
      name: 'hide-prefix',
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
    'max-width': {
      name: 'maxWidth',
    },
    'slice-by': {
      name: 'sliceBy',
    },
    'address-color': {
      name: 'addressColor',
    },
    'name-color': {
      name: 'nameColor',
    },
    'hide-prefix': {
      name: 'hidePrefix',
    },
    'custom-class': {
      name: 'customClass',
    },
  },
  args: {
    name: 'John',
    address: '0x9671Db683406EE0817B1f5cB6A3b3BD111477457',
    maxWidth: 200,
    size: 'large',
    sliceBy: 8,
    addressColor: '',
    nameColor: '',
    prefix: '@',
    hidePrefix: false,
    customClass: '',
  },
  parameters: {
    controls: {
      exclude: [
        'bytesWidth',
        'maxWidth',
        'sliceBy',
        'addressColor',
        'nameColor',
        'hidePrefix',
        'customClass',
        'styles',
      ],
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/NFCh20xAq3Jg2g8A0DNC9I/UI-Library?node-id=1096%3A14641&t=W8onPGbREKjGG9sS-4',
    },
  },
}

export default meta

const Template = ({
  name,
  address,
  maxWidth,
  size,
  sliceBy,
  addressColor,
  nameColor,
  customClass,
  prefix,
  hidePrefix,
}) =>
  html`<lukso-username
    name=${name}
    address=${address}
    max-width=${maxWidth}
    size=${size}
    slice-by=${sliceBy}
    address-color=${addressColor}
    name-color=${nameColor}
    custom-class=${customClass}
    prefix=${prefix}
    ?hide-prefix=${hidePrefix}
  ></lukso-username>`

/** By default user name is displayed as `name` prefixed with `@` character and 4 bytes of `address` */
export const DefaultUsername = Template.bind({})

/** Long names get truncated. You can control width of the component with `max-width` attribute. */
export const LongName = Template.bind({})
LongName.args = {
  name: 'ThisIsAReallyLongName',
}

/** Example of component that has only `name` attribute. */
export const OnlyName = Template.bind({})
OnlyName.args = {
  address: '',
}

/** Example of component that has only `address` attribute. */
export const OnlyAddress = Template.bind({})
OnlyAddress.args = {
  name: '',
}

/** You can specify amount of sliced characters in the address with `slice-by` attribute. */
export const SliceAddressBy4 = Template.bind({})
SliceAddressBy4.args = {
  name: '',
  sliceBy: 4,
}

/** Color of the address and name can be changed via `name-color` and `address-color` attribute. */
export const CustomColor = Template.bind({})
CustomColor.args = {
  nameColor: 'red-55',
  addressColor: 'green-54',
}

/** You can customize prefix with `prefix` attribute. */
export const CustomPrefix = Template.bind({})
CustomPrefix.args = {
  prefix: '$',
}

/** You can hide prefix completely by adding `hide-prefix` attribute. */
export const HidePrefix = Template.bind({})
HidePrefix.args = {
  hidePrefix: true,
  name: 'anonymous-profile',
  maxWidth: 300,
  address: '',
}

/** Example of `x-small` size with 10px font.  */
export const XSmall = Template.bind({})
XSmall.args = {
  size: 'x-small',
}

/** Example of `small` size with 12px font. */
export const Small = Template.bind({})
Small.args = {
  size: 'small',
}

/** Example of `medium` size with 14px font. */
export const Medium = Template.bind({})
Medium.args = {
  size: 'medium',
}

/** Example of `large` size with 16px font. */
export const Large = Template.bind({})
Large.args = {
  size: 'large',
}

/** Example of `x-large` size with 24px font. */
export const XLarge = Template.bind({})
XLarge.args = {
  size: 'x-large',
}
