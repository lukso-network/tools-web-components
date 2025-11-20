import { html } from 'lit'

import type { Meta, StoryObj } from '@storybook/web-components-vite'
import '../components/lukso-icon'

/**
 * Documentation and overview of all available icons in the Vuesax icon pack.
 */
const vuesaxIconModules = import.meta.glob(
  '../components/lukso-icon/vuesax/**/*.svg',
  { eager: true, query: '?url' }
)

// Function to extract icons by variant from the glob imports
function getIconsByVariant() {
  const iconsByVariant: Record<string, string[]> = {}

  Object.keys(vuesaxIconModules).forEach(path => {
    // Extract variant and icon name from path
    // Path format: ../components/lukso-icon/vuesax/{variant}/{iconName}.svg
    const pathParts = path.split('/')
    const variant = pathParts[pathParts.length - 2] // Get variant folder name
    const iconName = pathParts[pathParts.length - 1].replace('.svg', '') // Get filename without .svg

    if (!iconsByVariant[variant]) {
      iconsByVariant[variant] = []
    }

    if (!iconsByVariant[variant].includes(iconName)) {
      iconsByVariant[variant].push(iconName)
    }
  })

  // Sort icons alphabetically within each variant
  Object.keys(iconsByVariant).forEach(variant => {
    iconsByVariant[variant].sort()
  })

  return iconsByVariant
}

const meta: Meta = {
  title: 'Design System/Vuesax Icon Pack',
  parameters: {
    layout: 'padded',
    controls: {
      disable: true,
      hideNoControlsWarning: true,
    },
    actions: {
      disable: true,
    },
    docs: {
      description: {
        component: `
The Vuesax icon pack provides a comprehensive set of icons across multiple variants. Each variant offers a different visual style for the same icon concept.

## Usage

Icons can be used with the \`lukso-icon\` component:

\`\`\`html
<lukso-icon name="link" size="medium" pack="vuesax" variant="linear"></lukso-icon>
\`\`\`

## Available Sizes

- \`x-small\` - 12x12px
- \`small\` - 16x16px
- \`medium\` - 24x24px
- \`large\` - 32x32px
- \`x-large\` - 40x40px
- \`2x-large\` - 64x64px

## Available Variants
- \`linear\` - Clean line-based icons
- \`bold\` - Filled thick icons
- \`broken\` - Broken line style icons
- \`bulk\` - Filled with light backgrounds
- \`outline\` - Outlined style icons
- \`twotone\` - Two-tone color icons

## Adding icons

- Copy SVG files into \`src/components/lukso-icon/vuesax/{variant}/\` directory.
- That's it! New icons will be automatically included in the documentation.
        `,
      },
    },
  },
  // Explicitly remove component reference to prevent auto-detection
}
export default meta
type Story = StoryObj

export const AllIconsOverview: Story = {
  render: () => {
    const iconsByVariant = getIconsByVariant()

    return html`
      <div>
        ${Object.entries(iconsByVariant).map(
          ([variant, icons]) => html`
            <div style="margin-bottom: 40px;">
              <h3
                style="margin: 0 0 16px 0; font-size: 18px; font-weight: 500; text-transform: capitalize;"
              >
                ${variant} (${icons.length} icons)
              </h3>
              <div
                style="display: grid; grid-template-columns: repeat(auto-fill, minmax(130px, 1fr)); gap: 16px;"
              >
                ${icons.map(
                  iconName => html`
                    <div
                      style="display: flex; flex-direction: column; align-items: center; padding: 12px; border: 1px solid #e0e0e0; border-radius: 6px; background: white;"
                    >
                      <lukso-icon
                        pack="vuesax"
                        variant="${variant}"
                        name="${iconName}"
                        size="medium"
                      ></lukso-icon>
                      <span
                        style="margin-top: 6px; font-size: 10px; text-align: center; font-family: monospace;"
                        >${iconName}</span
                      >
                    </div>
                  `
                )}
              </div>
            </div>
          `
        )}
      </div>
    `
  },
  parameters: {
    controls: {
      disable: true,
      hideNoControlsWarning: true,
    },
    actions: { disable: true },
    docs: {
      canvas: { sourceState: 'none' },
    },
  },
}
