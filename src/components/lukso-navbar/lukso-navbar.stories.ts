import { html } from 'lit-html'
import { Meta } from '@storybook/web-components'

import './index'
import '../lukso-button/index'
import '../lukso-icon/index'

/**  Documentation and examples of `lukso-navbar` component.  */
const meta: Meta = {
  title: 'Design System/Components/lukso-navbar',
  component: 'lukso-navbar',
  argTypes: {
    title: {
      control: { type: 'text' },
      table: {
        category: 'Attributes',
      },
    },
    isCenter: {
      name: 'is-center',
      control: { type: 'boolean' },
      table: {
        category: 'Attributes',
      },
    },
    isSticky: {
      name: 'is-sticky',
      control: { type: 'boolean' },
      table: {
        category: 'Attributes',
      },
    },
    isTransparent: {
      name: 'is-transparent',
      control: { type: 'boolean' },
      table: {
        category: 'Attributes',
      },
    },
    onBrandClick: {
      name: 'on-brand-click',
      action: 'on-brand-click',
      description: 'Emitted when brand/logo is clicked',
      table: {
        category: 'Events',
      },
    },
    'is-center': {
      name: 'isCenter',
    },
    'is-sticky': {
      name: 'isSticky',
    },
    'is-transparent': {
      name: 'isTransparent',
    },
  },
  args: {
    title: `UNIVERSAL
PROFILES`,
    isCenter: false,
    isSticky: false,
    isTransparent: false,
  },
  parameters: {
    controls: {
      exclude: [
        'defaultStyles',
        'centerStyles',
        'stickyStyles',
        'isCenter',
        'isSticky',
        'isTransparent',
        'isMenuOpen',
        'transparentStyles',
      ],
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/NFCh20xAq3Jg2g8A0DNC9I/UI-Library?node-id=1097%3A14669&t=AGmdbG8fXRENuU3o-4',
    },
  },
}

export default meta

const Template = ({ title, isCenter, isSticky, isTransparent, onBrandClick }) =>
  html`<lukso-navbar
    title=${title}
    ?is-center=${isCenter}
    ?is-sticky=${isSticky}
    ?is-transparent=${isTransparent}
    @on-brand-click=${onBrandClick}
  ></lukso-navbar>`

const MenuTemplate = ({
  title,
  isCenter,
  isSticky,
  isTransparent,
  onBrandClick,
}) =>
  html`<lukso-navbar
    title=${title}
    ?is-center=${isCenter}
    ?is-sticky=${isSticky}
    ?is-transparent=${isTransparent}
    @on-brand-click=${onBrandClick}
  >
    <div slot="desktop">
      <lukso-button
        variant="text"
        custom-class="text-purple-51 text-12 hover:text-purple-41"
      >
        HOME
      </lukso-button>
      <lukso-button
        variant="text"
        custom-class="text-purple-51 text-12 hover:text-purple-41"
      >
        LOGIN
      </lukso-button>
    </div>
    <div slot="mobile">
      <div class="flex flex-col items-center justify-center h-screen pb-32">
        <lukso-button
          variant="text"
          custom-class="text-purple-51 text-12 hover:text-purple-41"
        >
          HOME
        </lukso-button>
        <lukso-button
          variant="text"
          custom-class="text-purple-51 text-12 hover:text-purple-41"
        >
          LOGIN
        </lukso-button>
      </div>
    </div>
  </lukso-navbar>`

/** Example of default navbar. It support `@on-brand-click` event that is fired when clicking on the logo/title. */
export const DefaultNavbar = Template.bind({})

/** Example of navbar with logo and title in center. You set this by adding `is-center` property. */
export const CenterNavbar = Template.bind({})
CenterNavbar.args = {
  isCenter: true,
}

/** Example of navbar with transparent background and no shadow. You set this by adding `is-transparent` property. */
export const TransparentNavbar = Template.bind({})
TransparentNavbar.args = {
  isCenter: true,
  isTransparent: true,
}

/** By default navbar stays at the top of the document. If you want it scroll with the content then ad  `is-sticky` property. */
export const StickyNavbar = Template.bind({})
StickyNavbar.args = {
  isSticky: true,
}

/** Navbar with menu. It uses `desktop` and `mobile` slots for menus for different devices.  */
export const NavbarWithMenu = MenuTemplate.bind({})
