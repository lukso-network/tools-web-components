import { html, nothing } from 'lit-html'

import type { Meta } from '@storybook/web-components'

import './index'
import '../lukso-button/index'

/**  Documentation and examples of `lukso-tooltip` component. */
const meta: Meta = {
  title: 'Design System/Components/lukso-tooltip',
  component: 'lukso-tooltip',
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['dark', 'light', 'success', 'danger', 'white'],
      table: {
        category: 'Attributes',
      },
    },
    size: {
      control: { type: 'select' },
      options: ['medium', 'large'],
      table: {
        category: 'Attributes',
      },
    },
    placement: {
      control: { type: 'select' },
      options: [
        'top',
        'top-start',
        'top-end',
        'right',
        'right-start',
        'right-end',
        'bottom',
        'bottom-start',
        'bottom-end',
        'left',
        'left-start',
        'left-end',
        'auto',
        'auto-start',
        'auto-end',
      ],
      table: {
        category: 'Attributes',
      },
    },
    trigger: {
      control: {
        type: 'select',
      },
      options: ['mouseenter', 'click', 'manual'],
      table: {
        category: 'Attributes',
      },
    },
    text: {
      control: {
        type: 'text',
      },
      table: {
        category: 'Attributes',
      },
    },
    maxWidth: {
      control: {
        type: 'number',
      },
      table: {
        category: 'Attributes',
      },
    },
    showArrow: {
      name: 'show-arrow',
      control: {
        type: 'boolean',
      },
      table: {
        category: 'Attributes',
      },
    },
    'show-arrow': {
      name: 'showArrow',
    },
    show: {
      control: {
        type: 'boolean',
      },
      table: {
        category: 'Attributes',
      },
      description: 'Works only with `manual` trigger.',
    },
    hideOnClick: {
      name: 'hide-on-click',
      control: {
        type: 'select',
      },
      options: ['true', 'false', 'toggle'],
      table: {
        category: 'Attributes',
      },
    },
    isClipboardCopy: {
      name: 'is-clipboard-copy',
      control: {
        type: 'boolean',
      },
      table: {
        category: 'Attributes',
      },
    },
    copyText: {
      name: 'copy-text',
      control: {
        type: 'text',
      },
      table: {
        category: 'Attributes',
      },
    },
    copyValue: {
      name: 'copy-value',
      control: {
        type: 'text',
      },
      table: {
        category: 'Attributes',
      },
    },
    offset: {
      control: {
        type: 'number',
      },
      table: {
        category: 'Attributes',
      },
    },
    showDelay: {
      name: 'show-delay',
      control: { type: 'number' },
      table: {
        category: 'Attributes',
      },
    },
    hideDelay: {
      name: 'hide-delay',
      control: { type: 'number' },
      table: {
        category: 'Attributes',
      },
    },
    'show-delay': {
      name: 'showDelay',
    },
    'hide-delay': {
      name: 'hideDelay',
    },
    'max-width': {
      name: 'maxWidth',
    },
    'hide-on-click': {
      name: 'hideOnClick',
    },
    'is-clipboard-copy': {
      name: 'isClipboardCopy',
    },
    'copy-text': {
      name: 'copyText',
    },
    'copy-value': {
      name: 'copyValue',
    },
  },
  args: {
    variant: 'dark',
    size: 'medium',
    placement: 'top',
    trigger: 'mouseenter',
    text: '',
    maxWidth: 300,
    hideOnClick: 'true',
    buttonText: 'Button',
    show: false,
    offset: 10,
    isClipboardCopy: false,
    copyText: '',
    copyValue: '',
    showArrow: true,
    showDelay: 300,
    hideDelay: 300,
    textSlot: '',
  },
  parameters: {
    controls: {
      exclude: [
        'styles',
        'maxWidth',
        'buttonText',
        'margin',
        'hideOnClick',
        'tooltipInstance',
        'hideOnClickCheck',
        'isClipboardCopy',
        'copyText',
        'copyValue',
        'showCopy',
        'showArrow',
        'showDelay',
        'hideDelay',
      ],
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/NFCh20xAq3Jg2g8A0DNC9I/UI-Library?type=design&node-id=3687-17347&mode=design&t=Fgd4u1WVUohLsSdF-4',
    },
  },
}

export default meta

const DefaultTemplate = ({
  variant,
  size,
  placement,
  trigger,
  text,
  buttonText,
  maxWidth,
  show,
  margin,
  hideOnClick,
  isClipboardCopy,
  copyText,
  copyValue,
  offset,
  showArrow,
  showDelay,
  hideDelay,
  textSlot,
}) => html`
  <lukso-tooltip
    variant=${variant ? variant : nothing}
    size=${size ? size : nothing}
    placement=${placement ? placement : nothing}
    trigger=${trigger ? trigger : nothing}
    text=${text ? text : nothing}
    max-width=${maxWidth ? maxWidth : nothing}
    copy-text=${copyText ? copyText : nothing}
    copy-value=${copyValue ? copyValue : nothing}
    hide-on-click=${hideOnClick ? hideOnClick : nothing}
    offset=${offset ? offset : nothing}
    ?show=${show ? show : undefined}
    ?is-clipboard-copy=${isClipboardCopy ? isClipboardCopy : undefined}
    ?show-arrow=${showArrow ? showArrow : undefined}
    show-delay=${showDelay ? showDelay : nothing}
    hide-delay=${hideDelay ? hideDelay : nothing}
    class="${margin} mx-20"
  >
    <lukso-button size="small" variant="secondary" trigger="click"
      >${buttonText}
    </lukso-button>
    <div slot="text">${textSlot}</div>
  </lukso-tooltip>
`

/** By default tooltip activates on hover.  */
export const DefaultTooltip = DefaultTemplate.bind({})
DefaultTooltip.args = {
  text: 'Hello!',
  buttonText: 'Hover me',
  margin: 'my-8',
}

/** You can activate tooltip with click.  */
export const ClickTrigger = DefaultTemplate.bind({})
ClickTrigger.args = {
  text: 'Hello!',
  trigger: 'click',
  buttonText: 'Click me',
  margin: 'mt-8',
}

/** You can limit width of the tooltip with `max-width` attribute.  */
export const MaxWidth = DefaultTemplate.bind({})
MaxWidth.args = {
  text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
  maxWidth: 200,
  show: true,
  trigger: 'manual',
  margin: 'mt-20',
  hideOnClick: 'false',
}

/** Example of `large` size.  */
export const LargeSize = DefaultTemplate.bind({})
LargeSize.args = {
  text: 'Hello!',
  size: 'large',
  show: true,
  trigger: 'manual',
  margin: 'mt-8',
  hideOnClick: 'false',
}

/** Example of `light` variant.  */
export const LightVariant = DefaultTemplate.bind({})
LightVariant.args = {
  text: 'Hello!',
  variant: 'light',
  show: true,
  trigger: 'manual',
  margin: 'mt-8',
  hideOnClick: 'false',
}

/** Example of `success` variant.  */
export const SuccessVariant = DefaultTemplate.bind({})
SuccessVariant.args = {
  text: 'Hello!',
  variant: 'success',
  show: true,
  trigger: 'manual',
  margin: 'mt-8',
  hideOnClick: 'false',
}

/** Example of `danger` variant.  */
export const DangerVariant = DefaultTemplate.bind({})
DangerVariant.args = {
  text: 'Hello!',
  variant: 'danger',
  show: true,
  trigger: 'manual',
  margin: 'mt-8',
  hideOnClick: 'false',
}

/** You can change tooltip placement with `placement` attribute.  */
export const PlacementRight = DefaultTemplate.bind({})
PlacementRight.args = {
  text: 'Hello!',
  placement: 'right',
  show: true,
  trigger: 'manual',
  hideOnClick: 'false',
}
export const PlacementLeft = DefaultTemplate.bind({})
PlacementLeft.args = {
  text: 'Hello!',
  placement: 'left',
  show: true,
  trigger: 'manual',
  hideOnClick: 'false',
}

export const PlacementBottom = DefaultTemplate.bind({})
PlacementBottom.args = {
  text: 'Hello!',
  placement: 'bottom',
  show: true,
  trigger: 'manual',
  hideOnClick: 'false',
  margin: 'mb-8',
}

/** You can modify tooltip offset with `offset` attribute.  */
export const Offset = DefaultTemplate.bind({})
Offset.args = {
  text: 'Hello!',
  show: true,
  trigger: 'manual',
  margin: 'mt-8',
  hideOnClick: 'false',
  offset: 20,
}

/** Tooltip can work as clipboard copy component. For that wou need to enable `is-clipboard-copy` and set `copy-text` attribute..  */
export const ClipboardCopy = DefaultTemplate.bind({})
ClipboardCopy.args = {
  margin: 'mt-8',
  buttonText: 'Click me',
  text: 'Copy to clipboard',
  isClipboardCopy: true,
  copyText: 'Copied!',
  copyValue: 'copied value',
}

/** Delayed show/hide.  */
export const DelayedTooltip = DefaultTemplate.bind({})
DelayedTooltip.args = {
  text: 'Hello!',
  buttonText: 'Hover me',
  margin: 'mt-8',
  showDelay: 1000,
  hideDelay: 1000,
}

/** With named slot you can pass in HTML content into the tooltip. */
export const NamedSlot = DefaultTemplate.bind({})
NamedSlot.args = {
  buttonText: 'Hover me',
  margin: 'mt-8',
  textSlot: '<b>This</b> is a tooltip with named <i>slot</i>',
}
