import { html } from 'lit-html'
import { Meta } from '@storybook/web-components'

import './index'

/**  Documentation and examples of `lukso-navbar` component.  */
const meta: Meta = {
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
    onBrandClick: {
      action: 'on-brand-click',
      description: 'Emitted when brand/logo is clicked',
      table: {
        category: 'Events',
      },
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

export default meta

const Template = ({ title, isCenter, isSticky, onBrandClick }) =>
  html`<lukso-navbar
    title=${title}
    ?is-center=${isCenter}
    ?is-sticky=${isSticky}
    @on-brand-click=${onBrandClick}
  ></lukso-navbar>`

/** Example of default navbar. It support `@on-brand-click` event that is fired when clicking on the logo/title. */
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
