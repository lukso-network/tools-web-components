import { html } from 'lit-html'
import { within } from '@storybook/testing-library'
import { expect } from '@storybook/jest'
import { unsafeHTML } from 'lit/directives/unsafe-html.js'
import { Meta } from '@storybook/web-components'

import './index'
import '../lukso-icon'

/**  Documentation and examples of `lukso-button` component. */
const meta: Meta = {
  title: 'Design System/Components/lukso-button',
  component: 'lukso-button',
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'landing', 'text'],
    },
    isLink: {
      control: { type: 'boolean' },
      description: 'If true, button will be rendered as a link',
    },
    disabled: {
      control: { type: 'boolean' },
      if: { arg: 'isLink', truthy: false },
    },
    text: {
      control: { type: 'text' },
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium'],
    },
    isFullWidth: {
      control: { type: 'boolean' },
      if: { arg: 'isLink', truthy: false },
    },
    isLongPress: {
      control: { type: 'boolean' },
      if: { arg: 'isLink', truthy: false },
    },
    href: {
      control: { type: 'text' },
      if: { arg: 'isLink' },
    },
    target: {
      control: { type: 'select' },
      options: ['_blank', '_self', '_parent', '_top'],
      if: { arg: 'isLink' },
    },
    rel: {
      control: { type: 'text' },
      if: { arg: 'isLink' },
    },
    onLongPressComplete: {
      description: 'Emitted when long press is completed',
      table: {
        category: 'Events',
      },
    },
  },
  args: {
    text: 'Hello World',
    isLink: false,
    disabled: false,
    size: 'medium',
    variant: 'primary',
    isFullWidth: false,
    isLongPress: false,
    href: 'https://lukso.network',
    target: '_blank',
    rel: 'noopener noreferrer',
  },
  parameters: {
    controls: {
      exclude: [
        'defaultStyles',
        'secondaryStyles',
        'primaryStyles',
        'landingStyles',
        'textStyles',
        'linkStyles',
        'buttonStyles',
        'mediumSize',
        'smallSize',
        'is-full-width',
        'is-long-press',
        'longPressStyles',
        'noTransition',
        'isPressed',
        'timer',
        'pressedStyles',
        'noTransitionStyles',
        'handleMouseDown',
        'handleMouseUp',
        'is-link',
        'custom-class',
        'styles',
      ],
    },
  },
}

export default meta

const Template = ({
  variant,
  disabled,
  text,
  size,
  isFullWidth,
  isLongPress,
  isLink,
  href,
  target,
  rel,
}) =>
  html`<lukso-button
    variant=${variant}
    ?disabled=${disabled}
    size=${size}
    ?is-full-width=${isFullWidth}
    ?is-long-press=${isLongPress}
    ?is-link=${isLink}
    href=${href}
    target=${target}
    rel=${rel}
    >${text}</lukso-button
  >`

const LongPressTemplate = ({
  variant,
  disabled,
  text,
  size,
  isFullWidth,
  isLongPress,
  onLongPressComplete,
}) =>
  html`<lukso-button
    variant=${variant}
    ?disabled=${disabled}
    size=${size}
    ?is-full-width=${isFullWidth}
    ?is-long-press=${isLongPress}
    @on-long-press-complete=${onLongPressComplete}
    >${text}</lukso-button
  >`

/** By default button is using `primary` variant. */
export const Primary = Template.bind({})
Primary.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/NFCh20xAq3Jg2g8A0DNC9I/UI-Library?node-id=743%3A9778&t=AGmdbG8fXRENuU3o-4',
  },
}

Primary.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)

  // 👇 Assert DOM structure
  expect(canvas.getByText('Hello World')).toBeInTheDocument()
}

/** Example of `secondary` variant. */
export const Secondary = Template.bind({})
Secondary.args = {
  variant: 'secondary',
}
Secondary.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/NFCh20xAq3Jg2g8A0DNC9I/UI-Library?node-id=743%3A9745&t=AGmdbG8fXRENuU3o-4',
  },
}

/** Example of `landing` variant.  */
export const Landing = Template.bind({})
Landing.args = {
  variant: 'landing',
}
Landing.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/NFCh20xAq3Jg2g8A0DNC9I/UI-Library?node-id=743%3A9912&t=AGmdbG8fXRENuU3o-4',
  },
}

/** Example of `text` variant.  */
export const Text = Template.bind({})
Text.args = {
  variant: 'text',
}
Text.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/NFCh20xAq3Jg2g8A0DNC9I/UI-Library?node-id=743%3A9912&t=AGmdbG8fXRENuU3o-4',
  },
}

/** If you need button to take full width of the parent element add `is-full-width` property. */
export const FullWidth = Template.bind({})
FullWidth.args = {
  isFullWidth: true,
}
FullWidth.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/NFCh20xAq3Jg2g8A0DNC9I/UI-Library?node-id=743%3A9778&t=AGmdbG8fXRENuU3o-4',
  },
}

/** In order to have disabled button add `disabled` property. */
export const DisabledButton = Template.bind({})
DisabledButton.args = {
  variant: 'primary',
  text: 'Disabled Button',
  disabled: true,
}
DisabledButton.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/NFCh20xAq3Jg2g8A0DNC9I/UI-Library?node-id=6%3A1324&t=mppskGJvpl3LbsWL-4',
  },
}

/** Buttons can have icons inside. Please check `lukso-icon` component for more details about using icons. */
export const IconButton = Template.bind({})
IconButton.args = {
  variant: 'primary',
  text: unsafeHTML(
    `<lukso-icon name="add-photo" size="medium" color="neutral-100" class="mr-2"></lukso-icon>Icon Button`
  ),
}
IconButton.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/NFCh20xAq3Jg2g8A0DNC9I/UI-Library?node-id=6%3A1324&t=mppskGJvpl3LbsWL-4',
  },
}

/** Long press button require to hold press state till animation fully completes. To turn on this effect add  `is-long-press` property.
 * In order to handle long press complete add `@on-long-press-complete` event handler.
 */
export const LongPressButton = LongPressTemplate.bind({})
LongPressButton.args = {
  variant: 'primary',
  text: 'Hold to submit',
  isLongPress: true,
}
IconButton.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/NFCh20xAq3Jg2g8A0DNC9I/UI-Library?node-id=743%3A9905&t=JAexoWba0Re3ntDk-4',
  },
}

/** If you add `is-link` attribute it will use `<a>` tag instead of `<button>`.
 * In that case you can also use link related attributes like `href`, `target` or `rel`.  */
export const Link = Template.bind({})
Link.args = {
  variant: 'text',
  isLink: true,
  href: 'https://lukso.network',
  target: '_blank',
  rel: 'noopener noreferrer',
}
Link.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/NFCh20xAq3Jg2g8A0DNC9I/UI-Library?node-id=743%3A9822&t=AGmdbG8fXRENuU3o-4',
  },
}
