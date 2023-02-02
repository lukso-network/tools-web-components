import { html } from 'lit-html'
import './index'

export default {
  title: 'Design System/Components/Navbar',
  component: 'lukso-navbar',
  argTypes: {
    title: {
      control: { type: 'text' },
    },
    isCenter: {
      control: { type: 'boolean' },
    },
    isSticky: {
      control: { type: 'boolean' },
    },
  },
  args: {
    title: `UNIVERSAL
PROFILES`,
    isCenter: false,
    isSticky: false,
  },
  parameters: {
    controls: {
      exclude: [
        'defaultStyles',
        'centerStyles',
        'stickyStyles',
        'is-center',
        'is-sticky',
      ],
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/NFCh20xAq3Jg2g8A0DNC9I/UI-Library?node-id=1097%3A14669&t=AGmdbG8fXRENuU3o-4',
    },
  },
}

const Template = ({ title, isCenter, isSticky }) =>
  html`<lukso-navbar
    title=${title}
    ?is-center=${isCenter}
    ?is-sticky=${isSticky}
  ></lukso-navbar>`

export const DefaultNavbar = Template.bind({})

export const CenterNavbar = Template.bind({})
CenterNavbar.args = {
  isCenter: true,
}
