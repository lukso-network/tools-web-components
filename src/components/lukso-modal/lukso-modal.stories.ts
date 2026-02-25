import { html, nothing } from 'lit-html'
import { useArgs } from 'storybook/preview-api'

import type { Meta, StoryFn } from '@storybook/web-components-vite'

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
    '--lukso-modal-border-radius': {
      name: '--lukso-modal-border-radius',
      control: { type: 'text' },
      description: 'Border radius of the dialog panel.',
      table: {
        category: 'Style',
        defaultValue: { summary: '12px' },
      },
    },
    '--lukso-modal-bg': {
      name: '--lukso-modal-bg',
      control: { type: 'color' },
      description: 'Background color of the dialog panel (light mode).',
      table: {
        category: 'Style',
        defaultValue: { summary: '#f8fafb' },
      },
    },
    '--lukso-modal-dark-bg': {
      name: '--lukso-modal-dark-bg',
      control: { type: 'color' },
      description: 'Background color of the dialog panel (dark mode).',
      table: {
        category: 'Style',
        defaultValue: { summary: '#121b21' },
      },
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

const cssVarStyle = (args: Record<string, unknown>) => {
  const props = [
    ['--lukso-modal-border-radius', args['--lukso-modal-border-radius']],
    ['--lukso-modal-bg', args['--lukso-modal-bg']],
    ['--lukso-modal-dark-bg', args['--lukso-modal-dark-bg']],
  ]
    .filter(([, v]) => v)
    .map(([k, v]) => `${k}: ${v}`)
    .join('; ')
  return props || nothing
}

const Template: StoryFn = args => {
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
      size=${args.size ? args.size : nothing}
      .theme=${args.theme}
      ?is-open=${isOpen}
      ?disable-animations=${args.disableAnimations}
      ?has-bottom-padding=${args.hasBottomPadding}
      style=${cssVarStyle(args)}
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
            .theme=${args.theme}
            is-full-width
            @click=${handleClose}
            >Close</lukso-button
          >
        </p>
      </div>
    </lukso-modal>
  </div>`
}

export const DefaultModal: StoryFn = Template.bind({})

export const CustomStyled: StoryFn = Template.bind({})
CustomStyled.args = {
  '--lukso-modal-border-radius': '24px',
  '--lukso-modal-bg': '#eef2ff',
  '--lukso-modal-dark-bg': '#1e1b4b',
}
