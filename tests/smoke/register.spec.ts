import { LoginPage } from '../../src/pages/login.page';
import { RegisterPage } from '../../src/pages/register.page';
import { expect, test } from '@playwright/test';

test.describe('Verify register', () => {
  test('register with correct data @GAD_R03_01 @GAD_R03_02 @GAD_R03_03', async ({
    page,
  }) => {
    //Arrange
    const userFirstName = 'Janina';
    const userLastName = 'Nowak';
    const userEmail = `jntest${Date.now()}@test.test1`;
    const userPassword = 'testtest234';

    await page.goto('http://localhost:3000/register.html');

    const registerPage = new RegisterPage(page);

    await registerPage.goto();
    await registerPage.register(
      userFirstName,
      userLastName,
      userEmail,
      userPassword,
    );

    const expectedAlertPopupText = 'User created';

    // Assert
    await expect(registerPage.alertPopup).toHaveText(expectedAlertPopupText);
    const loginPage = new LoginPage(page);
    await loginPage.waitFotPageToLoadUrl();
    const title = await loginPage.title();

    expect.soft(title).toContain('Login');
  });
});
