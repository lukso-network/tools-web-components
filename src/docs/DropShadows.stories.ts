import { html } from 'lit'

import type { Meta, StoryObj } from '@storybook/web-components-vite'

const meta: Meta = {
  title: 'Design System/Drop Shadows',
  parameters: {
    docs: {
      description: {
        component: `
# Drop Shadows

Set of drop shadows for use in the design system.

## Example Usage

Apply shadow class like any other Tailwind shadow using \`shadow-{name}\` pattern, for example:

\`\`\`html
<span class="shadow-neutral-drop-shadow">Text</span>
\`\`\`
        `,
      },
    },
  },
}

export default meta
type Story = StoryObj

const objectShadows = [
  { name: '1xl', class: 'shadow-1xl' },
  { name: '2xl', class: 'shadow-2xl' },
  { name: '3xl', class: 'shadow-3xl' },
]

const neutralDropShadows = [
  { name: 'neutral-drop-shadow', class: 'shadow-neutral-drop-shadow' },
  { name: 'neutral-drop-shadow-1xl', class: 'shadow-neutral-drop-shadow-1xl' },
  { name: 'neutral-drop-shadow-2xl', class: 'shadow-neutral-drop-shadow-2xl' },
  { name: 'neutral-drop-shadow-3xl', class: 'shadow-neutral-drop-shadow-3xl' },
]

const pinkDropShadows = [
  { name: 'pink-drop-shadow', class: 'shadow-pink-drop-shadow' },
  { name: 'pink-drop-shadow-1xl', class: 'shadow-pink-drop-shadow-1xl' },
  { name: 'pink-drop-shadow-2xl', class: 'shadow-pink-drop-shadow-2xl' },
  { name: 'pink-drop-shadow-3xl', class: 'shadow-pink-drop-shadow-3xl' },
]

const neutralShadowRound = [
  { name: 'neutral-shadow-round', class: 'shadow-neutral-shadow-round' },
  {
    name: 'neutral-shadow-round-1xl',
    class: 'shadow-neutral-shadow-round-1xl',
  },
  {
    name: 'neutral-shadow-round-2xl',
    class: 'shadow-neutral-shadow-round-2xl',
  },
  {
    name: 'neutral-shadow-round-3xl',
    class: 'shadow-neutral-shadow-round-3xl',
  },
]

const innerShadows = [
  { name: 'neutral-inner-shadow', class: 'shadow-neutral-inner-shadow' },
  {
    name: 'neutral-inner-shadow-1xl',
    class: 'shadow-neutral-inner-shadow-1xl',
  },
  {
    name: 'neutral-inner-shadow-2xl',
    class: 'shadow-neutral-inner-shadow-2xl',
  },
  {
    name: 'neutral-inner-shadow-3xl',
    class: 'shadow-neutral-inner-shadow-3xl',
  },
]

const neutralAboveShadows = [
  { name: 'neutral-above-shadow', class: 'shadow-neutral-above-shadow' },
  {
    name: 'neutral-above-shadow-1xl',
    class: 'shadow-neutral-above-shadow-1xl',
  },
  {
    name: 'neutral-above-shadow-2xl',
    class: 'shadow-neutral-above-shadow-2xl',
  },
  {
    name: 'neutral-above-shadow-3xl',
    class: 'shadow-neutral-above-shadow-3xl',
  },
]

const pinkAboveShadows = [
  { name: 'pink-above-shadow', class: 'shadow-pink-above-shadow' },
  { name: 'pink-above-shadow-1xl', class: 'shadow-pink-above-shadow-1xl' },
  { name: 'pink-above-shadow-2xl', class: 'shadow-pink-above-shadow-2xl' },
  { name: 'pink-above-shadow-3xl', class: 'shadow-pink-above-shadow-3xl' },
]

export const ObjectDropShadows: Story = {
  render: () => html`
    <div class="sb-unstyled">
      <h3>Object Drop Shadows</h3>
      <div class="flex gap-16 py-12">
        ${objectShadows.map(
          ({ name, class: shadowClass }) => html`
            <div
              class="${shadowClass} px-9 py-6 rounded-12 inline-flex heading-inter-14-bold sb-unstyled"
            >
              ${name}
            </div>
          `
        )}
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Basic object shadows with different sizes.',
      },
    },
  },
}

export const NeutralDropShadows: Story = {
  render: () => html`
    <div class="sb-unstyled">
      <h3>Neutral Drop Shadows</h3>
      <div class="flex gap-16 py-12 flex-wrap">
        ${neutralDropShadows.map(
          ({ name, class: shadowClass }) => html`
            <div
              class="${shadowClass} px-9 py-6 rounded-12 inline-flex heading-inter-14-bold sb-unstyled"
            >
              ${name}
            </div>
          `
        )}
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Neutral-colored drop shadows in various sizes.',
      },
    },
  },
}

export const PinkDropShadows: Story = {
  render: () => html`
    <div class="sb-unstyled">
      <h3>Pink Drop Shadows</h3>
      <div class="flex gap-16 py-12 flex-wrap">
        ${pinkDropShadows.map(
          ({ name, class: shadowClass }) => html`
            <div
              class="${shadowClass} px-9 py-6 rounded-12 inline-flex heading-inter-14-bold sb-unstyled"
            >
              ${name}
            </div>
          `
        )}
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Pink-colored drop shadows in various sizes.',
      },
    },
  },
}

export const RoundShadows: Story = {
  render: () => html`
    <div class="sb-unstyled">
      <h3>Round Shadows</h3>
      <div class="flex gap-16 py-12 flex-wrap">
        ${neutralShadowRound.map(
          ({ name, class: shadowClass }) => html`
            <div
              class="${shadowClass} px-9 py-6 rounded-12 inline-flex heading-inter-14-bold sb-unstyled"
            >
              ${name}
            </div>
          `
        )}
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Round shadow variations for circular or rounded elements.',
      },
    },
  },
}

export const InnerShadows: Story = {
  render: () => html`
    <div class="sb-unstyled">
      <h3>Inner Shadows</h3>
      <div class="flex gap-16 py-12 flex-wrap">
        ${innerShadows.map(
          ({ name, class: shadowClass }) => html`
            <div
              class="${shadowClass} px-9 py-6 rounded-12 inline-flex heading-inter-14-bold sb-unstyled"
            >
              ${name}
            </div>
          `
        )}
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Inner shadow effects that create inset/pressed appearances.',
      },
    },
  },
}

export const AboveShadows: Story = {
  render: () => html`
    <div class="sb-unstyled">
      <h3>Above Shadows</h3>
      <div class="flex gap-16 py-12 flex-wrap">
        ${[...neutralAboveShadows, ...pinkAboveShadows].map(
          ({ name, class: shadowClass }) => html`
            <div
              class="${shadowClass} px-9 py-6 rounded-12 inline-flex heading-inter-14-bold sb-unstyled"
            >
              ${name}
            </div>
          `
        )}
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story:
          'Above shadows for elevated elements in both neutral and pink variants.',
      },
    },
  },
}
