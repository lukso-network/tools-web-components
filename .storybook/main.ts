import * as path from 'node:path'
import { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { mergeConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

import type { StorybookConfig } from '@storybook/web-components-vite'

const __dirname = dirname(fileURLToPath(import.meta.url))

const resolve = {
  alias: {
    '@': path.resolve(__dirname, '../src'),
  },
}

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx)'],
  staticDirs: [
    '../src/shared',
    './assets',
    '../src/components/lukso-icon/vuesax',
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/preset-scss',
    '@storybook/addon-docs',
  ],
  framework: {
    name: '@storybook/web-components-vite',
    options: {
      builder: {
        viteConfigPath: undefined,
      },
    },
  },
  core: {
    builder: '@storybook/builder-vite',
  },
  docs: {
    defaultName: 'Documentation',
  },
  async viteFinal(config) {
    // Merge custom configuration into the default config
    return mergeConfig(config, {
      // Add dependencies to pre-optimization
      resolve,
      optimizeDeps: {
        include: ['storybook-dark-mode', '@mdx-js/react'],
      },
      // Define environment variables for Storybook detection
      define: {
        'process.env.STORYBOOK': JSON.stringify(true),
        'import.meta.env.STORYBOOK': JSON.stringify(true),
      },
      plugins: [tailwindcss()],
    })
  },
}

export default config
