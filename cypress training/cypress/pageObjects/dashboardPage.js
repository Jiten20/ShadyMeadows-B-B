class DashboardPage {

    elements = {
        logOutButton: () => cy.get('button').contains('Logout'),
        navBar: () => cy.get('.navbar, nav.navbar'),
        messagesButton: () => cy.get('a').contains('Messages ')
    };
    verifyDashboardLoaded() {
        cy.log('Verifying dashboard loaded by checking URL');
        cy.url().should('include', '/admin');
    }

    verifyLogout() {
        cy.log('Verifying Logout button is visible');
        this.elements.logOutButton().should('be.visible');
    }

    verifyHeader() {
        cy.log('Verifying header is visible');
        this.elements.navBar().should('be.visible');
    }

    selectMessages(){
        cy.log('Selecting Messages from the navigation bar');
        this.elements.messagesButton().click();
    }

}

export default new DashboardPage();
