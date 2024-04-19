import { html, nothing } from 'lit-html'
import { unsafeHTML } from 'lit/directives/unsafe-html.js'

import type { Meta } from '@storybook/web-components'

import './index'
import '../lukso-icon'

/**  Documentation and examples of `lukso-tag` component. */
const meta: Meta = {
  title: 'Design System/Components/lukso-tag',
  component: 'lukso-tag',
  argTypes: {
    content: {
      control: { type: 'text' },
    },
    isRounded: {
      name: 'is-rounded',
      control: {
        type: 'boolean',
      },
      table: {
        category: 'Attributes',
      },
    },
    size: {
      control: {
        type: 'select',
      },
      options: ['x-small', 'small', 'large'],
      table: {
        category: 'Attributes',
      },
    },
    backgroundColor: {
      name: 'background-color',
      control: {
        type: 'text',
      },
      table: {
        category: 'Attributes',
      },
    },
    textColor: {
      name: 'text-color',
      control: {
        type: 'text',
      },
      table: {
        category: 'Attributes',
      },
    },
    borderColor: {
      name: 'border-color',
      control: {
        type: 'text',
      },
      table: {
        category: 'Attributes',
      },
    },
    'is-rounded': {
      name: 'isRounded',
    },
    'background-color': {
      name: 'backgroundColor',
    },
    'text-color': {
      name: 'textColor',
    },
    'border-color': {
      name: 'borderColor',
    },
  },
  args: {
    size: 'small',
    isRounded: false,
    content: 'Small Tag',
    backgroundColor: '',
    textColor: '',
    borderColor: '',
  },
  parameters: {
    controls: {
      exclude: [
        'isRounded',
        'backgroundColor',
        'textColor',
        'borderColor',
        'tagStyles',
        'styles',
      ],
    },
  },
}

export default meta

const Template = ({
  content,
  size,
  isRounded,
  backgroundColor,
  textColor,
  borderColor,
}) =>
  html`<lukso-tag
    size=${size ? size : nothing}
    ?is-rounded=${isRounded}
    background-color=${backgroundColor ? backgroundColor : nothing}
    text-color=${textColor ? textColor : nothing}
    border-color=${borderColor ? borderColor : nothing}
    >${content}</lukso-tag
  >`

/** By default tag is displayed in `small` size. */
export const DefaultTag = Template.bind({})
DefaultTag.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/NFCh20xAq3Jg2g8A0DNC9I/UI-Library?node-id=375%3A3234&t=AGmdbG8fXRENuU3o-4',
  },
}

/** You can change tag size with `size` property. This is example of `large` tag. */
export const LargeTag = Template.bind({})
LargeTag.args = {
  size: 'large',
  content: 'Large Tag',
}
LargeTag.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/NFCh20xAq3Jg2g8A0DNC9I/UI-Library?node-id=375%3A3234&t=AGmdbG8fXRENuU3o-4',
  },
}

/**  This is example of `x-small` tag. */
export const ExtraSmallTag = Template.bind({})
ExtraSmallTag.args = {
  size: 'x-small',
  content: 'Extra Small Tag',
}
ExtraSmallTag.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/NFCh20xAq3Jg2g8A0DNC9I/UI-Library?node-id=375%3A3234&t=AGmdbG8fXRENuU3o-4',
  },
}

/** You can create "pill" tags when adding `is-rounded` property. */
export const RoundedTag = Template.bind({})
RoundedTag.args = {
  isRounded: true,
}
RoundedTag.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/NFCh20xAq3Jg2g8A0DNC9I/UI-Library?node-id=1083%3A13483&t=AGmdbG8fXRENuU3o-4',
  },
}

/** You can change color of the tag to any from the palette with `text-color`, `background-color` and 'border-color` property. */
export const CustomColorTag = Template.bind({})
CustomColorTag.args = {
  content: 'Custom Color Tag',
  backgroundColor: 'red-55',
  textColor: 'neutral-100',
}
CustomColorTag.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/NFCh20xAq3Jg2g8A0DNC9I/UI-Library?node-id=375%3A3241&t=AGmdbG8fXRENuU3o-4',
  },
}

/** Tags can have icons inside. Please check `lukso-icon` component for more details about using icons. */
export const IconTag = Template.bind({})
IconTag.args = {
  size: 'small',
  content: unsafeHTML(
    `<lukso-icon name="information" size="small" class="mr-1"></lukso-icon>Icon Tag`
  ),
}
IconTag.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/NFCh20xAq3Jg2g8A0DNC9I/UI-Library?node-id=375%3A3234&t=mppskGJvpl3LbsWL-4',
  },
}
