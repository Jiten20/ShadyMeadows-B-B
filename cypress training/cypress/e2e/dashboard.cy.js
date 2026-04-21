// Spec covers:
//   ✅ Navigate to admin login URL
//   ✅ Login with valid credentials (admin / password)
//   ✅ Assert redirect to Dashboard/Inboxes view
//   ✅ Assert Logout button is present
//   ✅ BONUS: Navigate to Rooms tab and verify room details match homepage
// ─────────────────────────────────────────────────────────────────────────────
import dashboardPage from "../pageObjects/dashboardPage";
import loginPage from "../pageObjects/loginPage";
import roomsPage from "../pageObjects/roomsPage";
describe('Dashboard Page', () => {

    beforeEach(function () {
        cy.visit(Cypress.env('adminUrl'));
    });

    it('should redirect to the admin dashboard after valid login', function () {
        loginPage.loginWithDefaultCredentials();
        dashboardPage.verifyDashboardLoaded();
    });

    it('Verify navigation bar after login', function () {
        loginPage.loginWithDefaultCredentials();
        dashboardPage.verifyHeader();
    });

    it('should navigate to the Messages view via the nav link', function () {
        loginPage.loginWithDefaultCredentials();
        dashboardPage.selectMessages();
    });

    it('should log out and return to the login page', function () {
        loginPage.loginWithDefaultCredentials();
        dashboardPage.verifyLogout();
    });

    it('Verify Rooms tab navigation', () => {
        loginPage.loginWithDefaultCredentials();
        roomsPage.selectRoom();
    });
});
