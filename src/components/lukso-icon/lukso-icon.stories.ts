import { html } from 'lit-html'
import './index'

export default {
  title: 'Design System/Components/Icon',
  component: 'lukso-icon',
  argTypes: {
    name: {
      control: { type: 'text' },
    },
    width: {
      control: { type: 'number' },
    },
    height: {
      control: { type: 'number' },
    },
    color: {
      control: { type: 'text' },
    },
    strokeWidth: {
      control: { type: 'number' },
    },
  },
  args: {
    name: 'profile-recovery',
    width: 24,
    height: 24,
    color: 'neutral-20',
    strokeWidth: 1.5,
  },
  parameters: {
    controls: {
      exclude: [],
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/NFCh20xAq3Jg2g8A0DNC9I/UI-Library?node-id=52%3A1473&t=loplCvndobu6AA6P-4',
    },
  },
}

const Template = ({ name, width, height, color, strokeWidth }) =>
  html`<lukso-icon
    name=${name}
    width=${width}
    height=${height}
    color=${color}
    stroke-width=${strokeWidth}
  ></lukso-icon>`

export const DefaultIcon = Template.bind({})
DefaultIcon.args = {
  name: 'profile-recovery',
}

export const SmallIcon = Template.bind({})
SmallIcon.args = {
  name: 'profile-recovery',
  width: 16,
  height: 16,
}

export const LargeIcon = Template.bind({})
LargeIcon.args = {
  name: 'profile-recovery',
  width: 32,
  height: 32,
}

export const ColoredIcon = Template.bind({})
ColoredIcon.args = {
  name: 'profile-recovery',
  color: 'coral-65',
}

export const BoldIcon = Template.bind({})
BoldIcon.args = {
  name: 'profile-recovery',
  width: 16,
  height: 16,
  strokeWidth: 2,
}
