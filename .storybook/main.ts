import * as path from 'node:path'
import { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { mergeConfig } from 'vite'
// @ts-ignore - Tailwind CSS v4 Vite plugin
import tailwindcss from '@tailwindcss/vite'

import type { StorybookConfig } from '@storybook/web-components-vite'

const __dirname = dirname(fileURLToPath(import.meta.url))

const resolve = {
  alias: {
    '@': path.resolve(__dirname, '../src'),
    '@styles': path.resolve(__dirname, '../package/dist/styles'),
  },
}

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx)'],
  staticDirs: [
    { from: '../src/shared', to: '/' },
    { from: './assets', to: '/' },
    { from: '../src/components/lukso-icon/vuesax', to: '/vuesax' },
  ],
  addons: ['@storybook/addon-links', '@storybook/addon-docs'],
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
      // Allow Vite to serve and process files from package/dist and project root
      server: {
        fs: {
          allow: [
            path.resolve(__dirname, '..'), // Project root (includes node_modules, src, etc)
          ],
        },
      },
      plugins: [tailwindcss()],
    })
  },
}

export default config
