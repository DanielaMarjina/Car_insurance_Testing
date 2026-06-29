# Playwright Practica

Small Playwright demo project for beginners.

The goal of this repo is to help interns understand the basics of UI automation without too much framework complexity at the start.

## What Is In This Repo

- `tests/example.spec.ts`
  A very small smoke test. It only checks that the app opens and the Owners page is visible.
- `tests/actions.spec.ts`
  A simple happy-path flow. It shows Playwright actions like `goto`, `click`, `fill`, and `selectOption`.
- `tests/assertions.spec.ts`
  A negative test. It shows how to validate error messages with `expect`.
- `playwright.config.ts`
  Global Playwright configuration such as `baseURL`, browser projects, and reporting.

## Prerequisites

- `Node.js` installed
- `npm` installed
- internet access to the demo app configured in `playwright.config.ts`

## Installation

```bash
npm install
```

If browsers are missing on a new machine:

```bash
npx playwright install
```

## Quick Start

Run all demo tests in Chromium:

```bash
npm test
```

Run the tests with a visible browser:

```bash
npm run test:headed
```

Run one test file at a time:

```bash
npm run test:smoke
npm run test:actions
npm run test:assertions
```

Open the HTML report after a run:

```bash
npx playwright show-report
```

## Basic Playwright Flow

Most beginner tests follow this pattern:

1. Open the page.
2. Find an element.
3. Do an action.
4. Check the result.

Example:

```ts
test('simple example', async ({ page }) => {
  await page.goto('/');
  await page.getByTestId('add-owner-button').click();
  await page.getByTestId('name-input').fill('Demo Owner');
  await expect(page.getByRole('heading', { name: 'Add Owner' })).toBeVisible();
});
```

## Actions

Actions are things the user does in the browser.

Common actions:

- `page.goto('/')`
  Opens a page.
- `locator.click()`
  Clicks a button, link, row, or other element.
- `locator.fill('text')`
  Types into an input.
- `locator.selectOption('B')`
  Selects a value in a dropdown.

See [tests/actions.spec.ts](./tests/actions.spec.ts) for the beginner happy-path example.

## Assertions

Assertions are checks that prove the app behaved as expected.

Common assertions:

- `await expect(page).toHaveURL('/')`
- `await expect(locator).toBeVisible()`
- `await expect(locator).toHaveText('...')`

See [tests/assertions.spec.ts](./tests/assertions.spec.ts) for a simple validation example.

## `expect`

`expect` is how we verify results in Playwright.

Think of it like:

- "I expect this heading to be visible."
- "I expect this field to show an error."
- "I expect this page to have this URL."

Examples:

```ts
await expect(page).toHaveURL('/');
await expect(page.getByRole('heading', { name: 'Owners' })).toBeVisible();
await expect(page.getByTestId('year_of_driver_license-input-error')).toHaveText(
  'License year must be after birthdate.'
);
```

## Assertion Cheat Sheet

Use this section when you know what you want to verify, but you are not sure which assertion to use.

- `await expect(page).toHaveURL('/')`
  Checks that the browser is on the correct page.
- `await expect(page).toHaveTitle(/car-insurance-demo/i)`
  Checks the browser tab title.
- `await expect(locator).toBeVisible()`
  Checks that the element is shown on the page.
- `await expect(locator).toBeHidden()`
  Checks that the element is not visible.
- `await expect(locator).toBeEnabled()`
  Checks that the user can interact with the element.
- `await expect(locator).toBeDisabled()`
  Checks that the element cannot be used.
- `await expect(locator).toHaveText('text')`
  Checks the exact text of an element.
- `await expect(locator).toContainText('text')`
  Checks that the text includes a value.
- `await expect(locator).toHaveValue('value')`
  Checks the value inside an input.
- `await expect(locator).toHaveAttribute('data-testid', 'name-input')`
  Checks a specific HTML attribute.
- `await expect(locator).toBeChecked()`
  Checks that a checkbox or radio is selected.
- `await expect(locator).not.toBeVisible()`
  Checks the opposite condition.
- `await expect(locator).toHaveCount(10)`
  Checks how many matching elements exist.

Examples:

```ts
await expect(page).toHaveURL('/');
await expect(page).toHaveTitle(/car-insurance-demo/i);
await expect(page.getByRole('heading', { name: 'Owners' })).toBeVisible();
await expect(page.getByTestId('create-owner-button')).toBeEnabled();
await expect(page.getByTestId('year_of_driver_license-input-error')).toHaveText(
  'License year must be after birthdate.'
);
await expect(page.getByText('Active policy available')).toContainText('Active');
await expect(page.getByTestId('name-input')).toHaveValue('Demo Owner');
```

### Which Assertion Should I Pick?

1. Use `toHaveURL(...)` when navigation is the main result.
2. Use `toBeVisible()` when you only need to prove something is shown.
3. Use `toHaveText(...)` when the exact message matters.
4. Use `toContainText(...)` when only part of the text matters.
5. Use `toBeEnabled()` or `toBeDisabled()` for buttons and fields.
6. Use `toHaveValue(...)` for inputs.
7. Use `toHaveCount(...)` when checking lists, rows, or cards.

## Locators

Locators are how Playwright finds elements.

In this repo we mostly use:

- `getByTestId(...)`
- `getByRole(...)`

Why these are good for beginners:

- they are readable
- they are stable
- they are easier to maintain than long CSS selectors

Examples:

```ts
page.getByTestId('add-owner-button')
page.getByRole('heading', { name: 'Owners' })
```

## Locator Cheat Sheet

Use this section when you know what you want to find, but you are not sure which locator to pick.

- `page.getByTestId('add-owner-button')`
  Best for automation when the app already has `data-testid` values.
- `page.getByRole('button', { name: 'Create' })`
  Best for buttons, links, headings, checkboxes, and other accessible elements.
- `page.getByLabel('Email')`
  Good when an input is connected to a visible label.
- `page.getByPlaceholder('e.g. user@example.com')`
  Useful when the placeholder text is stable.
- `page.getByText('Owners')`
  Useful for simple visible text, but usually less stable than `getByRole`.
- `page.locator('[data-testid=\"name-input\"]')`
  Generic fallback when you want CSS-style selection.
- `page.locator('table tbody tr').nth(0)`
  Useful when you need to target an item by position.
- `page.locator('.class-name')`
  Works, but usually not ideal for beginners because classes change often.
- `page.locator('#elementId')`
  Good if the app has a real stable HTML `id`.

Examples:

```ts
page.getByTestId('email-input')
page.getByRole('button', { name: 'Add Owner' })
page.getByRole('heading', { name: 'Owners' })
page.getByLabel('Birthdate')
page.getByPlaceholder('YYYY-MM-DD')
page.getByText('Active policy available')
page.locator('[data-testid="create-owner-button"]')
page.locator('table tbody tr').nth(0)
```

### Which Locator Should I Pick?

1. Use `getByTestId(...)` if the app has a good test id.
2. Use `getByRole(...)` if the element has a clear accessible role and name.
3. Use `getByLabel(...)` for form fields with visible labels.
4. Use `getByPlaceholder(...)` only if the placeholder is stable.
5. Use `locator(...)` only when the better options above are not available.

### Common Roles

- `button`
  For buttons like `Create`, `Cancel`, `Add Owner`.
- `link`
  For navigation links like `Owners`, `Cars`, `About`.
- `heading`
  For page titles like `Owners`, `Add Owner`, `Cars`.
- `textbox`
  For text inputs.
- `combobox`
  For dropdowns.
- `checkbox`
  For checkbox filters.
- `radio`
  For radio filters.
- `dialog`
  For modals like `History` or `Add Claim`.

Examples:

```ts
page.getByRole('button', { name: 'Create' })
page.getByRole('link', { name: 'Cars' })
page.getByRole('heading', { name: 'About Our Car Policy Services' })
page.getByRole('dialog', { name: 'History' })
```

## Parent And Child Locators

Sometimes you do not want to find an element from the whole page.

You want:

- find a parent first
- then search only inside that parent

This is usually easier and safer.

### Parent To Child

Example: find a row first, then find the button inside that row.

```ts
const firstRow = page.locator('table tbody tr').nth(0);
const viewButton = firstRow.getByRole('button', { name: 'View' });

await viewButton.click();
```

Example: find a dialog first, then find inputs inside it.

```ts
const addClaimDialog = page.getByRole('dialog', { name: 'Add Claim' });

await addClaimDialog.getByLabel('Description').fill('Minor front bumper damage');
await addClaimDialog.getByRole('button', { name: 'Save' }).click();
```

Example: find a card, section, or form first, then go deeper.

```ts
const policySection = page.getByRole('region', { name: 'Policy' });
await expect(policySection.getByText('Active policy available')).toBeVisible();
```

### Child To Parent

Sometimes you can find the child more easily than the parent.

Example:
- you know a row contains the text `John Doe`
- then you want the whole row

Best beginner option:

```ts
const row = page.locator('tr').filter({ hasText: 'John Doe' });
await row.getByRole('button', { name: 'View cars' }).click();
```

Another good option: find a parent that `has` a child.

```ts
const row = page.locator('tr').filter({
  has: page.getByText('John Doe')
});
```

Fallback option if needed:

```ts
const nameCell = page.getByText('John Doe');
const row = nameCell.locator('xpath=..');
```

Important:

- prefer `filter({ hasText: ... })` or `filter({ has: ... })`
- use `xpath=..` only when there is no cleaner option

## Basic CSS Selectors

Sometimes `getByTestId` or `getByRole` is not enough.

Then you can use CSS selectors with `locator(...)`.

Common CSS examples:

- `page.locator('button')`
  Find all buttons.
- `page.locator('input')`
  Find all inputs.
- `page.locator('#email')`
  Find element by HTML `id="email"`.
- `page.locator('.error')`
  Find element by class.
- `page.locator('[data-testid="name-input"]')`
  Find element by attribute.
- `page.locator('table tbody tr')`
  Find all table rows inside the table body.
- `page.locator('tr >> text=John Doe')`
  Find a row that contains text.

Examples:

```ts
page.locator('[data-testid="create-owner-button"]')
page.locator('table tbody tr')
page.locator('.error-message')
page.locator('#owner-form')
```

Useful reminder:

- `#something` means `id`
- `.something` means `class`
- `[something="value"]` means `attribute`

## Basic Regex

Regex is useful when the text is not exactly the same every time.

You will often see it with:

- `toHaveTitle(...)`
- `getByText(...)`
- `getByRole(..., { name: /.../ })`
- `toHaveURL(...)`

Examples:

```ts
await expect(page).toHaveTitle(/car-insurance-demo/i);
await expect(page).toHaveURL(/\/cars\/.+\/view$/);

page.getByRole('heading', { name: /owners/i });
page.getByText(/active policy/i);
```

Basic regex patterns:

- `/Owners/`
  Match exact word with same case.
- `/owners/i`
  Match word ignoring upper/lower case.
- `/^Owners$/`
  Match only exactly `Owners`.
- `/Owner/`
  Match text containing `Owner`.
- `/\d+/`
  Match one or more digits.
- `/demo\.owner\.\d+@example\.com/`
  Match a generated email pattern.
- `/\/cars\/.+\/view$/`
  Match URLs ending in `/cars/{something}/view`.

Simple examples:

```ts
await expect(page.getByRole('heading', { name: /^Owners$/ })).toBeVisible();
await expect(page.getByText(/\d+/)).toBeVisible();
await expect(page).toHaveURL(/\/owners\/add$/);
```

Tip:

- use plain text first
- use regex only when the value changes or when case should not matter

## Suggested Learning Order

1. Start with `example.spec.ts`
2. Continue with `actions.spec.ts`
3. Finish with `assertions.spec.ts`

This order helps because:

- first they see a page load
- then they see browser actions
- then they see validation and checking

## POM

POM means `Page Object Model`.

It is a design pattern where page actions and locators are moved into classes so tests stay shorter and easier to read.

Beginner idea:

- test file says what the user is doing
- page object says how the page is automated

Very small example:

```ts
export class OwnersPage {
  constructor(private page: Page) {}

  async open() {
    await this.page.goto('/');
  }

  async clickAddOwner() {
    await this.page.getByTestId('add-owner-button').click();
  }
}
```

Then a test could look like:

```ts
test('open add owner form', async ({ page }) => {
  const ownersPage = new OwnersPage(page);

  await ownersPage.open();
  await ownersPage.clickAddOwner();
});
```


## If You Get Stuck

Check these first:

- Is the app URL correct in `playwright.config.ts`?
- Did you run `npm install`?
- Did you run `npx playwright install` on a fresh machine?
- Are you using the correct `data-testid`?
- Is the element visible before you interact with it?
- Did the app show a validation error instead of saving?

Helpful debug commands:

```bash
npm run test:headed
npx playwright test --project=chromium --debug
```

## Good Beginner Habits

- Keep one test focused on one behavior.
- Prefer readable test names.
- Use stable locators like `getByTestId` and `getByRole`.
- Add assertions after important actions.
- Avoid making one test too long.
- Use comments only when they help explain intent.
