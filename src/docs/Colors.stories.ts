import { html } from 'lit'

import {
  colorPalette,
  neutral1,
  neutral2,
  neutral3,
  grey1,
  grey2,
} from '../shared/tools/tailwind-config'

import type { Meta, StoryObj } from '@storybook/web-components-vite'

const meta: Meta = {
  title: 'Design System/Colors',
  parameters: {
    docs: {
      description: {
        component: `
We use colors that have fixed \`hue\` and \`saturation\` and operate over \`lightness\` values.
For instance in \`neutral-20\` the lightness value is \`20\`.

## Example Usage

Apply color class like any other Tailwind color, for example:

\`\`\`html
<span class="bg-neutral-20 text-honey-72">Text</span>
\`\`\`
        `,
      },
    },
  },
}

export default meta
type Story = StoryObj

// Helper function to create color items
const createColorSection = (
  colors: Record<string, string>,
  prefix?: string
) => {
  if (!colors) return html``

  return html`
    <div class="color-section">
      <div class="color-grid">
        ${Object.entries(colors).map(
          ([name, color]) => html`
            <div class="color-item">
              <div
                class="color-swatch"
                style="background-color: ${color}"
              ></div>
              <div class="color-name">
                ${prefix ? `${prefix}-` : ''}${name}: ${color}
              </div>
            </div>
          `
        )}
      </div>
    </div>

    <style>
      .color-section {
        margin-bottom: 2rem;
      }

      .color-section h3 {
        margin-bottom: 1rem;
        font-weight: 600;
        font-size: 1.125rem;
      }

      .color-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
        gap: 1rem;
        margin-bottom: 2rem;
      }

      .color-item {
        border: 1px solid #e0e0e0;
        border-radius: 8px;
        overflow: hidden;
        background: white;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        transition: transform 0.2s ease;
      }

      .color-item:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
      }

      .color-swatch {
        height: 80px;
        width: 100%;
        position: relative;
      }

      .color-name {
        padding: 0.75rem;
        font-size: 0.875rem;
        font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
        line-height: 1.4;
        color: #374151;
        background: #f9fafb;
        border-top: 1px solid #e5e7eb;
      }

      h2 {
        margin-bottom: 2rem;
        font-size: 2rem;
        font-weight: 700;
        color: #111827;
      }
    </style>
  `
}

export const Neutral: Story = {
  render: () => html`
    <div class="sb-unstyled">
      ${createColorSection(neutral1, 'neutral')}
      ${createColorSection(neutral2, 'neutral')}
      ${createColorSection(neutral3, 'neutral')}
    </div>
  `,
}

export const Honey: Story = {
  render: () => html`
    <div class="sb-unstyled">
      ${createColorSection(colorPalette.honey, 'honey')}
    </div>
  `,
}

export const Coral: Story = {
  render: () => html`
    <div class="sb-unstyled">
      ${createColorSection(colorPalette.coral, 'coral')}
    </div>
  `,
}

export const Warm: Story = {
  render: () => html`
    <div class="sb-unstyled">
      ${createColorSection(colorPalette.warm, 'warm')}
    </div>
  `,
}

export const SeaSalt: Story = {
  render: () => html`
    <div class="sb-unstyled">
      ${createColorSection(colorPalette['sea-salt'], 'sea-salt')}
    </div>
  `,
}

export const Cloud: Story = {
  render: () => html`
    <div class="sb-unstyled">
      ${createColorSection(colorPalette.cloud, 'cloud')}
    </div>
  `,
}

export const Ocean: Story = {
  render: () => html`
    <div class="sb-unstyled">
      ${createColorSection(colorPalette.ocean, 'ocean')}
    </div>
  `,
}

export const Sky: Story = {
  render: () => html`
    <div class="sb-unstyled">
      ${createColorSection(colorPalette.sky, 'sky')}
    </div>
  `,
}

export const Lukso: Story = {
  render: () => html`
    <div class="sb-unstyled">
      ${createColorSection(colorPalette.lukso, 'lukso')}
    </div>
  `,
}

export const Yellow: Story = {
  render: () => html`
    <div class="sb-unstyled">
      ${createColorSection(colorPalette.yellow, 'yellow')}
    </div>
  `,
}

export const Green: Story = {
  render: () => html`
    <div class="sb-unstyled">
      ${createColorSection(colorPalette.green, 'green')}
    </div>
  `,
}

export const Blue: Story = {
  render: () => html`
    <div class="sb-unstyled">
      ${createColorSection(colorPalette.blue, 'blue')}
    </div>
  `,
}

export const Red: Story = {
  render: () => html`
    <div class="sb-unstyled">
      ${createColorSection(colorPalette.red, 'red')}
    </div>
  `,
}

export const Gray: Story = {
  render: () => html`
    <div class="sb-unstyled">
      ${createColorSection(grey1, 'gray')} ${createColorSection(grey2, 'gray')}
    </div>
  `,
}

export const Purple: Story = {
  render: () => html`
    <div class="sb-unstyled">
      ${createColorSection(colorPalette.purple, 'purple')}
    </div>
  `,
}

export const Pink: Story = {
  render: () => html`
    <div class="sb-unstyled">
      ${createColorSection(colorPalette.pink, 'pink')}
    </div>
  `,
}

export const Gradients: Story = {
  render: () => html`
    <div class="sb-unstyled">
      ${createColorSection(colorPalette['gradient-1'], 'gradient-1')}
      ${createColorSection(colorPalette['gradient-2'], 'gradient-2')}
      ${createColorSection(colorPalette['gradient-3'], 'gradient-3')}
    </div>
  `,
}
