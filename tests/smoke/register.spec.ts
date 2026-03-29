import { randomUserData } from '../../src/factories/user.factory';
import { LoginPage } from '../../src/pages/login.page';
import { RegisterPage } from '../../src/pages/register.page';
import { expect, test } from '@playwright/test';

test.describe('Verify register', () => {
  test('register with correct data @GAD_R03_01 @GAD_R03_02 @GAD_R03_03', async ({
    page,
  }) => {
    //Arrange

    const registerUserData = randomUserData();

    // Act

    await page.goto('http://localhost:3000/register.html');

    const registerPage = new RegisterPage(page);

    await registerPage.goto();

    await registerPage.register(registerUserData);

    const expectedAlertPopupText = 'User created';

    // Assert
    await expect(registerPage.alertPopup).toHaveText(expectedAlertPopupText);
    const loginPage = new LoginPage(page);
    await loginPage.waitFotPageToLoadUrl();
    const title = await loginPage.title();

    expect.soft(title).toContain('Login');
  });

  test('not register with incorrect data - non provided email @GAD_R03_04', async ({
    page,
  }) => {
    const registerUserData = randomUserData();
    registerUserData.userEmail = '!@#';

    // Act

    await page.goto('http://localhost:3000/register.html');

    const registerPage = new RegisterPage(page);
    const expectedErrorText = 'Please provide a valid email address';

    await registerPage.goto();

    await registerPage.register(registerUserData);

    // Assert
    await expect(registerPage.emailErrorText).toHaveText(expectedErrorText);
  });
});
