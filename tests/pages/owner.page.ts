import { expect, Page } from '@playwright/test';

import { ButtonControl } from "../ui/controls/ButtonControl";
import { InputControl } from "../ui/controls/InputControl";
import { SelectControl } from "../ui/controls/SelectControl";
import { UiControl } from "../ui/controls/UiControl";

export type OwnerFormData = {
  name: string;
  birthdate: string;
  licenseYear: string;
  licenseCategory: string;
  email: string;
};

export class OwnerPage {
  constructor(private readonly page: Page) { }

  get ownersHeading() {
    return new UiControl(
      this.page.getByRole("heading", { name: "Owners" })
    );
  }

  get addOwnerButton() {
    return new ButtonControl(
      this.page.getByTestId("add-owner-button")
    );
  }

  get darkModeToggle() {
    return new ButtonControl(
      this.page.getByTestId("navbar-theme-toggle")
    );
  }

  get nameInput() {
    return new InputControl(
      this.page.getByTestId("name-input")
    );
  }

  get birthdateInput() {
    return new InputControl(
      this.page.getByTestId("birthdate-input")
    );
  }

  get licenseYearInput() {
    return new InputControl(
      this.page.getByTestId("year_of_driver_license-input")
    );
  }

  get licenseCategorySelect() {
    return new SelectControl(
      this.page.getByTestId("driver_license_cat-select")
    );
  }

  get emailInput() {
    return new InputControl(
      this.page.getByTestId("email-input")
    );
  }

  get createOwnerButton() {
    return new ButtonControl(
      this.page.getByTestId("create-owner-button")
    );
  }

  get licenseYearError() {
    return new UiControl(
      this.page.getByTestId("year_of_driver_license-input-error")
    );
  }

  get licenseCategoryFilter() {
    return new ButtonControl(
      this.page.getByTestId("owners-table-filter-driver_license_cat")
    );
  }

  get ownersTable() {
    return new UiControl(
      this.page.getByTestId("owners-table")
    );
  }

  get pageSizeSelect() {
    return new SelectControl(
      this.page.getByTestId("owners-table-page-size")
    );
  }

  get nextPageButton() {
    return new ButtonControl(
      this.page.getByTestId("owners-table-next-page")
    );
  }

  get previousPageButton() {
    return new ButtonControl(
      this.page.getByTestId("owners-table-previous-page")
    );
  }

  rowByEmail(email: string) {
    return this.page.locator("tbody tr").filter({
      has: this.page.getByText(email),
    });
  }

  async waitForTableUpdate() {
    await expect
      .poll(async () => {
        return await this.page.locator("tbody tr").count();
      })
      .toBeGreaterThan(0);
  }

  async open() {
    await this.page.goto('/');
  }

  async expectLoaded() {
    await expect(this.page).toHaveURL('/');
    await this.ownersHeading.expectVisible();
  }

  async toggleDarkMode() {
    await this.darkModeToggle.click();
  }

  async openAddOwnerForm() {
    await this.addOwnerButton.click();
  }

  async fillOwnerForm(owner: OwnerFormData) {
    await this.nameInput.fill(owner.name);
    await this.birthdateInput.fill(owner.birthdate);
    await this.licenseYearInput.fill(owner.licenseYear);
    await this.licenseCategorySelect.selectOption(owner.licenseCategory);
    await this.emailInput.fill(owner.email);
  }

  async submitOwner() {
    await this.createOwnerButton.click();
  }

  async addOwner(owner: OwnerFormData) {
    await this.openAddOwnerForm();
    await this.fillOwnerForm(owner);
    await this.submitOwner();
  }

  async expectLicenseYearError(
    message = "License year must be after birthdate."
  ) {
    await this.licenseYearError.expectVisible();
    await this.licenseYearError.expectText(message);
  }

  async expectNameTooLongError(
    message = "Name is too long."
  ) {
    await expect(this.nameInput.locator).toHaveText(message);
  }

  async filterByLicenseCategory(category: string) {
    await this.licenseCategoryFilter.click();

    await this.page
      .getByTestId(
        `owners-table-filter-driver_license_cat-multiselect-option-${category}`
      )
      .click();

    await this.waitForTableUpdate();
  }

  async filterByLicenseCategories(categories: string[]) {
    await this.licenseCategoryFilter.click();

    for (const category of categories) {
      await this.page
        .getByTestId(
          `owners-table-filter-driver_license_cat-multiselect-option-${category}`
        )
        .click();
    }

    await this.waitForTableUpdate();
  }

  async changePageSize(size: string) {
    await this.pageSizeSelect.selectOption(size);

    await this.waitForTableUpdate();
  }

  async nextPage() {
    await this.nextPageButton.click();

    await this.waitForTableUpdate();
  }

  async previousPage() {
    await this.previousPageButton.click();

    await this.waitForTableUpdate();
  }

  async openCarsFromRow(email: string) {
    await this.rowByEmail(email).click();
  }

  async openCarsFromAction(email: string) {
    const row = this.rowByEmail(email);

    await row
      .getByRole("button", { name: "View cars" })
      .click();
  }

  async backToOwners() {
    await this.page.goBack();

    await this.expectLoaded();
  }
}