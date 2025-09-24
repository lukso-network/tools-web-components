module.exports = {
  // Set longer timeout for all operations
  testTimeout: 120000,

  // Jest configuration
  jest: {
    testTimeout: 120000,
  },

  async preVisit(page, context) {
    // Set page timeouts
    await page.setDefaultTimeout(120000)

    // Wait for page to be fully loaded
    await page.waitForLoadState('networkidle')
  },
}
