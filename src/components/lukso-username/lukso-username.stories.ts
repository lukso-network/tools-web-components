import { html } from 'lit-html'
import './index'

export default {
  title: 'Design System/Components/Username',
  component: 'lukso-username',
  argTypes: {
    name: {
      control: { type: 'text' },
    },
    address: {
      control: { type: 'text' },
    },
    maxWidth: {
      control: { type: 'number' },
      if: { arg: 'name', neq: '' },
    },
    size: {
      control: { type: 'select' },
      options: ['large', 'small'],
    },
    sliceBy: {
      control: { type: 'number' },
      if: { arg: 'name', eq: '' },
    },
    addressColor: {
      control: { type: 'text' },
      if: { arg: 'name', eq: '' },
    },
  },
  args: {
    name: 'John',
    address: '0x9671Db683406EE0817B1f5cB6A3b3BD111477457',
    maxWidth: 200,
    size: 'large',
    sliceBy: 8,
    addressColor: '',
  },
  parameters: {
    controls: {
      exclude: ['bytesWidth', 'max-width', 'slice-by'],
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/NFCh20xAq3Jg2g8A0DNC9I/UI-Library?node-id=1096%3A14641&t=W8onPGbREKjGG9sS-4',
    },
  },
}

const Template = ({ name, address, maxWidth, size, sliceBy, addressColor }) =>
  html`<lukso-username
    name=${name}
    address=${address}
    max-width=${maxWidth}
    size=${size}
    slice-by=${sliceBy}
    address-color=${addressColor}
  ></lukso-username>`

export const DefaultUsername = Template.bind({})

export const LongName = Template.bind({})
LongName.args = {
  name: 'ThisIsAReallyLongName',
}

export const OnlyName = Template.bind({})
OnlyName.args = {
  address: '',
}

export const OnlyAddress = Template.bind({})
OnlyAddress.args = {
  name: '',
}

export const SliceAddressBy4 = Template.bind({})
SliceAddressBy4.args = {
  name: '',
  sliceBy: 4,
}

export const SmallAddress = Template.bind({})
SmallAddress.args = {
  name: '',
  size: 'small',
}

export const CustomAddressColor = Template.bind({})
CustomAddressColor.args = {
  name: '',
  addressColor: 'neutral-60',
  size: 'small',
}
