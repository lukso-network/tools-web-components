import { html } from 'lit-html'
import './index'

/**  Documentation and examples of `lukso-icon` component. Icons comes in `small`, `medium`, `large` and `x-large` size that is set in `size` property.
 *  Please check all available icons in Icons Showcase.
 */
export default {
  title: 'Design System/Components/lukso-icon',
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

/** By default icon comes in `medium` size of `24x24` pixels with `neutral-20` color.  */
export const DefaultIcon = Template.bind({})
DefaultIcon.args = {
  name: 'profile-recovery',
}

/** Example of `small` size of `16x16` pixels. */
export const SmallIcon = Template.bind({})
SmallIcon.args = {
  name: 'profile-recovery',
  size: 'small',
}

/** Example of `large` size of `32x32` pixels. */
export const LargeIcon = Template.bind({})
LargeIcon.args = {
  name: 'profile-recovery',
  size: 'large',
}

/** Example of `x-large` size of `40x40` pixels. */
export const XLargeIcon = Template.bind({})
XLargeIcon.args = {
  name: 'profile-recovery',
  size: 'x-large',
}

/** You can change color to any from the palette with `color` property. */
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
