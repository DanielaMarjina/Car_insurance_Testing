import { test, expect } from "@playwright/test";
import { OwnerPage } from "./pages/owner.page";


  test('license year before birthdate', async ({ page }) => {
  const ownerPage = new OwnerPage(page);
  const uniqueId = Date.now();

  await ownerPage.open();
  await ownerPage.openAddOwnerForm();
  await ownerPage.fillOwnerForm({
    name: 'Demo Owner',
    birthdate: '1992-06-29',
    licenseYear: '1990',
    licenseCategory: 'B',
    email: `demo.owner.${uniqueId}@example.com`,
  });
  await ownerPage.submitOwner();
  await ownerPage.expectLicenseYearError();
});


test("owners name should be a reasonable length", async ({ page }) => {
  const uniqueId = Date.now();

  await page.goto("/");
  await page.getByTestId("add-owner-button").click();

  const longName = "A".repeat(101);

  await page.getByTestId("name-input").fill(longName);
  await page.getByTestId("birthdate-input").fill("1992-06-29");
  await page.getByTestId("year_of_driver_license-input").fill("2012");
  await page.getByTestId("driver_license_cat-select").selectOption("B");
  await page.getByTestId("email-input").fill(`test.${uniqueId}@example.com`);

  await page.getByTestId("create-owner-button").click();

  await page.getByTestId("owners-search-input").fill(longName);

  await expect(page.getByText(longName)).not.toBeVisible();
});

test("driver license year must be at least 18 years after birth year", async ({
  page,
}) => {
  const uniqueId = Date.now();

  await page.goto("/");
  await page.getByTestId("add-owner-button").click();

  await page.getByTestId("name-input").fill("Demo Owner");

  // Birth year = 2003
  await page.getByTestId("birthdate-input").fill("2003-06-29");

  // Only 2 years later -> invalid
  await page.getByTestId("year_of_driver_license-input").fill("2005");

  await page.getByTestId("driver_license_cat-select").selectOption("B");

  await page.getByTestId("email-input").fill(`demo.${uniqueId}@example.com`);

  await page.getByTestId("create-owner-button").click();

  // Expected validation
  await page
    .getByTestId("owners-search-input")
    .fill(`demo.${uniqueId}@example.com`);

  await expect(
    page.getByText(`demo.${uniqueId}@example.com`),
  ).not.toBeVisible();
});

test("should not allow creating a car with an invalid VIN", async ({
  page,
}) => {
  const uniqueId = Date.now();
  const vin= "sadffdsfdfds";

  // Open Cars page for an owner
  await page.goto("/owners/11111111-1111-1111-1111-111111111111/cars");

  // Open Add Car form
  await page.getByTestId("add-owner-car-button").click();

  // Fill the form
  await page.getByTestId("vin-input").fill(vin);
  await page.getByTestId("make-input").fill("Toyota");
  await page.getByTestId("model-input").fill("Corolla");
  await page.getByTestId("year_of_manufacture-input").fill("2022");
  await page.getByTestId("power-input").fill(`100`);
  await page.getByTestId("cc-input").fill(`50`);
  await page.getByTestId("category-select").selectOption("EURO3");
  await page.getByTestId("create-car-button").click();
 

  await expect(page.locator("tr").last()).toBeVisible;
   await expect(page.locator("tr").last().locator("td").first()).not.toContainText(vin);
//  await expect(page.getByTestId("owner-cars-table")).not.toContainText("12345");
});
