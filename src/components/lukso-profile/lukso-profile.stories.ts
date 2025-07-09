import { html, nothing } from 'lit-html'

import type { Meta } from '@storybook/web-components'

import './index'

/**
 *  Documentation and examples of `lukso-profile` component.
 *  Profiles comes in `x-small`, `small`, `medium`, `large` and `x-large` size that is set in `size` attribute.
 *  Identicon is generated using `ethereum-blockies-base64` library from `profile-Address` attribute.
 *  To show profile picture pass valid url in `profile-url` attribute.
 */
const meta: Meta = {
  title: 'Design System/Components/lukso-profile',
  component: 'lukso-profile',
  argTypes: {
    profileUrl: {
      name: 'profile-url',
      control: { type: 'text' },
      table: {
        category: 'Attributes',
      },
    },
    size: {
      control: {
        type: 'select',
      },
      options: [
        '2x-small',
        'x-small',
        'small',
        'medium',
        'large',
        'x-large',
        '2x-large',
      ],
      table: {
        category: 'Attributes',
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
    isSquare: {
      name: 'is-square',
      control: { type: 'boolean' },
      table: {
        category: 'Attributes',
      },
    },
    placeholder: {
      control: { type: 'text' },
      table: {
        category: 'Attributes',
      },
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
    'is-square': {
      name: 'isSquare',
    },
  },
  args: {
    profileUrl: 'images/sample-avatar.jpg',
    size: 'x-large',
    profileAddress: '0x9671Db683406EE0817B1f5cB6A3b3BD111477457',
    hasIdenticon: true,
    isSquare: false,
    placeholder: undefined,
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
        'isSquare',
        'profileStyles',
      ],
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/NFCh20xAq3Jg2g8A0DNC9I/UI-Library?node-id=378%3A3395&t=AGmdbG8fXRENuU3o-4',
    },
  },
}

export default meta

const Template = ({
  profileUrl,
  size,
  profileAddress,
  hasIdenticon,
  isSquare,
  placeholder,
}) =>
  html`<lukso-profile
    profile-url=${profileUrl ? profileUrl : nothing}
    size=${size ? size : nothing}
    profile-address=${profileAddress ? profileAddress : nothing}
    ?has-identicon=${hasIdenticon}
    ?is-square=${isSquare}
    placeholder=${placeholder ? placeholder : nothing}
  ></lukso-profile>`

/** Example of `2x-large` profile in `120x120` pixel size.*/
export const XXLarge = Template.bind({})
XXLarge.args = {
  size: '2x-large',
}

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

/** Example of `2x-small` profile in `16x16` pixel size.*/
export const XXSmall = Template.bind({})
XXSmall.args = {
  size: '2x-small',
}

/** When image can't be loaded or missing the placeholder is displayed. */
export const Unknown = Template.bind({})
Unknown.args = {
  profileUrl: '',
}

/** You can also control if identicon should be visible with `has-identicon` attribute. */
export const NoIdenticon = Template.bind({})
NoIdenticon.args = {
  hasIdenticon: false,
}

/** You can also show square profile using `is-square` attribute. */
export const Square = Template.bind({})
Square.args = {
  isSquare: true,
}

/** You can also change default placeholder using `placeholder` attribute. */
export const Placeholder = Template.bind({})
Placeholder.args = {
  profileUrl: '',
  placeholder: '/assets/images/token-default.svg',
}
