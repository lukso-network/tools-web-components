import { html } from 'lit-html'
import './index'

export default {
  title: 'Design System/Components/Tag',
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

export const DefaultTag = Template.bind({})
DefaultTag.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/NFCh20xAq3Jg2g8A0DNC9I/UI-Library?node-id=375%3A3234&t=AGmdbG8fXRENuU3o-4',
  },
}

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

export const CustomColorTag = Template.bind({})
CustomColorTag.args = {
  content: 'Custom Color Tag',
  backgroundColor: '#E96464',
  textColor: '#FFFFFF',
}
CustomColorTag.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/NFCh20xAq3Jg2g8A0DNC9I/UI-Library?node-id=375%3A3241&t=AGmdbG8fXRENuU3o-4',
  },
}
