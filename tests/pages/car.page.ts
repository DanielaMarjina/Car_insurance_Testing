import { expect, type Page } from '@playwright/test';

export class CarsPage {
  [x: string]: any;
  constructor(private readonly page: Page) {}

  get heading() {
    return this.page.getByRole('heading', { name: 'Cars' });
  }

  get table() {
    return this.page.getByTestId('cars-table');
  }

  get pageSizeSelect() {
    return this.page.getByTestId('cars-table-page-size');
  }

  get nextPageButton() {
    return this.buttonByTestId('cars-table-next-page');
  }

  get pagination() {
    return this.elementByTestId('cars-table-pagination');
  }

  get rows() {
    return this.page.locator('[data-testid^="cars-table-row-"]');
  }

  async goto() {
    await this.page.goto('/cars');
    await this.expectLoaded();
  }

 async expectLoaded() {
  await expect(this.heading).toBeVisible();
  await this.page.waitForLoadState('networkidle');
}

  rowByVin(vin: string) {
    return this.rows.filter({ hasText: vin }).first();
  }

  async rowsData() {
    return this.rows.evaluateAll((elements) =>
      elements.map((row) =>
        Array.from(row.querySelectorAll('td')).map((cell) => cell.textContent?.trim() ?? ''),
      ),
    );
  }

  async openMakeFilter() {
    await this.buttonByTestId('cars-table-filter-make').click();
  }

  async openModelFilter() {
    await this.buttonByTestId('cars-table-filter-model').click();
  }

  async openCategoryFilter() {
    await this.buttonByTestId('cars-table-filter-category').click();
  }

  makeFilterOption(value: string) {
    const suffix = value === 'All' ? 'empty' : value;
    return this.checkboxByTestId(`cars-table-filter-make-radio-group-input-${suffix}`);
  }

  modelFilterOption(value: string) {
    const suffix = value === 'All' ? 'empty' : value;
    return this.checkboxByTestId(`cars-table-filter-model-radio-group-input-${suffix}`);
  }

  categoryFilterOption(value: string) {
    const suffix = value === 'All' ? 'empty' : value;
    return this.checkboxByTestId(`cars-table-filter-category-radio-group-input-${suffix}`);
  }
}