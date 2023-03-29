import { html } from 'lit-html'
import { Meta } from '@storybook/web-components'

import './index'

/**
 *  Documentation and examples of `lukso-profile` component.
 *  Profiles comes in `x-small`, `small`, `medium`, `large` and `x-large` size that is set in `size` property.
 *  Identicon is generated using `ethereum-blockies-base64` library from `profile-Address` property.
 *  To show profile picture pass valid url in `profile-url` property.
 */
const meta: Meta = {
  title: 'Design System/Components/lukso-profile',
  component: 'lukso-profile',
  argTypes: {
    profileUrl: {
      name: 'profile-url',
      control: { type: 'text' },
    },
    size: {
      control: {
        type: 'select',
      },
      options: ['x-small', 'small', 'medium', 'large', 'x-large'],
    },
    profileAddress: {
      name: 'profile-address',
      control: { type: 'text' },
    },
    hasIdenticon: {
      name: 'has-identicon',
      control: { type: 'boolean' },
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
  },
  args: {
    profileUrl: 'images/sample-avatar.png',
    size: 'x-large',
    profileAddress: '0x9671Db683406EE0817B1f5cB6A3b3BD111477457',
    hasIdenticon: true,
  },
  parameters: {
    controls: {
      exclude: [
        'sizes',
        'profileUrl',
        'profileImageSize',
        'identiconSize',
        'identicon',
        'profileAddress',
        'hasIdenticon',
        'defaultProfileUrl',
      ],
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/NFCh20xAq3Jg2g8A0DNC9I/UI-Library?node-id=378%3A3395&t=AGmdbG8fXRENuU3o-4',
    },
  },
}

export default meta

const Template = ({ profileUrl, size, profileAddress, hasIdenticon }) =>
  html`<lukso-profile
    profile-url=${profileUrl}
    size=${size}
    profile-address=${profileAddress}
    ?has-identicon=${hasIdenticon}
  ></lukso-profile>`

/** Example of `x-large` profile in `96x96` pixel size.*/
export const XLarge = Template.bind({})
XLarge.args = {
  size: 'x-large',
}

/** Example of `large` profile in `80x80` pixel size.*/
export const Large = Template.bind({})
Large.args = {
  size: 'large',
}

/** Example of `medium` profile in `56x56` pixel size.*/
export const Medium = Template.bind({})
Medium.args = {
  size: 'medium',
}

/** Example of `small` profile in `40x40` pixel size.*/
export const Small = Template.bind({})
Small.args = {
  size: 'small',
}

/** Example of `x-small` profile in `24x24` pixel size.*/
export const XSmall = Template.bind({})
XSmall.args = {
  size: 'x-small',
}

/** When image can't be loaded or missing the placeholder is displayed. */
export const Unknown = Template.bind({})
Unknown.args = {
  profileUrl: '',
}

/** You can also control if identicon should be visible with `has-identicon` property. */
export const NoIdenticon = Template.bind({})
NoIdenticon.args = {
  hasIdenticon: false,
}
