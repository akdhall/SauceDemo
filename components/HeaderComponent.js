import { expect } from "@playwright/test";

export class HeaderComponent {
    constructor(page){
        this.page = page;
        this.cartBadgeCount = page.locator('[data-test="shopping-cart-badge"]');
    }

    async getCartBadge(){
       return(await this.cartBadgeCount.isVisible())
       ? Number(await this.cartBadgeCount.innerText())
       : 0;
}
}