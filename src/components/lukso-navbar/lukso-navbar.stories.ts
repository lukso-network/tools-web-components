import { html } from 'lit-html'
import './index'

/**  Documentation and examples of `lukso-navbar` component. */
export default {
  title: 'Design System/Components/lukso-navbar',
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

/** Example of default navbar. */
export const DefaultNavbar = Template.bind({})

/** Example of navbar with logo and title in center. You set this by adding `is-center` property. */
export const CenterNavbar = Template.bind({})
CenterNavbar.args = {
  isCenter: true,
}

/** By default navbar stays at the top of the document. If you want it scroll with the content then ad  `is-sticky` property. */
export const StickyNavbar = Template.bind({})
StickyNavbar.args = {
  isSticky: true,
}
