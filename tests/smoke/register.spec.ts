import { RegisterUser } from '../../src/models/user.model';
import { LoginPage } from '../../src/pages/login.page';
import { RegisterPage } from '../../src/pages/register.page';
import { faker } from '@faker-js/faker';
import { expect, test } from '@playwright/test';

test.describe('Verify register', () => {
  test('register with correct data @GAD_R03_01 @GAD_R03_02 @GAD_R03_03', async ({
    page,
  }) => {
    //Arrange
    // const userFirstName = faker.person.firstName().replace(/[^A-Za-z]/g, '');
    // const userLastName = faker.person.lastName().replace(/[^A-Za-z]/g, '');
    // const userEmail = faker.internet.email({
    //   firstName: userFirstName,
    //   lastName: userLastName,
    // });
    // const userPassword = faker.internet.password();

    const registerUserData: RegisterUser = {
      userFirstName: faker.person.firstName().replace(/[^A-Za-z]/g, ''),
      userLastName: faker.person.lastName().replace(/[^A-Za-z]/g, ''),
      userEmail: '',
      userPassword: faker.internet.password(),
    };

    registerUserData.userEmail = faker.internet.email({
      firstName: registerUserData.userFirstName,
      lastName: registerUserData.userLastName,
    });

    // Act

    await page.goto('http://localhost:3000/register.html');

    const registerPage = new RegisterPage(page);

    await registerPage.goto();
    // await registerPage.register(
    //   registerUserData.userFirstName,
    //   registerUserData.userLastName,
    //   registerUserData.userEmail,
    //   registerUserData.userPassword,
    // );
    await registerPage.register(registerUserData);

    const expectedAlertPopupText = 'User created';

    // Assert
    await expect(registerPage.alertPopup).toHaveText(expectedAlertPopupText);
    const loginPage = new LoginPage(page);
    await loginPage.waitFotPageToLoadUrl();
    const title = await loginPage.title();

    expect.soft(title).toContain('Login');
  });
});
