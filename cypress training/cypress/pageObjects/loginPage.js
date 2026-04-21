class LoginPage {
    
    elements = {
        usernameInput: () => cy.get('#username'),
        passwordInput: () => cy.get('#password'),
        loginButton: () => cy.get('#doLogin')
    };
    
    /**
      * Fill in credentials and click Login.
      * @param {string} username
      * @param {string} password
      */
    loginWith(username, password) {
        this.elements.usernameInput().clear().type(username);
        this.elements.passwordInput().clear().type(password);
        this.elements.loginButton().click();
        return this;
    }

    /**
     * Login using the credentials stored in cypress.config.js env vars.
     * This is the standard login used by most tests.
     */
    loginWithDefaultCredentials() {
        return this.loginWith(
            Cypress.env('adminUsername'),
            Cypress.env('adminPassword')
        );
    }

}
export default new LoginPage();