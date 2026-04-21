// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'

// Alternatively you can use CommonJS syntax:
// require('./commands')

// Prevent Cypress from failing the test when the application throws a known
// 'TenantFeatures' undefined error. This ignores uncaught exceptions that
// include 'TenantFeatures' in the message. Keep other errors failing so real
// issues are still surfaced.

// cypress/support/e2e.ts

Cypress.on('uncaught:exception', (err) => {
  // Cypress and React Hydration don't always play well together.
  // This prevents tests from failing due to known hydration mismatches.
  if (
    /hydrat/i.test(err.message) ||
    err.message.includes('Minified React error #418') ||
    err.message.includes('Minified React error #423')
  ) {
    return false;
  }
});
