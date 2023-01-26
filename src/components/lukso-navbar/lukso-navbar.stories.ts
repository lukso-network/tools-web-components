import { html } from 'lit-html'
import './index'

export default {
  title: 'Design System/Atoms/Navbar',
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
  },
}

const Template = ({ title, isCenter, isSticky }) =>
  html`<lukso-navbar
    title=${title}
    ?is-center="${isCenter}"
    ?is-sticky="${isSticky}"
  ></lukso-navbar>`

export const Navbar = Template.bind({})
