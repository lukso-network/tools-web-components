import { html, nothing } from 'lit-html'
import { useArgs } from 'storybook/preview-api'

import type { Meta } from '@storybook/web-components-vite'

import './index'
import '../lukso-button'

/**  Documentation and examples of `lukso-modal` component.  */
const meta: Meta = {
  title: 'Design System/Components/lukso-modal',
  component: 'lukso-modal',
  argTypes: {
    isOpen: {
      name: 'is-open',
      control: { type: 'boolean' },
      description: 'Controls the visibility of the modal',
      table: {
        category: 'Attributes',
      },
    },
    disableAnimations: {
      name: 'disable-animations',
      control: { type: 'boolean' },
      description: 'Disables animations',
      table: {
        category: 'Attributes',
      },
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'full', 'auto'],
      table: {
        category: 'Attributes',
      },
    },
    onBackdropClick: {
      name: 'on-backdrop-click',
      description: 'Emitted on backdrop click.',
      table: {
        category: 'Events',
      },
    },
    hasBottomPadding: {
      name: 'has-bottom-padding',
      control: { type: 'boolean' },
      description:
        'Adds extra bottom padding to the modal to prevent modal overlap on mobile devices.',
      table: {
        category: 'Attributes',
      },
    },
    theme: {
      control: { type: 'select' },
      options: ['light', 'dark', 'auto'],
      table: {
        category: 'Global',
      },
    },
    'is-open': {
      name: 'isOpen',
    },
    'has-bottom-padding': {
      name: 'hasBottomPadding',
    },
  },
  args: {
    isOpen: false,
    size: 'small',
    disableAnimations: false,
    hasBottomPadding: false,
  },
  parameters: {
    controls: {
      exclude: [
        'defaultStyles',
        'wrapperStyles',
        'openStyles',
        'overlayStyles',
        'dialogStyles',
        'isOpen',
        'disableAnimations',
        'hasBottomPadding',
      ],
    },
  },
}

export default meta

const Template = ({ size, disableAnimations, hasBottomPadding, theme }) => {
  const [{ isOpen }, updateArgs] = useArgs()

  const handleClose = () => {
    updateArgs({ isOpen: false })
  }

  const handleOpen = () => {
    updateArgs({ isOpen: true })
  }

  return html`<div class="h-[600px]">
    <lukso-button variant="primary" @click=${handleOpen}
      >Show modal</lukso-button
    >
    <lukso-modal
      size=${size ? size : nothing}
      .theme=${theme}
      ?is-open=${isOpen}
      ?disable-animations=${disableAnimations}
      ?has-bottom-padding=${hasBottomPadding}
    >
      <div class="p-6">
        <h1 class="heading-inter-26-semi-bold pb-4 dark:text-neutral-100">
          Lorem ipsum
        </h1>
        <p class="paragraph-inter-16-regular dark:text-neutral-100">
          Vestibulum ante ipsum primis in faucibus orci luctus et ultrices
          posuere cubilia Curae; Donec velit neque, auctor sit amet aliquam vel,
          ullamcorper sit amet ligula. Proin eget tortor risus.
        </p>
        <p class="pt-6">
          <lukso-button
            variant="secondary"
            .theme=${theme}
            is-full-width
            @click=${handleClose}
            >Close</lukso-button
          >
        </p>
      </div>
    </lukso-modal>
  </div>`
}

export const DefaultModal = Template.bind({})
