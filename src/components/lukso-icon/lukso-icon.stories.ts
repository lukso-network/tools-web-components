import { html, nothing } from 'lit-html'
import { expect } from '@storybook/test'

import { wait } from '../../../.storybook/test-helpers'

import type { Meta, StoryObj } from '@storybook/web-components-vite'

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
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
      },
    },
    size: {
      control: { type: 'select' },
      options: ['x-small', 'small', 'medium', 'large', 'x-large', '2x-large'],
      table: {
        category: 'Attributes',
        type: { summary: 'IconSize' },
        defaultValue: { summary: 'medium' },
      },
    },
    color: {
      control: { type: 'text' },
      table: {
        category: 'Attributes',
        type: { summary: 'string' },
        defaultValue: { summary: 'neutral-20' },
      },
    },
    pack: {
      control: { type: 'select' },
      options: ['vuesax'],
      table: {
        category: 'Attributes',
        type: { summary: 'IconPack' },
        defaultValue: { summary: 'undefined' },
      },
    },
    variant: {
      control: { type: 'select' },
      options: ['linear', 'bold', 'broken', 'bulk', 'twotone', 'outline'],
      table: {
        category: 'Attributes',
        type: { summary: 'IconVariant' },
        defaultValue: { summary: 'undefined' },
      },
    },
    secondaryColor: {
      name: 'secondary-color',
      control: { type: 'text' },
      table: {
        category: 'Attributes',
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
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
        category: 'Custom',
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
    secondaryColor: undefined,
    animation: undefined,
    pack: undefined,
    variant: undefined,
  },
  parameters: {
    controls: {
      exclude: [
        'sizes',
        'secondaryColor',
        'styles',
        'svgContent',
        'svgModules',
      ],
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
/** Test story for icon with just name */
export const IconName: StoryObj = {
  name: 'Test: Icon with only name',
  args: {
    name: 'link',
  },
  parameters: {
    docs: { disable: true },
  },
  play: async ({ canvasElement }) => {
    const icon = canvasElement.querySelector('lukso-icon')
    expect(icon.outerHTML).toBe(
      '<lukso-icon size="medium" color="neutral-20" name="link"></lukso-icon>'
    )
    expect(icon.shadowRoot.innerHTML)
      .toContain(`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="width:24px;height:24px;">
    <g stroke-linecap="round" stroke-linejoin="round" stroke="var(--lukso-icon-color, var(--neutral-20))" stroke-width="1.5">
      <path d="m9.75 16.5h-3c-1.19347 0-2.33807-.4741-3.18198-1.318s-1.31802-1.9885-1.31802-3.182.47411-2.33807 1.31802-3.18198 1.98851-1.31802 3.18198-1.31802h3"></path>
      <path d="m14.25 7.5h3c1.1935 0 2.3381.47411 3.182 1.31802s1.318 1.98848 1.318 3.18198-.4741 2.3381-1.318 3.182-1.9885 1.318-3.182 1.318h-3"></path>
      <path d="m7.6543 12h8.7853"></path>
    </g>
  </svg>`)
  },
}

/** Test story for icon with custom color */
export const IconCustomColor: StoryObj = {
  name: 'Test: Icon with custom color',
  args: {
    name: 'link',
    color: 'coral-65',
  },
  parameters: {
    docs: { disable: true },
  },
  play: async ({ canvasElement }) => {
    const icon = canvasElement.querySelector('lukso-icon')
    expect(icon.outerHTML).toBe(
      '<lukso-icon size="medium" color="coral-65" name="link"></lukso-icon>'
    )
    expect(icon.shadowRoot.innerHTML)
      .toContain(`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="width:24px;height:24px;">
    <g stroke-linecap="round" stroke-linejoin="round" stroke="var(--lukso-icon-color, var(--coral-65))" stroke-width="1.5">
      <path d="m9.75 16.5h-3c-1.19347 0-2.33807-.4741-3.18198-1.318s-1.31802-1.9885-1.31802-3.182.47411-2.33807 1.31802-3.18198 1.98851-1.31802 3.18198-1.31802h3"></path>
      <path d="m14.25 7.5h3c1.1935 0 2.3381.47411 3.182 1.31802s1.318 1.98848 1.318 3.18198-.4741 2.3381-1.318 3.182-1.9885 1.318-3.182 1.318h-3"></path>
      <path d="m7.6543 12h8.7853"></path>
    </g>
  </svg>`)
  },
}

/** Test story for icon with large size */
export const IconLargeSize: StoryObj = {
  name: 'Test: Icon with large size',
  args: {
    name: 'link',
    size: 'large',
  },
  parameters: {
    docs: { disable: true },
  },
  play: async ({ canvasElement }) => {
    const icon = canvasElement.querySelector('lukso-icon')
    expect(icon.outerHTML).toBe(
      '<lukso-icon size="large" color="neutral-20" name="link"></lukso-icon>'
    )
    expect(icon.shadowRoot.innerHTML)
      .toContain(`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="width:32px;height:32px;">
    <g stroke-linecap="round" stroke-linejoin="round" stroke="var(--lukso-icon-color, var(--neutral-20))" stroke-width="1.5">
      <path d="m9.75 16.5h-3c-1.19347 0-2.33807-.4741-3.18198-1.318s-1.31802-1.9885-1.31802-3.182.47411-2.33807 1.31802-3.18198 1.98851-1.31802 3.18198-1.31802h3"></path>
      <path d="m14.25 7.5h3c1.1935 0 2.3381.47411 3.182 1.31802s1.318 1.98848 1.318 3.18198-.4741 2.3381-1.318 3.182-1.9885 1.318-3.182 1.318h-3"></path>
      <path d="m7.6543 12h8.7853"></path>
    </g>
  </svg>`)
  },
}

/** Test story for Vuesax linear icon */
export const VuesaxLinearIcon: StoryObj = {
  name: 'Test: Vuesax linear icon',
  args: {
    name: 'link',
    pack: 'vuesax',
    variant: 'linear',
  },
  parameters: {
    docs: { disable: true },
  },
  play: async ({ canvasElement }) => {
    const icon = canvasElement.querySelector('lukso-icon')
    expect(icon.outerHTML).toBe(
      '<lukso-icon size="medium" color="neutral-20" name="link" pack="vuesax" variant="linear"></lukso-icon>'
    )
    await wait(100) // wait for the SVG to load
    expect(icon.shadowRoot.innerHTML)
      .toContain(`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="width: 24px; height: 24px; display: block;"><style>* { color: var(--neutral-20); }</style>
<path d="M14.9915 17.5H16.5015C19.5215 17.5 22.0015 15.03 22.0015 12C22.0015 8.98 19.5315 6.5 16.5015 6.5H14.9915" stroke="var(--neutral-20)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
<path d="M9.00146 6.5H7.50146C4.47146 6.5 2.00146 8.97 2.00146 12C2.00146 15.02 4.47146 17.5 7.50146 17.5H9.00146" stroke="var(--neutral-20)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
<path d="M8.00146 12H16.0015" stroke="var(--neutral-20)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
</svg>`)
  },
}

/** Test story for Vuesax bold icon */
export const VuesaxBoldIcon: StoryObj = {
  name: 'Test: Vuesax bold icon',
  args: {
    name: 'link',
    pack: 'vuesax',
    variant: 'bold',
  },
  parameters: {
    docs: { disable: true },
  },
  play: async ({ canvasElement }) => {
    const icon = canvasElement.querySelector('lukso-icon')
    expect(icon.outerHTML).toBe(
      '<lukso-icon size="medium" color="neutral-20" name="link" pack="vuesax" variant="bold"></lukso-icon>'
    )
    await wait(100) // wait for the SVG to load
    expect(icon.shadowRoot.innerHTML).toContain(
      `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="width: 24px; height: 24px; display: block;"><style>* { color: var(--neutral-20); }</style>
<path d="M7.25148 12C7.25148 11.59 7.59148 11.25 8.00148 11.25H11.0015V7.5C11.0015 6.95 10.5515 6.5 10.0015 6.5H7.77148C4.62148 6.5 1.88148 9.08 2.00148 12.22C2.06148 13.65 2.66148 14.94 3.61148 15.89C4.61148 16.88 5.98148 17.5 7.50148 17.5H10.0015C10.5515 17.5 11.0015 17.05 11.0015 16.5V12.75H8.00148C7.59148 12.75 7.25148 12.41 7.25148 12Z" fill="var(--neutral-20)"></path>
<path d="M20.3915 8.11C19.3915 7.12 18.0215 6.5 16.5015 6.5H14.0015C13.4515 6.5 13.0015 6.95 13.0015 7.5V11.25H16.0015C16.4115 11.25 16.7515 11.59 16.7515 12C16.7515 12.41 16.4115 12.75 16.0015 12.75H13.0015V16.5C13.0015 17.05 13.4515 17.5 14.0015 17.5H16.2315C19.3815 17.5 22.1215 14.92 21.9915 11.78C21.9415 10.35 21.3315 9.06 20.3915 8.11Z" fill="var(--neutral-20)"></path>
<path d="M13.0015 11.25H11.0015V12.75H13.0015V11.25Z" fill="var(--neutral-20)"></path>
</svg>`
    )
  },
}

/** Test story for Vuesax colored icon */
export const VuesaxColoredIcon: StoryObj = {
  name: 'Test: Vuesax colored icon',
  args: {
    name: 'link',
    pack: 'vuesax',
    color: 'coral-65',
  },
  parameters: {
    docs: { disable: true },
  },
  play: async ({ canvasElement }) => {
    const icon = canvasElement.querySelector('lukso-icon')
    expect(icon.outerHTML).toBe(
      '<lukso-icon size="medium" color="coral-65" name="link" pack="vuesax" variant="linear"></lukso-icon>'
    )
    await wait(100) // wait for the SVG to load
    expect(icon.shadowRoot.innerHTML).toContain(
      `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="width: 24px; height: 24px; display: block;"><style>* { color: var(--coral-65); }</style>
<path d="M14.9915 17.5H16.5015C19.5215 17.5 22.0015 15.03 22.0015 12C22.0015 8.98 19.5315 6.5 16.5015 6.5H14.9915" stroke="var(--coral-65)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
<path d="M9.00146 6.5H7.50146C4.47146 6.5 2.00146 8.97 2.00146 12C2.00146 15.02 4.47146 17.5 7.50146 17.5H9.00146" stroke="var(--coral-65)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
<path d="M8.00146 12H16.0015" stroke="var(--coral-65)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
</svg>`
    )
  },
}

/** Test story for Vuesax large icon */
export const VuesaxLargeIcon: StoryObj = {
  name: 'Test: Vuesax large icon',
  args: {
    name: 'link',
    pack: 'vuesax',
    size: 'large',
  },
  parameters: {
    docs: { disable: true },
  },
  play: async ({ canvasElement }) => {
    const icon = canvasElement.querySelector('lukso-icon')
    expect(icon.outerHTML).toBe(
      '<lukso-icon size="large" color="neutral-20" name="link" pack="vuesax" variant="linear"></lukso-icon>'
    )
    await wait(100) // wait for the SVG to load
    expect(icon.shadowRoot.innerHTML).toContain(
      `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="width: 32px; height: 32px; display: block;"><style>* { color: var(--neutral-20); }</style>
<path d="M14.9915 17.5H16.5015C19.5215 17.5 22.0015 15.03 22.0015 12C22.0015 8.98 19.5315 6.5 16.5015 6.5H14.9915" stroke="var(--neutral-20)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
<path d="M9.00146 6.5H7.50146C4.47146 6.5 2.00146 8.97 2.00146 12C2.00146 15.02 4.47146 17.5 7.50146 17.5H9.00146" stroke="var(--neutral-20)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
<path d="M8.00146 12H16.0015" stroke="var(--neutral-20)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
</svg>`
    )
  },
}

/** Test story for CSS variable override on lukso pack icon */
export const CSSVariableOverride: StoryObj = {
  name: 'Test: CSS variable override',
  render: () =>
    html`<div style="--lukso-icon-color: red;">
      <lukso-icon name="link"></lukso-icon>
    </div>`,
  parameters: {
    docs: { disable: true },
  },
  play: async ({ canvasElement }) => {
    const icon = canvasElement.querySelector('lukso-icon')
    // SVG should contain the wrapped CSS variable that allows override
    expect(icon.shadowRoot.innerHTML).toContain(
      'var(--lukso-icon-color, var(--neutral-20))'
    )
    // The icon's stroke should resolve to the override color
    const svg = icon.shadowRoot.querySelector('svg')
    const g = svg.querySelector('g')
    const computedColor = getComputedStyle(g).stroke
    expect(computedColor).toBe('rgb(255, 0, 0)')
  },
}
