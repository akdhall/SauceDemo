import { test as setup } from '@playwright/test';
import { LoginPage } from '../pages/loginPage.js';
import { users } from '../testData/loginTestData.js';

setup('authenticate', async ({ page }) => {
  const login = new LoginPage(page);
  await login.navigate();
  await login.loginAs(users.validUser);
  await page.waitForURL(/inventory\.html/);

  // Save signed-in state so other tests can reuse it - new change to verify pull request
  await page.context().storageState({ path: 'auth.json' });
});



