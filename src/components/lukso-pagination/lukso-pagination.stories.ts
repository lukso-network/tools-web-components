import { html, nothing } from 'lit-html'

import type { Meta } from '@storybook/web-components-vite'

import './index'

/**  Documentation and examples of `lukso-pagination` component. */
const meta: Meta = {
  title: 'Design System/Components/lukso-pagination',
  component: 'lukso-pagination',
  argTypes: {
    size: {
      control: {
        type: 'select',
      },
      options: ['small', 'medium', 'large'],
      table: {
        category: 'Attributes',
      },
    },
    variant: {
      control: { type: 'select' },
      options: [
        'primary',
        'secondary',
        'landing',
        'text',
        'nav-button',
        'nav-text',
        'link',
      ],
      table: {
        category: 'Attributes',
      },
    },
    currentPage: {
      name: 'current-page',
      control: {
        type: 'number',
      },
      table: {
        category: 'Attributes',
      },
    },
    totalPages: {
      name: 'total-pages',
      control: {
        type: 'number',
      },
      table: {
        category: 'Attributes',
      },
    },
    isMobile: {
      name: 'is-mobile',
      control: {
        type: 'boolean',
      },
      table: {
        category: 'Attributes',
      },
    },
    onPageChange: {
      name: 'on-page-change',
      description: 'Event emitted when the page is changed.',
      table: {
        category: 'Events',
      },
    },
    'current-page': {
      name: 'currentPage',
    },
    'total-pages': {
      name: 'totalPages',
    },
    'is-mobile': {
      name: 'isMobile',
    },
  },
  args: {
    size: 'small',
    variant: 'secondary',
    currentPage: 1,
    totalPages: 12,
    isMobile: false,
  },
  parameters: {
    controls: {
      exclude: [
        'styles',
        'currentPage',
        'totalPages',
        'pagination',
        'isMobile',
      ],
    },
  },
}

export default meta

const Template = ({
  size,
  currentPage,
  totalPages,
  variant,
  onPageChange,
  isMobile,
}) =>
  html`<lukso-pagination
    size=${size ? size : nothing}
    variant=${variant ? variant : nothing}
    current-page=${currentPage ? currentPage : nothing}
    total-pages=${totalPages ? totalPages : nothing}
    ?is-mobile=${isMobile}
    @on-page-change=${onPageChange}
  ></lukso-pagination>`

/** Example of default pagination. */
export const Default = Template.bind({})
Default.parameters = {}

/** Example of active page in the middle. */
export const MiddlePage = Template.bind({})
MiddlePage.args = {
  currentPage: 6,
}

/** Example of active page in the end. */
export const EndPage = Template.bind({})
EndPage.args = {
  currentPage: 12,
}

/** Example of medium size. */
export const MediumSize = Template.bind({})
MediumSize.args = {
  size: 'medium',
}

/** Example of primary variant. */
export const PrimaryVariant = Template.bind({})
PrimaryVariant.args = {
  variant: 'primary',
}

/** Example of landing variant. */
export const LandingVariant = Template.bind({})
LandingVariant.args = {
  variant: 'landing',
}

/** Example of text variant. */
export const TextVariant = Template.bind({})
TextVariant.args = {
  variant: 'text',
}

/** Example of nav-button variant. */
export const NavButtonVariant = Template.bind({})
NavButtonVariant.args = {
  variant: 'nav-button',
}

/** Example of nav-text variant. */
export const NavTextVariant = Template.bind({})
NavTextVariant.args = {
  variant: 'nav-text',
}

/** Example of link variant. */
export const LinkVariant = Template.bind({})
LinkVariant.args = {
  variant: 'link',
}

/** Example mobile pagination. */
export const Mobile = Template.bind({})
Mobile.args = {
  isMobile: true,
  size: 'medium',
}
