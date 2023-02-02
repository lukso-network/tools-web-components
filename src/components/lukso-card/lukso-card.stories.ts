import { html } from 'lit-html'
import './index'

export default {
  title: 'Design System/Components/Card',
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
  },
  args: {
    variant: 'basic',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    header: 'Dolor sit amet',
    backgroundUrl: 'images/sample-background.jpg',
    profileUrl: 'images/sample-avatar.png',
    profileAddress: '0x9671Db683406EE0817B1f5cB6A3b3BD111477457',
  },
  parameters: {
    controls: {
      exclude: [
        'defaultStyles',
        'background-url',
        'profile-url',
        'profile-address',
      ],
    },
  },
}

const BasicTemplate = ({ variant, content, header }) =>
  html`
    <lukso-card variant=${variant}>
      <div slot="header" class="p-4">${header}</div>
      <div slot="content" class="p-4">${content}</div>
    </lukso-card>
  `

const CustomHeaderTemplate = ({ variant, content, header }) =>
  html`
    <lukso-card variant=${variant}>
      <div slot="header" class="p-4 relative overflow-hidden min-h-[200px]">
        <div
          class="w-[876px] h-[200px] -left-[257px] top-[72px] bg-neutral-95 rounded-[50%] absolute"
        ></div>
        ${header}
      </div>
      <div slot="content" class="p-4">${content}</div>
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
      <div slot="content" class="p-4">${content}</div>
    </lukso-card>
  `

export const BasicCard = BasicTemplate.bind({})

export const CardWithHeader = BasicTemplate.bind({})
CardWithHeader.args = {
  variant: 'with-header',
}

export const CardWithCustomHeader = CustomHeaderTemplate.bind({})
CardWithCustomHeader.args = {
  variant: 'with-header',
}

export const ProfileCard = ProfileTemplate.bind({})
ProfileCard.args = { variant: 'profile' }
