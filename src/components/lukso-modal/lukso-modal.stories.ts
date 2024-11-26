import { html } from 'lit-html'
import { useArgs } from '@storybook/client-api'

import type { Meta } from '@storybook/web-components'

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
    'is-open': {
      name: 'isOpen',
    },
  },
  args: {
    isOpen: false,
    size: 'small',
    disableAnimations: false,
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
      ],
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/NFCh20xAq3Jg2g8A0DNC9I/UI-Library?node-id=1433%3A18445&t=nSFDgQdJOIWV2fQz-4',
    },
  },
}

export default meta

const Template = ({ size }) => {
  const [{ isOpen }, updateArgs] = useArgs()

  const handleClose = () => {
    updateArgs({ isOpen: false })
  }

  const handleOpen = () => {
    updateArgs({ isOpen: true })
  }

  return html` <lukso-button variant="primary" @click=${handleOpen}
      >Show modal</lukso-button
    >
    <lukso-modal ?is-open=${isOpen} size=${size}>
      <div class="p-6">
        <h1 class="heading-inter-26-semi-bold pb-4">Lorem ipsum</h1>
        <p class="paragraph-inter-16-regular">
          Vestibulum ante ipsum primis in faucibus orci luctus et ultrices
          posuere cubilia Curae; Donec velit neque, auctor sit amet aliquam vel,
          ullamcorper sit amet ligula. Proin eget tortor risus.
        </p>
        <p class="pt-6">
          <lukso-button variant="primary" is-full-width @click=${handleClose}
            >Close</lukso-button
          >
        </p>
      </div>
    </lukso-modal>`
}

export const DefaultModal = Template.bind({})
