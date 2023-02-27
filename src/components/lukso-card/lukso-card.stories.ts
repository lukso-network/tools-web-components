import { html } from 'lit-html'
import './index'

/**  Documentation and examples of `lukso-card` component. Cards are using `slots` to put content in different places like `header` or `content`.  */
export default {
  title: 'Design System/Components/lukso-card',
  component: 'lukso-card',
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['basic', 'with-header', 'profile'],
    },
    content: { control: { type: 'text' } },
    header: {
      control: { type: 'text' },
      if: { arg: 'variant', eq: 'with-header' },
    },
    backgroundUrl: {
      control: { type: 'text' },
      if: { arg: 'variant', eq: 'profile' },
    },
    profileUrl: {
      control: { type: 'text' },
      if: { arg: 'variant', eq: 'profile' },
    },
    profileAddress: {
      control: { type: 'text' },
      if: { arg: 'variant', eq: 'profile' },
    },
    isFullWidth: {
      control: { type: 'boolean' },
    },
  },
  args: {
    variant: 'basic',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    header: 'Dolor sit amet',
    backgroundUrl: 'images/sample-background.jpg',
    profileUrl: 'images/sample-avatar.png',
    profileAddress: '0x9671Db683406EE0817B1f5cB6A3b3BD111477457',
    isFullWidth: false,
  },
  parameters: {
    controls: {
      exclude: [
        'defaultStyles',
        'background-url',
        'profile-url',
        'profile-address',
        'is-full-width',
      ],
    },
  },
}

const DefaultTemplate = ({ variant, content, header, isFullWidth }) =>
  html`
    <lukso-card variant=${variant} ?is-full-width=${isFullWidth}>
      <div slot="header" class="p-6">${header}</div>
      <div slot="content" class="p-6">${content}</div>
    </lukso-card>
  `

const CustomHeaderTemplate = ({ variant, content, header }) =>
  html`
    <lukso-card variant=${variant}>
      <div slot="header" class="p-6 relative overflow-hidden min-h-[200px]">
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
}) =>
  html`
    <lukso-card
      variant=${variant}
      background-url=${backgroundUrl}
      profile-url=${profileUrl}
      profile-address=${profileAddress}
    >
      <div slot="content" class="p-6">${content}</div>
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

/** Example of `with-header` variant. */
export const CardWithHeader = DefaultTemplate.bind({})
CardWithHeader.args = {
  variant: 'with-header',
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

/** If you need card to take full width of the parent element add `is-full-width` property.  */
export const FullWidthCard = DefaultTemplate.bind({})
FullWidthCard.args = {
  isFullWidth: true,
}
FullWidthCard.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/NFCh20xAq3Jg2g8A0DNC9I/UI-Library?node-id=1332%3A18025&t=AGmdbG8fXRENuU3o-4',
  },
}
