import { html, nothing } from 'lit-html'
import { Meta } from '@storybook/web-components'

import './index'
import '../lukso-button/index'

/**  Documentation and examples of `lukso-tooltip` component. */
const meta: Meta = {
  title: 'Design System/Components/lukso-tooltip',
  component: 'lukso-tooltip',
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['dark', 'light', 'success', 'danger'],
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
    'max-width': {
      name: 'maxWidth',
    },
    'hide-on-click': {
      name: 'hideOnClick',
    },
  },
  args: {
    variant: 'dark',
    size: 'medium',
    placement: 'top',
    trigger: 'mouseenter',
    text: 'Hello!',
    maxWidth: 300,
    hideOnClick: 'true',
    buttonText: 'Button',
  },
  parameters: {
    controls: {
      exclude: [
        'styles',
        'defaultTooltipStyles',
        'maxWidth',
        'buttonText',
        'margin',
        'hideOnClick',
        'tooltipInstance',
        'hideOnClickCheck',
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
}) => html`
  <lukso-tooltip
    variant=${variant ? variant : nothing}
    size=${size ? size : nothing}
    placement=${placement ? placement : nothing}
    trigger=${trigger ? trigger : nothing}
    text=${text ? text : nothing}
    max-width=${maxWidth ? maxWidth : nothing}
    ?show=${show ? show : nothing}
    hide-on-click=${hideOnClick ? hideOnClick : nothing}
    class="${margin} mx-20"
  >
    <lukso-button size="small" variant="secondary">${buttonText}</lukso-button>
  </lukso-tooltip>
`

/** By default tooltip activates on hover.  */
export const DefaultTooltip = DefaultTemplate.bind({})
DefaultTooltip.args = {
  buttonText: 'Hover me',
  margin: 'my-8',
}

/** You can activate tooltip with click.  */
export const ClickTrigger = DefaultTemplate.bind({})
ClickTrigger.args = {
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
  margin: 'mt-10',
  hideOnClick: 'false',
}

/** Example of `large` size.  */
export const LargeSize = DefaultTemplate.bind({})
LargeSize.args = {
  size: 'large',
  show: true,
  trigger: 'manual',
  margin: 'mt-8',
  hideOnClick: 'false',
}

/** Example of `light` variant.  */
export const LightVariant = DefaultTemplate.bind({})
LightVariant.args = {
  variant: 'light',
  show: true,
  trigger: 'manual',
  margin: 'mt-8',
  hideOnClick: 'false',
}

/** Example of `success` variant.  */
export const SuccessVariant = DefaultTemplate.bind({})
SuccessVariant.args = {
  variant: 'success',
  show: true,
  trigger: 'manual',
  margin: 'mt-8',
  hideOnClick: 'false',
}

/** Example of `danger` variant.  */
export const DangerVariant = DefaultTemplate.bind({})
DangerVariant.args = {
  variant: 'danger',
  show: true,
  trigger: 'manual',
  margin: 'mt-8',
  hideOnClick: 'false',
}
