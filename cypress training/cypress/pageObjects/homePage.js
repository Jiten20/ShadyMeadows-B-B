class homePage {
    elements = {
        contactSection: () => cy.get('section[id = "contact"]'),
        bookNowButton: () => cy.contains('Book Now'),
        contactNameInput: () => cy.get('[data-testid="ContactName"]'),
        contactEmailInput: () => cy.get('[data-testid="ContactEmail"]'),
        contactSubjectInput: () => cy.get('[data-testid="ContactSubject"]'),
        contactMessageInput: () => cy.get('[data-testid="ContactDescription"]'),
        contactSubmitButton: () => cy.get('.btn[type="button"]').contains('Submit')
    };

    /**
 * Scroll the Contact section into view.
 * The homepage is single-page so the contact form is below the fold.
 */
    scrollToContactSection() {
        // Using scrollIntoView on the section element is more reliable than
        // window.scrollTo because it works regardless of the section's offset.
        this.elements.contactSection().scrollIntoView();
        return this;
    }

    /**
 * Assert the Contact form section is visible on the page.
 * Scrolls first because the form is below the fold on load.
 */
    validateContactForm() {
        cy.log('Validating Contact form visibility and fields');
        this.scrollToContactSection();
        this.elements.contactSection().should('be.visible');
        this.elements.contactNameInput().should('be.visible');
        this.elements.contactEmailInput().should('be.visible');
        this.elements.contactSubjectInput().should('be.visible');
        this.elements.contactMessageInput().should('be.visible');
        this.elements.contactSubmitButton().should('be.visible');
    }

    /**
     * Assert each "Book this room" button has the correct text.
     */
    validateBookNow(testData) {
        cy.log('Validating "Book Now" buttons are visible with correct text');
        this.elements.bookNowButton().should('have.text', testData).and('have.length.greaterThan', 0);
    }
}

export default new homePage();
