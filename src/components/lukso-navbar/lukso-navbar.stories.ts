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
  },
  args: {
    title: `UNIVERSAL
PROFILES`,
    isCenter: false,
  },
  parameters: {
    controls: {
      exclude: ['defaultStyles'],
    },
  },
}

const Template = ({ title, isCenter }) =>
  html`<lukso-navbar title=${title} ?is-center="${isCenter}"></lukso-navbar>`

export const Navbar = Template.bind({})
