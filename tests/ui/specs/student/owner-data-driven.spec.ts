import { test, expect } from "../../../fixtures/ui.fixture";
import { OwnerPage } from "../../../pages/owner.page";
import { ownerLicenseCategories } from "../../../shared/data/owner.data";

for (const owner of ownerLicenseCategories) {
  test(`filter owners by ${owner.driver_license_cat}`, async ({ page }) => {
    const ownerPage = new OwnerPage(page);

    await ownerPage.open();

    await ownerPage.filterByLicenseCategory(owner.driver_license_cat);

    await ownerPage.ownersTable.expectVisible();
  });
}