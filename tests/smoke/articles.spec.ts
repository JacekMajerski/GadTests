import { LoginUser } from '../../src/models/user.model';
import { ArticlesPage } from '../../src/pages/articles.page';
import { LoginPage } from '../../src/pages/login.page';
import { testUser1 } from '../../src/test-data/user-data';
import { AddArticlesView } from '../../src/views/add-article.view';
import { expect, test } from '@playwright/test';

test.describe('Verify articles', () => {
  test('create new article @GAD_R04_01', async ({ page }) => {
    //Arrange
    const loginPage = new LoginPage(page);

    const loginUserData: LoginUser = {
      userEmail: testUser1.userEmail,
      userPassword: testUser1.userPassword,
    };
    await loginPage.goto();
    await loginPage.loginNew(loginUserData);
    const articlesPage = new ArticlesPage(page);
    await articlesPage.goto();

    // Act
    await articlesPage.articleButtonLogged.click();

    const addArticlesView = new AddArticlesView(page);
    await expect.soft(addArticlesView.header).toBeVisible();

    // Assert
    await expect.soft(articlesPage.articleTitle).toBeVisible();
  });
});
