// Global test setup for Storybook Test Runner

// Set longer default timeout for all tests
jest.setTimeout(90000)

// Add custom matchers or global setup if needed
beforeEach(() => {
  // Reset any global state before each test
})

// Wait for custom elements to be defined
const waitForCustomElements = async () => {
  await customElements.whenDefined('lukso-markdown-editor')
  await customElements.whenDefined('lukso-textarea')
  await customElements.whenDefined('lukso-button')
  await customElements.whenDefined('lukso-dropdown')
  await customElements.whenDefined('lukso-dropdown-option')
}

// Make waitForCustomElements available globally
global.waitForCustomElements = waitForCustomElements
