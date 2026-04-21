# Shady Meadows B&B — Cypress UI Automation Suite

End-to-end UI automation for [automationintesting.online](https://automationintesting.online) built with **Cypress 15** using the **Page Object Model (POM)** design pattern.

---

## 📁 Project Structure

```
cypress training/
│
├── cypress/
│   ├── e2e/                              ← Spec (test) files
│   │   ├── homePageSanity.cy.js          ← Homepage sanity tests (3 tests)
│   │   └── dashboard.cy.js              ← Admin auth & dashboard tests (5 tests)
│   │
│   ├── fixtures/
│   │   └── homeSanity.json              ← Test data: page title, button text
│   │
│   ├── pageObjects/                     ← Page Object Model classes
│   │   ├── homePage.js                  ← Homepage: contact form + Book Now buttons
│   │   ├── loginPage.js                 ← Admin login form actions
│   │   ├── dashboardPage.js             ← Post-login dashboard: nav, logout, messages
│   │   └── roomsPage.js                 ← Admin Rooms tab navigation
│   │
│   ├── support/
│   │   ├── commands.js                  ← Custom command: cy.visitHomepage()
│   │   └── e2e.js                       ← Global hooks & uncaught exception handler
│   │
│   ├── reports/                         ← Mochawesome JSON reports (auto-generated)
│   │   ├── mochawesome.json
│   │   └── mochawesome_001.json ... 013
│   │
│   ├── screenshots/                     ← Auto-captured on test failure
│   └── videos/                          ← Recorded during headless runs
│       ├── dashboard.cy.js.mp4
│       └── homePageSanity.cy.js.mp4
│
├── .vscode/
│   └── launch.json                      ← VS Code debug configuration
│
├── cypress.config.js                    ← Cypress config: baseUrl, timeouts, reporter
├── package.json                         ← Scripts & dependencies
└── README.md                            ← This file
```

---

## ✅ Test Results Summary

| Suite | Tests | Passing | Failing |
|-------|-------|---------|---------|
| Home Page Sanity | 3 | ✅ 3 | 0 |
| Dashboard Page | 5 | ✅ 5 | 0 |
| **Total** | **8** | ✅ **8** | **0** |

### Home Page Sanity (`homePageSanity.cy.js`)

| # | Test | Status |
|---|------|--------|
| 1 | should return HTTP 200 and display the correct page title | ✅ PASS |
| 2 | should display the Contact form with all required fields visible | ✅ PASS |
| 3 | should display Book Now buttons for all listed room types | ✅ PASS |

### Dashboard Page (`dashboard.cy.js`)

| # | Test | Status |
|---|------|--------|
| 1 | should redirect to the admin dashboard after valid login | ✅ PASS |
| 2 | Verify navigation bar after login | ✅ PASS |
| 3 | should navigate to the Messages view via the nav link | ✅ PASS |
| 4 | should log out and return to the login page | ✅ PASS |
| 5 | Verify Rooms tab navigation | ✅ PASS |

---

## ⚙️ Setup & Installation

### Prerequisites
- **Node.js** 18 or higher
- **npm** 9 or higher

### Install Dependencies

```bash
npm install
```

This installs:
- `cypress` ^15.5.0
- `mochawesome` ^7.1.4 — JSON/HTML reporter
- `mochawesome-merge` ^4.4.1 — merges per-spec JSON files
- `mochawesome-report-generator` ^6.3.2 — generates final HTML report

---

## 🚀 Running Tests

| Command | Description |
|---------|-------------|
| `npm run cy:open` | Opens Cypress interactive browser (pick specs manually) |
| `npm run cy:run` | Runs all specs headlessly |
| `npm run cy:run:chrome` | Runs all specs in Chrome headlessly |
| `npm run cy:smoke` | Runs homepage sanity spec only |
| `npm run cy:dashboard` | Runs dashboard spec only |
| `npm run cy:report` | Runs all tests **and** generates the HTML report |

### Examples

```bash
# Interactive mode — see tests run live in the browser
npm run cy:open

# Full headless run — all specs
npm run cy:run

# Run homepage tests only (smoke check)
npm run cy:smoke

# Run admin tests only
npm run cy:dashboard
```

---

## 📊 Generating the HTML Report

### Important — Clear old reports first

Always clear the `cypress/reports/` folder before generating a fresh report.
This prevents old `full-report.json` from being re-read by the merge step,
which would cause a `SyntaxError: Unexpected end of JSON input` error.

```bash
# Step 1 — Clear old reports
# Windows:
rd /s /q cypress\reports && mkdir cypress\reports

# Mac / Linux:
rm -rf cypress/reports && mkdir cypress/reports

# Step 2 — Run tests and generate report in one command
npm run cy:report

# Step 3 — Open the report
# Windows:
start cypress\reports\full-report.html

# Mac:
open cypress/reports/full-report.html
```

### How the report pipeline works

```
npm run cy:report
       │
       ├─► cypress run
       │     └─► Runs all specs headlessly
       │         Outputs per-spec JSON files:
       │           cypress/reports/mochawesome.json
       │           cypress/reports/mochawesome_001.json
       │
       └─► npm run report:merge
             │
             ├─► mochawesome-merge cypress/reports/mochawesome*.json
             │     └─► Merges all JSON → full-report.json
             │         (uses mochawesome*.json glob — never reads full-report.json itself)
             │
             └─► marge full-report.json --inline --charts
                   └─► Generates full-report.html
                       (self-contained, shareable, no external dependencies)
```

> **Why `mochawesome*.json` and not `*.json`?**
> The glob `mochawesome*.json` deliberately excludes `full-report.json`.
> Using `*.json` causes the merge to read its own output on subsequent runs,
> producing a corrupt file and a JSON parse error.

---

## 🏗️ Design Approach

### Page Object Model (POM)

Every page of the application has a dedicated class in `cypress/pageObjects/`.
Spec files **never** contain raw `cy.get()` calls — they only call Page Object methods.

```
Spec file  →  Page Object  →  Cypress commands  →  Browser
```

This means if a selector changes, you fix it in **one place** (the Page Object),
not across multiple test files.

**Example:**

```js
// ✅ How specs call the POM (clean, readable)
homePage.validateContactForm();
loginPage.loginWithDefaultCredentials();
dashboardPage.verifyLogout();

// ❌ What specs do NOT do (brittle, hard to maintain)
cy.get('[data-testid="ContactName"]').should('be.visible');
cy.get('#username').type('admin');
```

### CSS Selector Strategy

Selectors are chosen in this priority order:

| Priority | Type | Example | Reason |
|----------|------|---------|--------|
| ✅ 1st | `[data-testid]` | `[data-testid="ContactName"]` | Purpose-built for testing, never changes for styling |
| ✅ 2nd | `#id` | `#username`, `#doLogin` | Unique by HTML spec |
| ✅ 3rd | Semantic class | `section[id="contact"]` | Describes role, not visual style |
| ⚠️ 4th | Scoped text | `cy.get('button').contains('Logout')` | Stable unless copy changes |
| ❌ Avoid | Layout classes | `.col-md-3`, `.text-center` | Change with visual redesigns |
| ❌ Avoid | nth-child | `li:nth-child(2)` | Breaks if element order changes |

### Page Objects — What Each File Does

#### `homePage.js`
Manages the public homepage (`/`).
- `validateContactForm()` — scrolls to the contact section and asserts all fields are visible
- `validateBookNow(text)` — asserts Book Now buttons exist with the correct label

#### `loginPage.js`
Manages the admin login screen (`/admin`).
- `loginWith(username, password)` — types credentials and clicks login
- `loginWithDefaultCredentials()` — reads credentials from `cypress.config.js` env vars

#### `dashboardPage.js`
Manages the post-login admin dashboard.
- `verifyDashboardLoaded()` — asserts URL includes `/admin`
- `verifyHeader()` — asserts navbar is visible
- `verifyLogout()` — asserts Logout button is visible
- `selectMessages()` — clicks the Messages nav link

#### `roomsPage.js`
Manages the Rooms tab in the admin panel.
- `selectRoom()` — clicks the Rooms nav link

### Custom Commands (`support/commands.js`)

| Command | Description |
|---------|-------------|
| `cy.visitHomepage()` | Visits `/` and waits for `.hotel-room` to confirm React has hydrated |

### Global Configuration (`cypress.config.js`)

| Setting | Value | Purpose |
|---------|-------|---------|
| `baseUrl` | `https://automationintesting.online` | All `cy.visit()` paths resolve from here |
| `defaultCommandTimeout` | 10,000ms | Wait up to 10s for elements |
| `pageLoadTimeout` | 30,000ms | Wait up to 30s for page loads |
| `retries.runMode` | 2 | Auto-retry flaky tests in CI |
| `retries.openMode` | 0 | No retries in interactive mode |
| `video` | `true` | Records video during `cy:run` |
| `reporter` | `mochawesome` | JSON + HTML test reports |

### Environment Variables (`cypress.config.js` → `env`)

| Variable | Value | Used by |
|----------|-------|---------|
| `adminUsername` | `admin` | `loginPage.loginWithDefaultCredentials()` |
| `adminPassword` | `password` | `loginPage.loginWithDefaultCredentials()` |
| `adminUrl` | `/admin` | `cy.visit(Cypress.env('adminUrl'))` |

Override at runtime without touching config files:
```bash
CYPRESS_adminPassword=newpassword npm run cy:run
```

### Test Data (`cypress/fixtures/homeSanity.json`)

```json
{
  "booknow": "Book Now",
  "title":   "Restful-booker-platform demo"
}
```

All test data lives in fixtures — no hardcoded strings in spec files.

---

## 🐛 Bugs Found

| # | Area | Description | Severity |
|---|------|-------------|----------|
| 1 | Admin login — empty fields | Clicking Login with empty username/password shows no validation error message. The form silently stays on the login page with no feedback to the user. | Low |
| 2 | Contact form | No field-level validation feedback is shown until full form submission is attempted. Individual field errors are not displayed inline. | Low |

---

## 🔄 CI/CD Integration(Limited Knowledge on CI/CD integration but we can use the existing template, add all the commands in .yml file. 
Add a new stage on dev evironments. Automation test will trigger after successful dev environment completion)

## 📝 .gitignore

Add this to your `.gitignore` to keep the repository clean:

```gitignore
# Dependencies
node_modules/

# Cypress runtime outputs — generated on each run
cypress/screenshots/**
cypress/videos/**
cypress/reports/**
cypress/downloads/**

# OS
.DS_Store
Thumbs.db
```

## 🛠️ Tech Stack

| Tool | Version | Purpose |
|------|---------|---------|
| [Cypress](https://www.cypress.io/) | ^15.5.0 | E2E test framework |
| [mochawesome](https://github.com/adamgruber/mochawesome) | ^7.1.4 | Test reporter (JSON + HTML) |
| [mochawesome-merge](https://github.com/Antontelesh/mochawesome-merge) | ^4.4.1 | Merges per-spec report files |
| [mochawesome-report-generator](https://github.com/adamgruber/mochawesome-report-generator) | ^6.3.2 | Generates final HTML report |
| Node.js | 18+ | Runtime |
