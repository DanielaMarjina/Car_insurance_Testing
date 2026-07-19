import { test, expect } from "../../../fixtures/ui.fixture";
import { OwnerPage } from "../../../pages/owner.page";

test("@owners @smoke filter owners by one license category", async ({ page }) => {

    const ownerPage = new OwnerPage(page);

    await ownerPage.open();

    await ownerPage.filterByLicenseCategory("B");

    await expect(ownerPage.ownersTable).toBeVisible();

});

test("@owners @regression filter owners by multiple categories", async ({ page }) => {

    const ownerPage = new OwnerPage(page);

    await ownerPage.open();

    await ownerPage.filterByLicenseCategories(["B", "C"]);

    await expect(ownerPage.ownersTable).toBeVisible();

});

test("@owners filter owners with no category", async ({ page }) => {

    const ownerPage = new OwnerPage(page);

    await ownerPage.open();

    await ownerPage.filterByLicenseCategory("NONE");

    await expect(ownerPage.ownersTable).toBeVisible();

});

test("@owners change page size", async ({ page }) => {

    const ownerPage = new OwnerPage(page);

    await ownerPage.open();

    await ownerPage.changePageSize("25");

    await expect(ownerPage.pageSizeSelect).toHaveValue("25");

});

test("@owners pagination next and previous page", async ({ page }) => {

    const ownerPage = new OwnerPage(page);

    await ownerPage.open();

    await ownerPage.nextPage();

    await expect(page.getByText("Page 2")).toBeVisible();

    await ownerPage.previousPage();

    await expect(page.getByText("Page 1")).toBeVisible();

});

test("@owners open cars by clicking row", async ({ page }) => {

    const ownerPage = new OwnerPage(page);

    await ownerPage.open();

    await ownerPage.openCarsFromRow("john@example.com");

    await expect(page).toHaveURL(/cars/i);

});

test("@owners open cars from row action", async ({ page }) => {

    const ownerPage = new OwnerPage(page);

    await ownerPage.open();

    await ownerPage.openCarsFromAction("john@example.com");

    await expect(page).toHaveURL(/cars/i);

});

test("@owners return to owners page", async ({ page }) => {

    const ownerPage = new OwnerPage(page);

    await ownerPage.open();

    await ownerPage.openCarsFromRow("john@example.com");

    await ownerPage.backToOwners();

    await ownerPage.expectLoaded();

});

test("@owners accessibility", async ({ page }) => {

    const ownerPage = new OwnerPage(page);

    await ownerPage.open();

    await expect(ownerPage.addOwnerButton).toHaveAccessibleName("Add Owner");

    await expect(ownerPage.darkModeToggle).toHaveAccessibleName("Dark mode");

    await expect(ownerPage.ownersTable).toBeVisible();

    await expect(page.getByRole("columnheader", { name: "Name" })).toBeVisible();

    await expect(page.getByRole("columnheader", { name: "Email" })).toBeVisible();

});


