import { html, nothing } from 'lit-html'

import type { Meta } from '@storybook/web-components-vite'

import './index'

/**  Documentation and examples of `lukso-icon` component. Icons comes in `small`, `medium`, `large` and `x-large` size that is set in `size` property.
 *  The component supports multiple icon packs including the default `lukso` pack and the new `vuesax` pack with different variants.
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
      options: ['x-small', 'small', 'medium', 'large', 'x-large', '2x-large'],
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
    pack: {
      control: { type: 'select' },
      options: ['vuesax'],
      table: {
        category: 'Attributes',
      },
    },
    variant: {
      control: { type: 'select' },
      options: ['linear', 'bold', 'broken', 'bulk', 'twotone', 'outline'],
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
      table: {
        category: 'Attributes',
      },
    },
    'secondary-color': {
      name: 'secondaryColor',
    },
  },
  args: {
    name: 'link',
    size: 'medium',
    color: undefined,
    secondaryColor: '',
    animation: undefined,
    pack: undefined,
    variant: undefined,
  },
  parameters: {
    controls: {
      exclude: ['sizes', 'secondaryColor', 'styles', 'svgContent'],
    },
  },
}

export default meta

const Template = ({
  name,
  size,
  color,
  secondaryColor,
  animation,
  pack,
  variant,
}) =>
  html`<lukso-icon
    name=${name}
    size=${size ? size : nothing}
    color=${color ? color : nothing}
    secondary-color=${secondaryColor ? secondaryColor : nothing}
    pack=${pack ? pack : nothing}
    variant=${variant ? variant : nothing}
    class=${animation ? animation : nothing}
  ></lukso-icon>`

/** By default icon comes in `medium` size of `24x24` pixels with `neutral-20` color.  */
export const DefaultIcon = Template.bind({})

/** Example of `x-small` size of `12x12` pixels. */
export const XSmallIcon = Template.bind({})
XSmallIcon.args = {
  size: 'x-small',
}

/** Example of `small` size of `16x16` pixels. */
export const SmallIcon = Template.bind({})
SmallIcon.args = {
  size: 'small',
}

/** Example of `large` size of `32x32` pixels. */
export const LargeIcon = Template.bind({})
LargeIcon.args = {
  size: 'large',
}

/** Example of `x-large` size of `40x40` pixels. */
export const XLargeIcon = Template.bind({})
XLargeIcon.args = {
  size: 'x-large',
}

/** Example of `2x-large` size of `64x64` pixels. */
export const XXLargeIcon = Template.bind({})
XXLargeIcon.args = {
  size: '2x-large',
}

/** You can change color to any from the palette with `color` property. */
export const CustomColorIcon = Template.bind({})
CustomColorIcon.args = {
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

/** Example of using the Vuesax icon pack. */
export const VuesaxIconPack = Template.bind({})
VuesaxIconPack.args = {
  name: 'text-bold',
  pack: 'vuesax',
  variant: 'linear',
}

/** Example of Vuesax variants for `text-bold` icon. */
export const VuesaxIconVariants = () => html`
  <div style="display: flex; gap: 16px; align-items: center;">
    <lukso-icon name="text-bold" pack="vuesax" variant="linear"></lukso-icon>
    <lukso-icon name="text-bold" pack="vuesax" variant="bold"></lukso-icon>
    <lukso-icon name="text-bold" pack="vuesax" variant="broken"></lukso-icon>
    <lukso-icon name="text-bold" pack="vuesax" variant="bulk"></lukso-icon>
    <lukso-icon name="text-bold" pack="vuesax" variant="twotone"></lukso-icon>
    <lukso-icon name="link" pack="vuesax" variant="outline"></lukso-icon>
  </div>
`
