import { createRequire } from 'node:module'
import { mergeConfig } from 'vite'
import * as path from 'path'
import { dirname, join } from 'path'
import type { StorybookConfig } from '@storybook/web-components-vite'

const require = createRequire(import.meta.url)

const resolve = {
  alias: {
    '@': path.resolve(__dirname, '../src'),
  },
}

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx)'],
  staticDirs: ['../src/shared', './assets'],
  addons: [
    getAbsolutePath('@storybook/addon-links'),
    getAbsolutePath('@storybook/preset-scss'),
    getAbsolutePath('@storybook/addon-docs'),
  ],
  framework: {
    name: getAbsolutePath('@storybook/web-components-vite'),
    options: {
      builder: {
        viteConfigPath: undefined,
      },
    },
  },
  core: {
    builder: getAbsolutePath('@storybook/builder-vite'),
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
    })
  },
}

export default config

function getAbsolutePath(value: string): any {
  return dirname(require.resolve(join(value, 'package.json')))
}
