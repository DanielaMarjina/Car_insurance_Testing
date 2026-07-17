import { expect, Page } from '@playwright/test';

export type OwnerFormData = {
  name: string;
  birthdate: string;
  licenseYear: string;
  licenseCategory: string;
  email: string;
};

export class OwnerPage {
  constructor(private readonly page: Page) {}

  get ownersHeading() {
    return this.page.getByRole('heading', { name: 'Owners' });
  }

  get addOwnerButton() {
    return this.page.getByTestId('add-owner-button');
  }

  get darkModeToggle() {
    return this.page.getByTestId('navbar-theme-toggle');
  }

  get nameInput() {
    return this.page.getByTestId('name-input');
  }

  get birthdateInput() {
    return this.page.getByTestId('birthdate-input');
  }

  get licenseYearInput() {
    return this.page.getByTestId('year_of_driver_license-input');
  }

  get licenseCategorySelect() {
    return this.page.getByTestId('driver_license_cat-select');
  }

  get emailInput() {
    return this.page.getByTestId('email-input');
  }

  get createOwnerButton() {
    return this.page.getByTestId('create-owner-button');
  }

  get licenseYearError() {
    return this.page.getByTestId('year_of_driver_license-input-error');
  }

  async open() {
    await this.page.goto('/');
  }

  async expectLoaded() {
    await expect(this.page).toHaveURL('/');
    await expect(this.ownersHeading).toBeVisible();
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
    message = 'License year must be after birthdate.'
  ) {
    await expect(this.licenseYearError).toBeVisible();
    await expect(this.licenseYearError).toHaveText(message);
  }

  async expectNameTooLongError(
    message = 'Name is too long.'
  ) {
    await expect(this.nameInput).toBeVisible();
    await expect(this.nameInput).toHaveText(message);
  }
}