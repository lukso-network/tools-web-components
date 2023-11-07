import { html } from 'lit-html'
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
    isFixedWidth: {
      name: 'is-fixed-width',
      control: { type: 'boolean' },
      table: {
        category: 'Attributes',
      },
    },
    isFixedHeight: {
      name: 'is-fixed-height',
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
    headerClass: {
      name: 'header-class',
      control: { type: 'text' },
      table: {
        category: 'Attributes',
      },
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium'],
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
    'is-fixed-width': {
      name: 'isFixedWidth',
    },
    'is-fixed-height': {
      name: 'isFixedHeight',
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
  },
  args: {
    variant: 'basic',
    header: 'Dolor sit amet',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    bottom: 'Lorem ipsum dolor sit amet, consectetur',
    backgroundUrl: 'images/sample-background.jpg',
    profileUrl: 'images/sample-avatar.png',
    profileAddress: '0x9671Db683406EE0817B1f5cB6A3b3BD111477457',
    isFixedWidth: false,
    isFixedHeight: false,
    customClass: '',
    size: 'medium',
    isHoverable: false,
  },
  parameters: {
    controls: {
      exclude: [
        'defaultStyles',
        'backgroundUrl',
        'profileUrl',
        'profileAddress',
        'isFixedWidth',
        'isFixedHeight',
        'styles',
        'customClass',
        'isHoverable',
        'mediumStyles',
        'smallStyles',
        'smallHoverStyles',
        'headerClass',
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
  isFixedHeight,
  isFixedWidth,
  customClass,
  size,
  isHoverable,
  backgroundUrl,
  profileUrl,
  profileAddress,
}) => html`
  <lukso-card
    variant=${variant}
    ?is-fixed-width=${isFixedWidth}
    ?is-fixed-height=${isFixedHeight}
    custom-class=${customClass}
    size=${size}
    ?is-hoverable=${isHoverable}
    background-url=${backgroundUrl}
    profile-url=${profileUrl}
    profile-address=${profileAddress}
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
  isFixedHeight,
  isFixedWidth,
  customClass,
  size,
  isHoverable,
}) => html`
  <lukso-card
    variant=${variant}
    ?is-fixed-width=${isFixedWidth}
    ?is-fixed-height=${isFixedHeight}
    custom-class=${customClass}
    size=${size}
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
  isFixedHeight,
  isFixedWidth,
  customClass,
  size,
  isHoverable,
  bottom,
  headerClass,
}) => html`
  <lukso-card
    variant=${variant}
    background-url=${backgroundUrl}
    profile-url=${profileUrl}
    profile-address=${profileAddress}
    ?is-fixed-width=${isFixedWidth}
    ?is-fixed-height=${isFixedHeight}
    custom-class=${customClass}
    size=${size}
    ?is-hoverable=${isHoverable}
    header-class=${headerClass}
  >
    <div slot="content" class="p-6">${content}</div>
    <div slot="bottom" class="p-6">${bottom}</div>
  </lukso-card>
`

const HeroTemplate = ({
  backgroundUrl,
  profileUrl,
  profileAddress,
  isFixedHeight,
  isFixedWidth,
  customClass,
  size,
  isHoverable,
}) => html`
  <lukso-card
    variant="hero"
    background-url=${backgroundUrl}
    ?is-fixed-width=${isFixedWidth}
    ?is-fixed-height=${isFixedHeight}
    custom-class=${customClass}
    size=${size}
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

/** If you need card with fixed size of `362px` you can add `is-fixed-width` property, otherwise card take 100% width.  */
export const FixedCard = DefaultTemplate.bind({})
FixedCard.args = {
  isFixedWidth: true,
  isFixedHeight: true,
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
  isFixedWidth: true,
  isFixedHeight: true,
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
  isFixedWidth: true,
  isFixedHeight: true,
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
  isFixedWidth: true,
  isFixedHeight: true,
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
  isFixedWidth: true,
  isFixedHeight: true,
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
  isFixedWidth: true,
  isFixedHeight: true,
  customClass: 'rounded-12 bg-warm-97',
}
CustomCard.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/NFCh20xAq3Jg2g8A0DNC9I/UI-Library?node-id=1332%3A18025&t=AGmdbG8fXRENuU3o-4',
  },
}

/** You can select card size with `size` property.  */
export const SmallCard = DefaultTemplate.bind({})
SmallCard.args = {
  size: 'small',
}

/** Card can be as hoverable element with `is-hoverable` property.  */
export const HoverableCard = DefaultTemplate.bind({})
HoverableCard.args = {
  size: 'small',
  isHoverable: true,
}
