import { html } from 'lit-html'

import type { Meta } from '@storybook/web-components'

import './index'

/**  Documentation and examples of `lukso-icon` component. Icons comes in `small`, `medium`, `large` and `x-large` size that is set in `size` property.
 *  Please check all available icons in Icons Showcase.
 */
const meta: Meta = {
  title: 'Design System/Components/lukso-icon',
  component: 'lukso-icon',
  argTypes: {
    name: {
      control: { type: 'text' },
      table: {
        category: 'Attributes',
      },
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large', 'x-large', '2x-large'],
      table: {
        category: 'Attributes',
      },
    },
    color: {
      control: { type: 'text' },
      table: {
        category: 'Attributes',
      },
    },
    secondaryColor: {
      name: 'secondary-color',
      control: { type: 'text' },
      table: {
        category: 'Attributes',
      },
    },
    animation: {
      control: { type: 'select' },
      options: [
        'none',
        'animate-spin',
        'animate-ping',
        'animate-pulse',
        'animate-bounce',
        'animate-pulse-resize',
      ],
    },
    'secondary-color': {
      name: 'secondaryColor',
    },
  },
  args: {
    name: 'profile-recovery',
    size: 'medium',
    color: 'neutral-20',
    secondaryColor: '',
    animation: undefined,
  },
  parameters: {
    controls: {
      exclude: ['sizes', 'secondaryColor', 'styles'],
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/NFCh20xAq3Jg2g8A0DNC9I/UI-Library?node-id=52%3A1473&t=loplCvndobu6AA6P-4',
    },
  },
}

export default meta

const Template = ({ name, size, color, secondaryColor, animation }) =>
  html`<lukso-icon
    name=${name}
    size=${size}
    color=${color}
    secondary-color=${secondaryColor}
    class=${animation}
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

/** Example of `2x-large` size of `64x64` pixels. */
export const XXLargeIcon = Template.bind({})
XXLargeIcon.args = {
  name: 'profile-recovery',
  size: '2x-large',
}

/** You can change color to any from the palette with `color` property. */
export const CustomColorIcon = Template.bind({})
CustomColorIcon.args = {
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

/** Some icons contain multiple colors and they don't use `color` property. You can still use different sizes tho. */
export const ColoredIcon = Template.bind({})
ColoredIcon.args = {
  name: 'google-color',
}

/** You can animate any icon by applying `animate-[name]` property. Some icons come with build in animation. Check more details in `Animations` and `Icons` section. */
export const AnimatedIcon = Template.bind({})
AnimatedIcon.args = {
  name: 'step-progress',
  secondaryColor: 'neutral-100',
  animation: 'animate-spin',
}
