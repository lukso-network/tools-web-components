import { html } from 'lit-html'
import './index'

export default {
  title: 'Design System/Components/Icon',
  component: 'lukso-icon',
  argTypes: {
    name: {
      control: { type: 'text' },
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large', 'x-large'],
    },
    color: {
      control: { type: 'text' },
    },
    secondaryColor: {
      control: { type: 'text' },
    },
  },
  args: {
    name: 'profile-recovery',
    size: 'medium',
    color: 'neutral-20',
    secondaryColor: '',
  },
  parameters: {
    controls: {
      exclude: ['sizes', 'secondary-color'],
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/NFCh20xAq3Jg2g8A0DNC9I/UI-Library?node-id=52%3A1473&t=loplCvndobu6AA6P-4',
    },
  },
}

const Template = ({ name, size, color, secondaryColor }) =>
  html`<lukso-icon
    name=${name}
    size=${size}
    color=${color}
    secondary-color=${secondaryColor}
  ></lukso-icon>`

export const DefaultIcon = Template.bind({})
DefaultIcon.args = {
  name: 'profile-recovery',
}

/** 16x16 px */
export const SmallIcon = Template.bind({})
SmallIcon.args = {
  name: 'profile-recovery',
  size: 'small',
}

/** 24x24 px */
export const MediumIcon = Template.bind({})
MediumIcon.args = {
  name: 'profile-recovery',
  size: 'medium',
}

/** 32x32 px */
export const LargeIcon = Template.bind({})
LargeIcon.args = {
  name: 'profile-recovery',
  size: 'large',
}

/** 40x40 px */
export const XLargeIcon = Template.bind({})
XLargeIcon.args = {
  name: 'profile-recovery',
  size: 'x-large',
}

/** By default icon has `neutral-20` color. You can change color to any from the palette with `color` property. */
export const ColoredIcon = Template.bind({})
ColoredIcon.args = {
  name: 'profile-recovery',
  color: 'coral-65',
}

/** Some icons contain secondary color that is applied with `secondary-color` property. */
export const SecondaryColorIcon = Template.bind({})
SecondaryColorIcon.args = {
  name: 'complete-filled',
  color: 'coral-65',
  secondaryColor: 'honey-72',
}
