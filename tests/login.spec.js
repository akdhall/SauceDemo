import { test, expect } from '../fixtures/fixtures.js';
import { users, negativeScenarios, errorMessages } from '../testData/loginTestData.js';

test.describe('Login Module', () => {

  test.beforeEach(async ({ login }) => {
    await login.navigate();
  });

  // ✅ Positive test
  test('Verify Successful Login @smoke', async ({ login }) => {
    await login.loginAs(users.validUser);
    expect(await login.isLoggedInSuccessfully()).toBe(true);
  });

  // ✅ Negative tests (data-driven)
  negativeScenarios.forEach((scenario) => {
    test(`Negative Test - ${scenario.name}`, async ({ login }) => {
      await login.loginAs(scenario.user);
      const actualError = await login.getErrorMessage();

      //Map key to actual message
      expect(actualError).toBe(errorMessages[scenario.expectedErrorKey]);
    });
  });

});