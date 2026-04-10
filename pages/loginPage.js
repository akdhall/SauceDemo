export class LoginPage {
  constructor(page) {
    this.page = page;
    this.usernameInput = page.locator('[data-test="username"]');
    this.passwordInput = page.locator('[data-test="password"]');
    this.loginButton = page.locator('[data-test="login-button"]');
    this.errorMessage = page.locator('[data-test="error"]');
  }


  async navigate() {
    await this.page.goto('/');
  }

  async login(username, password) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async loginAs(user) {
    await this.login(user.username, user.password);
  }

  async isLoggedInSuccessfully() {
    try {
      await this.page.waitForURL(/inventory\.html/, { timeout: 5000 });
      return true;
    } catch {
      return false;
    }
  }

  async isErrorVisible() {
    return await this.errorMessage.isVisible();
  }

  async getErrorMessage() {
    if (await this.isErrorVisible()) {
      return (await this.errorMessage.textContent()).trim();
    }
    return '';
  }
}