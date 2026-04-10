import { expect } from "@playwright/test";  
import { sortOptions } from "../testData/loginTestData.js";

export class InventoryPage {
  constructor(page) {
    this.page = page;

    // list of product "cards"
    this.products = page.locator('[data-test="inventory-item"]');
    this.productNames = page.locator('[data-test="inventory-item-name"]');
    this.productPrice = page.locator('[data-test="inventory-item-price"]');
    this.sortDropdown = page.locator('[data-test="product-sort-container"]');

    // cart
    this.cartIcon = page.locator('[data-test="shopping-cart-link"]');
  
  }

  // Helper: returns the locator for one product card by name
  productByName(productName) {
    return this.products.filter({ hasText: productName }).first();
  }

  // Click "Add to cart" for a specified product name
  async addToCartByProductName(productName) {
    const product = this.productByName(productName);
    await product.getByRole('button', { name: /add to cart/i }).click();
  }

  async removeBtn(productName){
    const product = this.productByName(productName);
    await product.getByRole('button', {name: /remove/i}).click();
  }

async getButtonText(productName){
     const product = this.productByName(productName);
     return await product.getByRole('button').textContent();
  }

  // Click "Add to cart" for the first product
  async addFirstProductToCart() {
    const firstProduct = this.products.first();
    await firstProduct.getByRole('button', { name: /add to cart/i }).click();
  }

  async addAllProductsToCart() {
     const products = this.products;
  for (const product of await products.all()) {
    const addBtn = product.getByRole('button', {name: 'add to cart'});
    if (await addBtn.isVisible()) {
      await addBtn.click();
    }
    
  }
} 



//Method to select sort option
  async sortProducts(option){
    await expect(this.sortDropdown).toBeVisible();
    await this.sortDropdown.selectOption(option);
  }

  //Get product Names as array
  async getProductNames(){
    return await this.productNames.allTextContents();
  }
  // Get Product Price as numbers
async getProductPrice(){
  const prices = await this.productPrice.allTextContents();
  return prices.map(p => parseFloat(p.replace('$', '')));
}

async validateSorting(option){
    if (option === sortOptions.NAME_ASC || option === sortOptions.NAME_DESC){
      const names = await this.getProductNames();
      const expected = [...names].sort();
      if (option === sortOptions.NAME_DESC) expected.reverse();
      expect(names).toEqual(expected);
      } else {

          const prices = await this.getProductPrice();
          const expected = [...prices].sort((a,b) => a - b);
          if (option === sortOptions.PRICE_HIGH_LOW) expected.reverse();
          expect(prices).toEqual(expected);
      
      }
    }


  // Go to cart
  async goToCart() {
    await this.cartIcon.click();
  }
}