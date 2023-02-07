import { html } from 'lit-html'
import { unsafeHTML } from 'lit/directives/unsafe-html.js'

import './index'
import '../lukso-icon'

/**  Documentation and examples of `lukso-tag` component. */
export default {
  title: 'Design System/Components/lukso-tag',
  component: 'lukso-tag',
  argTypes: {
    content: {
      control: { type: 'text' },
    },
    isRounded: {
      control: {
        type: 'boolean',
      },
    },
    size: {
      control: {
        type: 'select',
      },
      options: ['small', 'large'],
    },
    backgroundColor: {
      control: {
        type: 'text',
      },
    },
    textColor: {
      control: {
        type: 'text',
      },
    },
  },
  args: {
    size: 'small',
    isRounded: false,
    content: 'Small Tag',
    backgroundColor: '',
    textColor: '',
  },
  parameters: {
    controls: {
      exclude: [
        'defaultStyles',
        'smallStyles',
        'largeStyles',
        'roundedStyles',
        'is-rounded',
        'background-color',
        'text-color',
        'padding',
      ],
    },
  },
}

const Template = ({ content, size, isRounded, backgroundColor, textColor }) =>
  html`<lukso-tag
    size=${size}
    ?is-rounded=${isRounded}
    background-color=${backgroundColor}
    text-color=${textColor}
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

/** You can change color of the tag to any from the palette with `text-color` and `background-color` property. */
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
