const { mergeConfig } = require('vite')
const path = require('path')

const resolve = {
  alias: {
    '@': path.resolve(__dirname, '../src'),
  },
}

module.exports = {
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx|mdx)'],
  staticDirs: ['../src/shared', './assets'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-controls',
    '@storybook/preset-scss',
    '@storybook/addon-postcss',
  ],
  framework: {
    name: '@storybook/web-components-vite',
    options: {},
  },
  core: {
    builder: '@storybook/builder-vite',
  },
  base: process.env.STORYBOOK_BASE_URL || '/',
  docs: {
    autodocs: true,
  },
  features: {
    interactionsDebugger: true, // 👈 Enable playback controls
  },
  async viteFinal(config) {
    // Merge custom configuration into the default config
    return mergeConfig(config, {
      // Add dependencies to pre-optimization
      resolve,
      optimizeDeps: {
        include: ['storybook-dark-mode'],
      },
    })
  },
}
