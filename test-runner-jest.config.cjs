const { getJestConfig } = require('@storybook/test-runner')

/**
 * @type {import('@jest/types').Config.InitialOptions}
 */
module.exports = {
  // The default configuration comes from @storybook/test-runner
  ...getJestConfig(),

  // Configure test results directory for CI
  reporters: [
    'default',
    [
      'jest-junit',
      {
        outputDirectory: 'test-results',
        outputName: 'storybook-junit.xml',
        usePathForSuiteName: true,
      },
    ],
  ],

  // Set timeout for CI environments
  testTimeout: 60000,

  // Ensure test results are always written
  forceExit: true,

  // Configure Playwright-specific options
  testEnvironmentOptions: {
    'jest-playwright': {
      browsers: ['chromium'],
      exitOnPageError: false,
      launchOptions: {
        headless: true,
        args: ['--no-sandbox', '--disable-dev-shm-usage'],
      },
      contextOptions: {
        viewport: { width: 1280, height: 720 },
        ignoreHTTPSErrors: true,
      },
    },
  },
}
