import { expect, Page } from "@playwright/test";

export type CarFormData = {
  vin: string;
  make: string;
  model: string;
  year: string;
  power: string;
  cc: string;
  category: string;
};

export class OwnerCarsPage {
  constructor(private readonly page: Page) { }


  get heading() {
    return this.page.getByRole("heading");
  }


  get addCarButton() {
    return this.page.getByTestId("add-owner-car-button");
  }

  get createCarButton() {
    return this.page.getByTestId("create-car-button");
  }

  get backButton() {
    return this.page.getByRole("button", { name: "Back" });
  }


  get vinInput() {
    return this.page.getByTestId("vin-input");
  }

  get makeInput() {
    return this.page.getByTestId("make-input");
  }

  get modelInput() {
    return this.page.getByTestId("model-input");
  }

  get yearInput() {
    return this.page.getByTestId("year_of_manufacture-input");
  }

  get powerInput() {
    return this.page.getByTestId("power-input");
  }

  get ccInput() {
    return this.page.getByTestId("cc-input");
  }

  get categorySelect() {
    return this.page.getByTestId("category-select");
  }


  get carsTable() {
    return this.page.getByTestId("owner-cars-table");
  }


  async open(ownerId: string) {
    await this.page.goto(`/owners/${ownerId}/cars`);
    await this.expectLoaded();
  }

  async expectLoaded() {
    await expect(this.heading).toContainText("Cars");
  }


  async openAddCarForm() {
    await this.addCarButton.click();
  }

  async fillCarForm(car: CarFormData) {
    await this.vinInput.fill(car.vin);
    await this.makeInput.fill(car.make);
    await this.modelInput.fill(car.model);
    await this.yearInput.fill(car.year);
    await this.powerInput.fill(car.power);
    await this.ccInput.fill(car.cc);
    await this.categorySelect.selectOption(car.category);
  }

  async submitCar() {
    await this.createCarButton.click();
  }

  async addCar(car: CarFormData) {
    await this.openAddCarForm();
    await this.fillCarForm(car);
    await this.submitCar();
  }


  async expectCarExists(vin: string) {
    await expect(this.carsTable).toContainText(vin);
  }

  async expectCarDoesNotExist(vin: string) {
    await expect(this.carsTable).not.toContainText(vin);
  }


  async openCar(vin: string) {
    await this.page
      .locator("tr")
      .filter({ hasText: vin })
      .getByRole("button", { name: "View more" })
      .click();
  }
}