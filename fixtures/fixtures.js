import { test as base, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage.js';
import { InventoryPage } from '../pages/inventoryPage.js';
import { CartPage } from '../pages/cartPage.js';
import { CheckoutPage } from '../pages/checkoutPage.js';
import { HeaderComponent } from '../components/HeaderComponent.js';

// Extend Playwright's test with custom fixtures
// Each fixture creates a page object and passes it to the test
export const test = base.extend({
  login: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  inventory: async ({ page }, use) => {
    await use(new InventoryPage(page));
  },

  cart: async ({ page }, use) => {
    await use(new CartPage(page));
  },

  checkout: async ({ page }, use) => {
    await use(new CheckoutPage(page));
  },

  header: async ({ page }, use) => {
    await use(new HeaderComponent(page));
  },
});

export { expect };
