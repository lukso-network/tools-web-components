import { html } from 'lit-html'
import './lukso-navbar'

export default {
  title: 'Design System/Atoms/Navbar',
  component: 'lukso-navbar',
  argTypes: {
    title: {
      control: { type: 'text' },
    },
  },
  args: {
    title: 'UNIVERSAL<br>PROFILES',
  },
}

const Template = ({ title }) =>
  html`<lukso-navbar title=${title}></lukso-navbar>`

export const Navbar = Template.bind({})
