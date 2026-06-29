import { test, expect } from '@playwright/test';

test('add owner', async ({ page }) => {
  // We generate a unique value so the demo can be run multiple times without conflicts.
  const uniqueId = Date.now();

  // Start from the Owners page.
  await page.goto('/');

  // Move from the list page to the Add Owner form.
  await page.getByTestId('add-owner-button').click();

  // Fill the form like a real user would.
  await page.getByTestId('name-input').fill(`Demo Owner ${uniqueId}`);
  await page.getByTestId('birthdate-input').fill('1992-06-29');
  await page.getByTestId('year_of_driver_license-input').fill('2012');
  await page.getByTestId('driver_license_cat-select').selectOption('B');
  await page.getByTestId('email-input').fill(`demo.owner.${uniqueId}@example.com`);

  // Submit the form.
  await page.getByTestId('create-owner-button').click();
});
