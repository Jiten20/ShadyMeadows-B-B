const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {

    // ── Base URL ───────────────────────────────────────────────────────────────
    // cy.visit('/') resolves to this. Override per env:
    //   CYPRESS_BASE_URL=http://localhost:8080 npx cypress run
    baseUrl: 'https://automationintesting.online',

    // ── Timeouts ─────────────────────────────────────────────────────────────
    defaultCommandTimeout: 10000,   // Wait up to 10s for elements
    pageLoadTimeout: 30000,   // Wait up to 30s for page loads
    requestTimeout: 10000,

    // ── Screenshots & Videos ─────────────────────────────────────────────────
    screenshotsFolder: 'cypress/screenshots',
    videosFolder: 'cypress/videos',
    video: true,           // Record video in CI
    screenshotOnRunFailure: true,

    // ── Retries ──────────────────────────────────────────────────────────────
    // Retry flaky tests automatically (platform resets every 10min)
    retries: {
      runMode: 2,   // Retries in CI (cypress run)
      openMode: 0    // No retries in interactive mode
    },

    // ── Add these three lines ──────────────────────────────
    reporter: 'mochawesome',
    reporterOptions: {
      reportDir: 'cypress/reports',
      overwrite: false,
      html: false,   // html=false here — we generate it in merge step
      json: true,    // json=true — needed for the merge step
      charts: true,
      reportPageTitle: 'Shady Meadows B&B — Test Report'
    },

    // ── Environment variables ─────────────────────────────────────────────────
    // Access in tests via Cypress.env('adminUsername') etc.
    // Override at runtime: CYPRESS_ADMIN_PASSWORD=xxx cypress run
    env: {
      adminUsername: 'admin',
      adminPassword: 'password',
      adminUrl: '/admin'
    },

    // ── Viewport ─────────────────────────────────────────────────────────────
    viewportWidth: 1280,
    viewportHeight: 720,
  },

})


