import { randomNewArticle } from '../src/factories/article.factory';
import { ArticlePage } from '../src/pages/article.page';
import { ArticlesPage } from '../src/pages/articles.page';
import { LoginPage } from '../src/pages/login.page';
import { testUser1 } from '../src/test-data/user.data';
import { AddArticleView } from '../src/views/add-article.view';
import { expect, test } from '@playwright/test';

test.describe('Verify articles', () => {
  let addArticleView: AddArticleView;
  let articlesPage: ArticlesPage;
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    addArticleView = new AddArticleView(page);
    articlesPage = new ArticlesPage(page);

    await loginPage.goto();
  });

  test('create new article @GAD-R04-01', async ({ page }) => {
    // Arrange

    const articlePage = new ArticlePage(page);

    await loginPage.login(testUser1);

    await articlesPage.goto();

    // Act
    await articlesPage.addArticleButtonLogged.click();

    await expect.soft(addArticleView.header).toBeVisible();

    const articleData = randomNewArticle();

    await addArticleView.createArticle(articleData);

    // Assert
    await expect.soft(articlePage.articleTitle).toHaveText(articleData.title);
    await expect
      .soft(articlePage.articleBody)
      .toHaveText(articleData.body, { useInnerText: true });
  });

  test('not create new article without title @GAD-R04-01', async () => {
    // Arrange
    const alertText = 'Article was not created';

    await loginPage.login(testUser1);
    await articlesPage.goto();

    // Act
    await articlesPage.addArticleButtonLogged.click();

    await expect.soft(addArticleView.header).toBeVisible();

    const articleData = randomNewArticle();
    articleData.title = '';

    await addArticleView.createArticle(articleData);

    // Assert
    await expect(addArticleView.alertPopup).toHaveText(alertText);
  });

  test('not create new article without body @GAD-R04-01', async () => {
    // Arrange
    const alertText = 'Article was not created';

    await loginPage.login(testUser1);

    await articlesPage.goto();

    // Act
    await articlesPage.addArticleButtonLogged.click();
    await expect.soft(addArticleView.header).toBeVisible();

    const articleData = randomNewArticle();
    articleData.body = '';

    await addArticleView.createArticle(articleData);

    // Assert
    await expect(addArticleView.alertPopup).toHaveText(alertText);
  });

  test('reject creating new article with title exceeding 128 signs @GAD-R04-02', async () => {
    // Arrange
    const alertText = 'Article was not created';

    await loginPage.login(testUser1);
    await articlesPage.goto();

    // Act
    await articlesPage.addArticleButtonLogged.click();

    await expect.soft(addArticleView.header).toBeVisible();

    const articleData = randomNewArticle(129);
    articleData.title = '';

    await addArticleView.createArticle(articleData);

    // Assert
    await expect(addArticleView.alertPopup).toHaveText(alertText);
  });

  test('create new article with 128 signs', async ({ page }) => {
    // Arrange

    const articlePage = new ArticlePage(page);

    await loginPage.login(testUser1);

    await articlesPage.goto();

    // Act
    await articlesPage.addArticleButtonLogged.click();

    await expect.soft(addArticleView.header).toBeVisible();

    const articleData = randomNewArticle(128);

    await addArticleView.createArticle(articleData);

    // Assert
    await expect.soft(articlePage.articleTitle).toHaveText(articleData.title);
    await expect
      .soft(articlePage.articleBody)
      .toHaveText(articleData.body, { useInnerText: true });
  });
});
