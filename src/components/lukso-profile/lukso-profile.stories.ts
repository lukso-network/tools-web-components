import { html } from 'lit-html'
import './index'

export default {
  title: 'Design System/Components/Profile',
  component: 'lukso-profile',
  argTypes: {
    profileUrl: {
      control: { type: 'text' },
    },
    size: {
      control: {
        type: 'select',
      },
      options: ['x-small', 'small', 'medium', 'large'],
    },
    profileAddress: {
      control: { type: 'text' },
    },
    hasIdenticon: {
      control: { type: 'boolean' },
    },
  },
  args: {
    profileUrl: 'images/sample-avatar.png',
    size: 'large',
    profileAddress: '0x9671Db683406EE0817B1f5cB6A3b3BD111477457',
    hasIdenticon: true,
  },
  parameters: {
    controls: {
      exclude: [
        'sizes',
        'profile-url',
        'profileImageSize',
        'identiconSize',
        'identicon',
        'profile-address',
        'has-identicon',
        'defaultProfileUrl',
      ],
    },
  },
}

const Template = ({ profileUrl, size, profileAddress, hasIdenticon }) =>
  html`<lukso-profile
    profile-url=${profileUrl}
    size=${size}
    profile-address=${profileAddress}
    ?has-identicon=${hasIdenticon}
  ></lukso-profile>`

export const Large = Template.bind({})
Large.args = {
  size: 'large',
}

export const Medium = Template.bind({})
Medium.args = {
  size: 'medium',
}

export const Small = Template.bind({})
Small.args = {
  size: 'small',
}

export const XSmall = Template.bind({})
XSmall.args = {
  size: 'x-small',
}

export const Unknown = Template.bind({})
Unknown.args = {
  profileUrl: '',
  hasIdenticon: false,
}
