import { html, nothing } from 'lit-html'
import { within } from '@storybook/testing-library'
import { expect } from '@storybook/jest'
import { unsafeHTML } from 'lit/directives/unsafe-html.js'

import type { Meta } from '@storybook/web-components'

import './index'
import '../lukso-icon'

/**  Documentation and examples of `lukso-button` component. */
const meta: Meta = {
  title: 'Design System/Components/lukso-button',
  component: 'lukso-button',
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: [
        'primary',
        'secondary',
        'landing',
        'success',
        'danger',
        'warning',
        'text',
        'nav-button',
        'nav-text',
        'link',
      ],
      table: {
        category: 'Attributes',
      },
    },
    isLink: {
      name: 'is-link',
      control: { type: 'boolean' },
      description: 'If true, button will be rendered as a link',
      table: {
        category: 'Attributes',
      },
    },
    disabled: {
      control: { type: 'boolean' },
      if: { arg: 'isLink', truthy: false },
      table: {
        category: 'Attributes',
      },
    },
    text: {
      control: { type: 'text' },
      table: {
        category: 'Attributes',
      },
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium'],
      table: {
        category: 'Attributes',
      },
    },
    type: {
      control: { type: 'select' },
      options: ['button', 'submit', 'reset'],
      table: {
        category: 'Attributes',
      },
    },
    isFullWidth: {
      name: 'is-full-width',
      control: { type: 'boolean' },
      table: {
        category: 'Attributes',
      },
    },
    isLongPress: {
      name: 'is-long-press',
      control: { type: 'boolean' },
      if: { arg: 'isLink', truthy: false },
      table: {
        category: 'Attributes',
      },
    },
    isActive: {
      name: 'is-active',
      control: { type: 'boolean' },
      table: {
        category: 'Attributes',
      },
    },
    isLoading: {
      name: 'is-loading',
      control: { type: 'boolean' },
      if: { arg: 'isLink', truthy: false },
      table: {
        category: 'Attributes',
      },
    },
    href: {
      control: { type: 'text' },
      if: { arg: 'isLink' },
      table: {
        category: 'Attributes',
      },
    },
    target: {
      control: { type: 'select' },
      options: ['_blank', '_self', '_parent', '_top'],
      if: { arg: 'isLink' },
      table: {
        category: 'Attributes',
      },
    },
    rel: {
      control: { type: 'text' },
      if: { arg: 'isLink' },
      table: {
        category: 'Attributes',
      },
    },
    loadingText: {
      name: 'loading-text',
      control: { type: 'text' },
      if: { arg: 'isLoading' },
      table: {
        category: 'Attributes',
      },
    },
    onLongPressComplete: {
      name: 'on-long-press-complete',
      description: 'Emitted when long press is completed',
      table: {
        category: 'Events',
      },
    },
    customClass: {
      name: 'custom-class',
      control: { type: 'text' },
      table: {
        category: 'Attributes',
      },
    },
    count: {
      control: { type: 'number' },
      if: { arg: 'isLink', truthy: false },
      table: {
        category: 'Attributes',
      },
    },
    isIcon: {
      name: 'is-icon',
      control: { type: 'boolean' },
      table: {
        category: 'Attributes',
      },
    },
    ariaLabel: {
      name: 'aria-label',
      control: { type: 'text' },
      table: {
        category: 'Attributes',
      },
    },
    'is-full-width': {
      name: 'isFullWidth',
    },
    'is-long-press': {
      name: 'isLongPress',
    },
    'is-link': {
      name: 'isLink',
    },
    'is-loading': {
      name: 'isLoading',
    },
    'loading-text': {
      name: 'loadingText',
    },
    'custom-class': {
      name: 'customClass',
    },
    'is-active': {
      name: 'isActive',
    },
    'is-icon': {
      name: 'isIcon',
    },
    'aria-label': {
      name: 'ariaLabel',
    },
  },
  args: {
    text: 'Hello World',
    isLink: false,
    disabled: false,
    size: 'medium',
    variant: 'primary',
    type: 'button',
    isFullWidth: false,
    isLongPress: false,
    href: 'https://lukso.network',
    target: '_blank',
    rel: 'noopener noreferrer',
    isLoading: false,
    loadingText: 'Loading...',
    customClass: '',
    isActive: false,
    count: 0,
    isIcon: false,
    ariaLabel: '',
  },
  parameters: {
    controls: {
      exclude: [
        'isPressed',
        'timer',
        'handleMouseDown',
        'handleMouseUp',
        'styles',
        'isFullWidth',
        'isLongPress',
        'isLink',
        'isLoading',
        'loadingText',
        'customClass',
        'isActive',
        'counterStyles',
        'buttonStyles',
        'noTransition',
        'isIcon',
        'loadingStyles',
        'ariaLabel',
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
  type,
  isFullWidth,
  isLongPress,
  isLink,
  href,
  target,
  rel,
  onLongPressComplete,
  isLoading,
  loadingText,
  customClass,
  isActive,
  count,
  isIcon,
  ariaLabel,
}) =>
  html`<lukso-button
    variant=${variant ? variant : nothing}
    size=${size ? size : nothing}
    href=${href ? href : nothing}
    type=${type ? type : nothing}
    target=${target ? target : nothing}
    rel=${rel ? rel : nothing}
    loading-text=${loadingText ? loadingText : nothing}
    custom-class=${customClass ? customClass : nothing}
    count=${count ? count : nothing}
    aria-label=${ariaLabel ? ariaLabel : nothing}
    ?disabled=${disabled}
    ?is-full-width=${isFullWidth}
    ?is-long-press=${isLongPress}
    ?is-link=${isLink}
    ?is-loading=${isLoading}
    ?is-active=${isActive}
    ?is-icon=${isIcon}
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

/** Example of `success` variant.  */
export const Success = Template.bind({})
Success.args = {
  variant: 'success',
}

/** Example of `danger` variant.  */
export const Danger = Template.bind({})
Danger.args = {
  variant: 'danger',
}

/** Example of `warning` variant.  */
export const Warning = Template.bind({})
Warning.args = {
  variant: 'warning',
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

/** Example of `nav-button` variant.  */
export const NavButton = Template.bind({})
NavButton.args = {
  variant: 'nav-button',
}

/** Example of `nav-text` variant.  */
export const NavText = Template.bind({})
NavText.args = {
  variant: 'nav-text',
}

/** Example of `link` variant.  */
export const LinkVariant = Template.bind({})
LinkVariant.args = {
  variant: 'link',
}

/** Example of `small` size button.  */
export const SmallSize = Template.bind({})
SmallSize.args = {
  size: 'small',
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
  isIcon: true,
  text: unsafeHTML(
    `<lukso-icon name="logo-facebook-mono" size="medium" color="neutral-100"></lukso-icon>`
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
export const LongPressButton = Template.bind({})
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

/** Loading state button show spinner along with custom text and puts button in disabled state. To turn on this effect add  `is-loading` property. Text can be modified in `loading-text` property.
 */
export const LoadingButton = Template.bind({})
LoadingButton.args = {
  variant: 'primary',
  text: 'Loading Button',
  isLoading: true,
  loadingText: 'Loading...',
}
LoadingButton.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/NFCh20xAq3Jg2g8A0DNC9I/UI-Library?node-id=6-1324&t=skBgEdvtZt68G51p-4',
  },
}

/** You can pass any custom CSS class using `custom-class` property. */
export const CustomClassButton = Template.bind({})
CustomClassButton.args = {
  variant: 'secondary',
  text: 'Custom Button',
  customClass: 'text-red-55 border-red-55',
}
CustomClassButton.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/NFCh20xAq3Jg2g8A0DNC9I/UI-Library?node-id=6%3A1324&t=mppskGJvpl3LbsWL-4',
  },
}

/** You can add counter with `count` property. */
export const CounterButton = Template.bind({})
CounterButton.args = {
  variant: 'secondary',
  text: 'Counter Button',
  count: 8,
}
CounterButton.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/NFCh20xAq3Jg2g8A0DNC9I/UI-Library?node-id=6%3A1324&t=mppskGJvpl3LbsWL-4',
  },
}
