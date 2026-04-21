// cypress/e2e/homepageSanity.cy.js
// ─────────────────────────────────────────────────────────────────────────────
// Part 2, Test 1: Homepage Sanity
//
// Spec covers:
//   Homepage loads successfully
//   Contact form is visible
//   "Book this room" buttons are present for listed room types
//   Each button has the correct label text
// POM import: All interactions go through Page Objects — zero raw cy.get()
// calls in this file. If a selector changes, we fix it in ONE place (the POM).
// ─────────────────────────────────────────────────────────────────────────────

// Import page objects — never import cy.* directly in spec files

import homePage from "../pageObjects/homePage";

describe('Home Page Sanity', () => {

    beforeEach(function () {
        // Load fixtures once before all tests in this suite
        cy.fixture('homeSanity').as('homedata');
        cy.visitHomepage();
    });

    it('should return HTTP 200 and display the correct page title', function () {
        cy.request('/').its('status').should('eq', 200);
        cy.title().should('eq', this.homedata.title);
    });
    it('should display the Contact form with all required fields visible', function () {
        homePage.validateContactForm();
    });

    it('should display Book Now buttons for all listed room types', function () {
        homePage.validateBookNow(this.homedata.booknow);
    });

});