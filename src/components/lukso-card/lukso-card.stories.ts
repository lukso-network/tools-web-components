import { html, nothing } from 'lit-html'
import { Meta } from '@storybook/web-components'

import './index'
import '../lukso-profile'
import '../lukso-username'

/**  Documentation and examples of `lukso-card` component. Cards are using `slots` to put content in different places like `header` or `content`.  */
const meta: Meta = {
  title: 'Design System/Components/lukso-card',
  component: 'lukso-card',
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['basic', 'with-header', 'profile', 'profile-2', 'hero', 'dapp'],
      table: {
        category: 'Attributes',
      },
    },
    content: { control: { type: 'text' } },
    bottom: { control: { type: 'text' } },
    header: {
      control: { type: 'text' },
    },
    backgroundUrl: {
      name: 'background-url',
      control: { type: 'text' },
      table: {
        category: 'Attributes',
      },
    },
    profileUrl: {
      name: 'profile-url',
      control: { type: 'text' },
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
    width: {
      name: 'width',
      control: { type: 'number' },
      table: {
        category: 'Attributes',
      },
    },
    height: {
      name: 'height',
      control: { type: 'number' },
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
    headerClass: {
      name: 'header-class',
      control: { type: 'text' },
      table: {
        category: 'Attributes',
      },
    },
    borderRadius: {
      name: 'border-radius',
      control: { type: 'select' },
      options: ['none', 'small', 'medium'],
      table: {
        category: 'Attributes',
      },
    },
    shadow: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
      table: {
        category: 'Attributes',
      },
    },
    isHoverable: {
      name: 'is-hoverable',
      control: { type: 'boolean' },
      table: {
        category: 'Attributes',
      },
    },
    'background-url': {
      name: 'backgroundUrl',
    },
    'profile-url': {
      name: 'profileUrl',
    },
    'profile-address': {
      name: 'profileAddress',
    },
    'custom-class': {
      name: 'customClass',
    },
    'is-hoverable': {
      name: 'isHoverable',
    },
    'header-class': {
      name: 'headerClass',
    },
    'border-radius': {
      name: 'borderRadius',
    },
  },
  args: {
    variant: 'basic',
    header: 'Dolor sit amet',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    bottom: 'Lorem ipsum dolor sit amet, consectetur',
    backgroundUrl: 'images/sample-background.jpg',
    profileUrl: 'images/sample-avatar.jpg',
    profileAddress: '0x9671Db683406EE0817B1f5cB6A3b3BD111477457',
    width: undefined,
    height: undefined,
    customClass: '',
    borderRadius: 'medium',
    isHoverable: false,
    shadow: 'large',
  },
  parameters: {
    controls: {
      exclude: [
        'backgroundUrl',
        'profileUrl',
        'profileAddress',
        'styles',
        'customClass',
        'isHoverable',
        'mediumStyles',
        'smallStyles',
        'smallHoverStyles',
        'headerClass',
        'cardStyles',
        'borderRadius',
      ],
    },
  },
}

export default meta

const DefaultTemplate = ({
  variant,
  content,
  header,
  bottom,
  height,
  width,
  customClass,
  borderRadius,
  isHoverable,
  backgroundUrl,
  profileUrl,
  profileAddress,
  shadow,
}) => html`
  <lukso-card
    variant=${variant ? variant : nothing}
    width=${width ? width : nothing}
    height=${height ? height : nothing}
    custom-class=${customClass ? customClass : nothing}
    border-radius=${borderRadius ? borderRadius : nothing}
    background-url=${backgroundUrl ? backgroundUrl : nothing}
    profile-url=${profileUrl ? profileUrl : nothing}
    profile-address=${profileAddress ? profileAddress : nothing}
    shadow=${shadow ? shadow : nothing}
    ?is-hoverable=${isHoverable}
  >
    <div slot="header" class="p-6">${header}</div>
    <div slot="content" class="p-6">${content}</div>
    <div slot="bottom" class="p-6">${bottom}</div>
  </lukso-card>
`

const CustomHeaderTemplate = ({
  variant,
  content,
  header,
  height,
  width,
  customClass,
  borderRadius,
  isHoverable,
  shadow,
}) => html`
  <lukso-card
    variant=${variant ? variant : nothing}
    width=${width ? width : nothing}
    height=${height ? height : nothing}
    custom-class=${customClass ? customClass : nothing}
    border-radius=${borderRadius ? borderRadius : nothing}
    shadow=${shadow ? shadow : nothing}
    ?is-hoverable=${isHoverable}
  >
    <div slot="header" class="p-6 pb-12 relative overflow-hidden min-h-[200px]">
      <div
        class="w-[876px] h-[200px] -left-[257px] top-[72px] bg-neutral-95 rounded-[50%] absolute"
      ></div>
      ${header}
    </div>
    <div slot="content" class="p-6">${content}</div>
  </lukso-card>
`

const ProfileTemplate = ({
  variant,
  content,
  backgroundUrl,
  profileUrl,
  profileAddress,
  height,
  width,
  customClass,
  borderRadius,
  isHoverable,
  bottom,
  headerClass,
}) => html`
  <lukso-card
    variant=${variant}
    background-url=${backgroundUrl}
    profile-url=${profileUrl}
    profile-address=${profileAddress}
    width=${width ? width : nothing}
    height=${height ? height : nothing}
    custom-class=${customClass}
    border-radius=${borderRadius}
    ?is-hoverable=${isHoverable}
    header-class=${headerClass}
  >
    <div slot="content" class="px-6 pb-9 break-words">${content}</div>
    <div slot="bottom" class="p-6">${bottom}</div>
  </lukso-card>
`

const HeroTemplate = ({
  backgroundUrl,
  profileUrl,
  profileAddress,
  height,
  width,
  customClass,
  borderRadius,
  isHoverable,
}) => html`
  <lukso-card
    variant="hero"
    background-url=${backgroundUrl}
    width=${width ? width : nothing}
    height=${height ? height : nothing}
    custom-class=${customClass}
    border-radius=${borderRadius}
    ?is-hoverable=${isHoverable}
  >
    <div slot="content" class="flex flex-col items-center">
      <lukso-profile
        profile-url=${profileUrl}
        profile-address=${profileAddress}
        has-identicon
        class="mb-4"
      >
      </lukso-profile>
      <lukso-username
        name="User123"
        size="large"
        address-color="neutral-100"
        name-color="neutral-100"
      ></lukso-username>
      <lukso-username
        address=${profileAddress}
        size="small"
        slice-by="40"
        address-color="neutral-100"
        name-color="neutral-100"
      ></lukso-username>
    </div>
  </lukso-card>
`

/** By default card is using `basic` variant.  */
export const DefaultCard = DefaultTemplate.bind({})
DefaultCard.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/NFCh20xAq3Jg2g8A0DNC9I/UI-Library?node-id=1332%3A18025&t=AGmdbG8fXRENuU3o-4',
  },
}

/** If you need card with fixed size of `362px` you can add `width` property, otherwise card take 100% width.  */
export const FixedCard = DefaultTemplate.bind({})
FixedCard.args = {
  width: 364,
  height: 534,
}
FixedCard.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/NFCh20xAq3Jg2g8A0DNC9I/UI-Library?node-id=1332%3A18025&t=AGmdbG8fXRENuU3o-4',
  },
}

/** Example of `with-header` variant. */
export const CardWithHeader = DefaultTemplate.bind({})
CardWithHeader.args = {
  variant: 'with-header',
  width: 364,
  height: 534,
}
CardWithHeader.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/NFCh20xAq3Jg2g8A0DNC9I/UI-Library?node-id=1332%3A18028&t=AGmdbG8fXRENuU3o-4',
  },
}

/** Example of `with-header` variant that has additional background element. */
export const CardWithCustomHeader = CustomHeaderTemplate.bind({})
CardWithCustomHeader.args = {
  variant: 'with-header',
  width: 364,
  height: 534,
}
CardWithCustomHeader.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/NFCh20xAq3Jg2g8A0DNC9I/UI-Library?node-id=1332%3A18026&t=AGmdbG8fXRENuU3o-4',
  },
}

/** Example of `profile` variant. This variant additionally uses `background-url`, `profile-url` and `profile-address` properties.  */
export const ProfileCard = ProfileTemplate.bind({})
ProfileCard.args = {
  variant: 'profile',
  width: 262,
  height: 258,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/NFCh20xAq3Jg2g8A0DNC9I/UI-Library?node-id=1096%3A14641&t=AGmdbG8fXRENuU3o-4',
    },
  },
}
ProfileCard.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/NFCh20xAq3Jg2g8A0DNC9I/UI-Library?node-id=1332%3A18027&t=AGmdbG8fXRENuU3o-4',
  },
}

/** Example of `profile-2` variant.  */
export const Profile2Card = ProfileTemplate.bind({})
Profile2Card.args = {
  variant: 'profile-2',
  width: 364,
  height: 534,
}

/** Example of `hero` variant.  */
export const HeroCard = HeroTemplate.bind({})
HeroCard.args = {
  variant: 'hero',
}

/** Example of `dapp` variant.  */
export const DappCard = ProfileTemplate.bind({})
DappCard.args = {
  variant: 'dapp',
}

/** You can customize card with `custom-class` property, it will be used instead of default styles.  */
export const CustomCard = DefaultTemplate.bind({})
CustomCard.args = {
  width: 364,
  height: 534,
  customClass: 'rounded-12 bg-warm-97',
}
CustomCard.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/NFCh20xAq3Jg2g8A0DNC9I/UI-Library?node-id=1332%3A18025&t=AGmdbG8fXRENuU3o-4',
  },
}

/** You can select card border radius with `borderRadius` property.  */
export const SmallCard = DefaultTemplate.bind({})
SmallCard.args = {
  borderRadius: 'small',
}

/** Card can be as hoverable element with `is-hoverable` property.  */
export const HoverableCard = DefaultTemplate.bind({})
HoverableCard.args = {
  borderRadius: 'small',
  shadow: 'medium',
  isHoverable: true,
}

/** You can select card shadow with `shadow` property.  */
export const Shadow = DefaultTemplate.bind({})
Shadow.args = {
  shadow: 'small',
}
