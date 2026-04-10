import { expect } from "@playwright/test";

export class CartPage {
    constructor(page) {
        this.page = page;
        this.cartItems = page.locator('[data-test="inventory-item-name"]');
        this.checkoutButton = page.locator('[data-test="checkout"]');
        
    }

 async expectItemInCart(productName) {
    await this.page
      .locator('[data-test="inventory-item-name"]', { hasText: productName })
      .first()
      .waitFor();
  }

  async getCartItemNames(){
    return await this.cartItems.evaluateAll(items =>
    items.map(item => item.textContent?.trim())
  );
  }

  async expectedAllItems(expectedProducts = []){
    const cartNames = await this.getCartItemNames();
    for(const product of expectedProducts) {
      expect(cartNames).toContain(product);
    }
        
  }

  async removeProduct(productName){
    const cartItem = this.page.locator('.cart_item', {hasText: productName});
    const removeBtn = cartItem.getByRole('button', {name: /remove/i});
    await removeBtn.click();
  }

  
  async goToCheckOut(){
    await this.checkoutButton.click();
  }
}