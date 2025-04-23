import { html, nothing } from 'lit-html'
import { unsafeHTML } from 'lit/directives/unsafe-html.js'

import type { Meta } from '@storybook/web-components'

import './index'
import '../lukso-button/index'
import '../lukso-icon/index'
import '../lukso-search/index'

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
    isTestnet: {
      name: 'is-testnet',
      control: { type: 'boolean' },
      table: {
        category: 'Attributes',
      },
    },
    icon: {
      control: { type: 'text' },
      table: {
        category: 'Attributes',
      },
    },
    hasMenu: {
      name: 'has-menu',
      control: { type: 'boolean' },
      table: {
        category: 'Attributes',
      },
    },
    hasMobileDropdownMenu: {
      name: 'has-mobile-dropdown-menu',
      control: { type: 'boolean' },
      table: {
        category: 'Attributes',
      },
    },
    logoUrl: {
      name: 'logo-url',
      control: { type: 'text' },
      table: {
        category: 'Attributes',
      },
    },
    mobileBreakpoint: {
      name: 'mobile-breakpoint',
      control: { type: 'select' },
      options: ['sm', 'md', 'lg', 'xl', '2xl'],
      table: { category: 'Attributes' },
    },
    onBrandClick: {
      name: 'on-brand-click',
      action: 'on-brand-click',
      description: 'Emitted when brand/logo is clicked',
      table: {
        category: 'Events',
      },
    },
    onIconClick: {
      name: 'on-icon-click',
      action: 'on-icon-click',
      description: 'Emitted when icon is clicked',
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
    'is-testnet': {
      name: 'isTestnet',
    },
    'has-menu': {
      name: 'hasMenu',
    },
    'logo-url': {
      name: 'logoUrl',
    },
    'mobile-breakpoint': {
      name: 'mobileBreakpoint',
    },
    'has-mobile-dropdown-menu': {
      name: 'hasMobileDropdownMenu',
    },
  },
  args: {
    title: `UNIVERSAL
PROFILES`,
    isCenter: false,
    isSticky: false,
    isTransparent: false,
    isTestnet: false,
    hasMenu: false,
    hasMobileDropdownMenu: false,
    icon: 'wallet-outline',
    logoUrl: '',
    mobileBreakpoint: 'md',
  },
  parameters: {
    controls: {
      exclude: [
        'isCenter',
        'isSticky',
        'isTransparent',
        'isMenuOpen',
        'isTestnet',
        'hasMenu',
        'logoUrl',
        'defaultLogoUrl',
        'mobileBreakpoint',
        'hasMobileDropdownMenu',
      ],
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/NFCh20xAq3Jg2g8A0DNC9I/UI-Library?node-id=1097%3A14669&t=AGmdbG8fXRENuU3o-4',
    },
  },
}

export default meta

const Template = ({
  title,
  isCenter,
  isSticky,
  isTransparent,
  isTestnet,
  icon,
  hasMenu,
  hasMobileDropdownMenu,
  logoUrl,
  slots,
  mobileBreakpoint,
  onBrandClick,
  onIconClick,
}) => html`
  <lukso-navbar
    title=${title ? title : nothing}
    icon=${icon ? icon : nothing}
    logo-url=${logoUrl ? logoUrl : nothing}
    mobile-breakpoint=${mobileBreakpoint ? mobileBreakpoint : nothing}
    ?is-center=${isCenter}
    ?is-sticky=${isSticky}
    ?is-transparent=${isTransparent}
    ?is-testnet=${isTestnet}
    ?has-menu=${hasMenu}
    ?has-mobile-dropdown-menu=${hasMobileDropdownMenu}
    @on-brand-click=${onBrandClick}
    @on-icon-click=${onIconClick}
  >
    ${slots?.menu?.desktop
      ? html`<div slot="desktop-menu">${unsafeHTML(slots?.menu?.desktop)}</div>`
      : nothing}
    ${slots?.menu?.mobile
      ? html`<div slot="mobile-menu">${unsafeHTML(slots?.menu?.mobile)}</div>`
      : nothing}
    ${slots?.center?.desktop
      ? html`<div slot="desktop-center">
          ${unsafeHTML(slots?.center?.desktop)}
        </div>`
      : nothing}
    ${slots?.mobileDropdown
      ? html`<div slot="mobile-dropdown" class="flex">
          ${unsafeHTML(slots?.mobileDropdown)}
        </div>`
      : nothing}
  </lukso-navbar>
`

/** Example of default navbar.  */
export const DefaultNavbar = Template.bind({})

/** Example of navbar with logo and title in center. You set this by adding `is-center` attribute. */
export const CenterNavbar = Template.bind({})
CenterNavbar.args = {
  isCenter: true,
}

/** Example of navbar with transparent background and no shadow. You set this by adding `is-transparent` attribute. */
export const TransparentNavbar = Template.bind({})
TransparentNavbar.args = {
  isTransparent: true,
}

/** By default navbar stays at the top of the document. If you want it scroll with the content then ad  `is-sticky` attribute. */
export const StickyNavbar = Template.bind({})
StickyNavbar.args = {
  isSticky: true,
}

/** Navbar with menu. It uses `desktop` and `mobile` slots for menus for different devices. It also require `has-menu` attribute to be set.  */
export const NavbarWithMenu = Template.bind({})
NavbarWithMenu.args = {
  hasMenu: true,
  slots: {
    menu: {
      desktop: `<lukso-button
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
    </lukso-button>`,
    },
  },
}

/** Example of navbar with testnet badge. You set this by adding `is-testnet` attribute. */
export const TestnetNavbar = Template.bind({})
TestnetNavbar.args = {
  isTestnet: true,
}

/** Example of navbar with custom logo. You set this by adding `logo-url` attribute. */
export const CustomLogoNavbar = Template.bind({})
CustomLogoNavbar.args = {
  logoUrl: '/assets/images/lukso-logo.svg',
  icon: '',
}

/** Example of navbar with `lukso-search` component. */
export const SearchNavbar = Template.bind({})
SearchNavbar.args = {
  hasMenu: true,
  slots: {
    center: {
      desktop: '<lukso-search placeholder="Search..."></lukso-search>',
    },
  },
}

/** Example of mobile navbar with mobile menu slot (change viewport width to see the effect). */
export const MobileMenuNavbar = Template.bind({})
MobileMenuNavbar.args = {
  icon: '',
  hasMenu: true,
  slots: {
    menu: {
      mobile: `<div class="flex justify-end items-center"><lukso-icon name="search"></lukso-icon></div>`,
    },
  },
}

/** Example of mobile navbar with mobile dropdown menu (change viewport width to see the effect). */
export const MobileDropdownNavbar = Template.bind({})
MobileDropdownNavbar.args = {
  icon: '',
  hasMenu: true,
  hasMobileDropdownMenu: true,
  slots: {
    mobileDropdown: `<div class="flex flex-col items-center justify-center h-screen pb-32">
        <lukso-button
          variant="text"
          custom-class="text-purple-51 text-12 hover:text-purple-41"
        >
          HOME
        </lukso-button>
        </div>`,
  },
}
