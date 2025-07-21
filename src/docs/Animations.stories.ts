import { html } from 'lit'

import type { Meta, StoryObj } from '@storybook/web-components-vite'
import '../components/lukso-icon/index'

const meta: Meta = {
  title: 'Design System/Animations',
  parameters: {
    docs: {
      description: {
        component: `
Animations can be applied to any element through special CSS classes. For animating icons you pass animation name.

## Example usage

\`\`\`html
<div class="w-[12px] h-[12px] bg-green-54 animate-spin"></div>
\`\`\`

## Animation Utilities

- **Delay animation**: Add \`animation-delay-[value]\` class
- **Animation count**: Add \`animation-iteration-[value]\` class
- **Animation duration**: Add \`animation-duration-[value]\` class
- **Animation fill mode**: Add \`animation-fill-[value]\` class
        `,
      },
    },
  },
}

export default meta
type Story = StoryObj

const animations = [
  { name: 'animate-spin', description: 'Continuous spinning animation' },
  {
    name: 'animate-ping',
    description: 'Ping effect for notifications',
    extraClasses: 'rounded-full',
  },
  {
    name: 'animate-pulse',
    description: 'Gentle pulsing effect',
    extraClasses: 'rounded-full',
  },
  {
    name: 'animate-bounce',
    description: 'Bouncing animation',
    extraClasses: 'rounded-full',
  },
  {
    name: 'animate-bounce2',
    description: 'Alternative bounce effect',
    extraClasses: 'rounded-full',
  },
  {
    name: 'animate-pulse-resize',
    description: 'Pulsing with resize',
    extraClasses: 'rounded-full',
  },
  {
    name: 'animate-resize-in',
    description: 'Resize animation with infinite iteration',
    extraClasses:
      'rounded-full animation-iteration-infinite animation-duration-1000',
  },
  {
    name: 'animate-fade-in',
    description: 'Fade in animation with opacity start',
    extraClasses:
      'rounded-full opacity-0 animation-iteration-infinite animation-duration-1000',
  },
]

export const AnimationList: Story = {
  render: () => html`
    <div class="sb-unstyled">
      <h3>Animation List</h3>
      ${animations.map(
        ({ name, description, extraClasses = '' }) => html`
          <div class="p-5 my-6 shadow-neutral-above-shadow rounded sb-unstyled">
            <h4>\`${name}\`</h4>
            <p class="text-sm text-gray-600 mb-4">${description}</p>
            <div
              class="mt-6 w-[12px] h-[12px] bg-green-54 ${name} ${extraClasses}"
            ></div>
          </div>
        `
      )}
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'All available animation classes with live examples.',
      },
    },
  },
}

export const AnimationUtilities: Story = {
  render: () => html`
    <div class="sb-unstyled">
      <h3>Animation Utilities</h3>

      <div class="p-5 my-6 shadow-neutral-above-shadow rounded sb-unstyled">
        <h4>Delay Animation</h4>
        <p>
          You can delay animation by adding \`animation-delay-[value]\` class.
        </p>
        <div class="flex gap-4 mt-4">
          <div class="w-[12px] h-[12px] bg-green-54 animate-spin"></div>
          <div
            class="w-[12px] h-[12px] bg-blue-54 animate-spin animation-delay-100"
          ></div>
          <div
            class="w-[12px] h-[12px] bg-red-54 animate-spin animation-delay-200"
          ></div>
        </div>
        <pre class="mt-2 text-xs bg-gray-100 p-2 rounded">
&lt;div class="animate-spin animation-delay-100"&gt;&lt;/div&gt;
        </pre
        >
      </div>

      <div class="p-5 my-6 shadow-neutral-above-shadow rounded sb-unstyled">
        <h4>Animation Count</h4>
        <p>
          You can set animation count by adding \`animation-iteration-[value]\`
          class.
        </p>
        <div class="mt-4">
          <div
            class="w-[12px] h-[12px] bg-green-54 animate-bounce animation-iteration-3"
          ></div>
        </div>
        <pre class="mt-2 text-xs bg-gray-100 p-2 rounded">
&lt;div class="animate-spin animation-iteration-infinite"&gt;&lt;/div&gt;
        </pre
        >
      </div>

      <div class="p-5 my-6 shadow-neutral-above-shadow rounded sb-unstyled">
        <h4>Animation Duration</h4>
        <p>
          You can set animation duration by adding
          \`animation-duration-[value]\` class.
        </p>
        <div class="flex gap-4 mt-4">
          <div
            class="w-[12px] h-[12px] bg-green-54 animate-spin animation-duration-500"
          ></div>
          <div
            class="w-[12px] h-[12px] bg-blue-54 animate-spin animation-duration-1000"
          ></div>
          <div
            class="w-[12px] h-[12px] bg-red-54 animate-spin animation-duration-2000"
          ></div>
        </div>
        <pre class="mt-2 text-xs bg-gray-100 p-2 rounded">
&lt;div class="animate-spin animation-duration-1000"&gt;&lt;/div&gt;
        </pre
        >
      </div>

      <div class="p-5 my-6 shadow-neutral-above-shadow rounded sb-unstyled">
        <h4>Animation Fill Mode</h4>
        <p>
          You can set animation fill mode by adding \`animation-fill-[value]\`
          class.
        </p>
        <div class="mt-4">
          <div
            class="w-[12px] h-[12px] bg-green-54 animate-bounce animation-fill-forwards animation-iteration-1"
          ></div>
        </div>
        <pre class="mt-2 text-xs bg-gray-100 p-2 rounded">
&lt;div class="animate-spin animation-fill-forwards"&gt;&lt;/div&gt;
        </pre
        >
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story:
          'Examples of animation utility classes for customizing animation behavior.',
      },
    },
  },
}
