import { test, expect } from '../fixtures/fixtures.js';
import { expectedProducts, sortOptions, ProductsToRemove } from '../testData/loginTestData.js';

// storageState from auth.setup.js already has us logged in
// just navigate to the inventory page
    test.beforeEach(async({page}) =>{
    await page.goto('/inventory.html');
    });
    
    //------------------Inventory Page Tests----------//

    test.describe('Inventory Page Tests', () => {


test('1 ) Add first product to cart', async ({page, inventory, cart, checkout, header}) => {
    await inventory.addFirstProductToCart();
    expect(await header.getCartBadge()).toBe(1);
    await inventory.goToCart();
    await expect(page).toHaveURL(/cart\.html/);
    await cart.expectItemInCart('Sauce Labs Backpack');
    await cart.goToCheckOut();
    await checkout.fillYourInfo('Joe', 'dave' , '1234');
    await checkout.finishPurchase();
    await expect(page).toHaveURL(/checkout-complete\.html/);
});

test('2) Add a specific product by name --> cart Badge becomes 1', async({page, inventory, cart, checkout, header}) =>{
    await inventory.addToCartByProductName('Sauce Labs Backpack');
    expect(await header.getCartBadge()).toBe(1);
    await inventory.goToCart();
    await expect(page).toHaveURL(/cart\.html/);
    await cart.expectItemInCart('Sauce Labs Backpack');
    await cart.goToCheckOut();
    await checkout.purchaseProduct('Joe', 'Dave' , '1234');
    await expect(checkout.completeHeader).toHaveText(/thank you for your order/i);
    });


test('3) Verify button changes to Remove after adding product', async({inventory}) => {
    await inventory.addFirstProductToCart();
    expect(await inventory.getButtonText('Sauce Labs Backpack')).toBe('Remove');
});

test('4) Add all products to the cart', async({page, inventory, cart, checkout}) => {
    //Add all products to cart
    await inventory.addAllProductsToCart();
    await inventory.goToCart();
    await cart.expectedAllItems(expectedProducts);
    await cart.goToCheckOut();
    await checkout.fillYourInfo('Joe', 'dave' , '1234');
    await checkout.finishPurchase();
    await expect(page).toHaveURL(/checkout-complete\.html/);
});

test('5) Remove a Product from the Cart', async({page, inventory, cart, header}) =>{
    await inventory.addToCartByProductName('Sauce Labs Bike Light');
    expect(await header.getCartBadge()).toBe(1);
    await inventory.goToCart(); 
    await cart.expectItemInCart('Sauce Labs Bike Light');
    await cart.removeProduct('Sauce Labs Bike Light');
    expect(await header.getCartBadge()).toBe(0);
    
})

test('Add Multiple Products and Remove a few directly from Inventory', async({inventory, header}) => {
 const totalProducts = await inventory.products.count();
 await inventory.addAllProductsToCart();
 expect(await header.getCartBadge()).toBe(totalProducts);

 for(const product of ProductsToRemove){
    await inventory.removeBtn(product)
 }

 const expectedCount = totalProducts - ProductsToRemove.length;
 expect(await header.getCartBadge()).toBe(expectedCount);
});
});

//------------Sorting Tests----------------------//
test.describe('Sorting Test', () => {
//Only Login & Inventory page, no cart/checkout needed
for( const optionKey of Object.keys(sortOptions)){
  const option = sortOptions[optionKey];

 test(`Sort products by ${optionKey}`, async ({inventory}) => {
    await inventory.sortProducts(option);
    await inventory.products.first().waitFor({ state: 'visible'});
    await inventory.validateSorting(option);
});
}
});
