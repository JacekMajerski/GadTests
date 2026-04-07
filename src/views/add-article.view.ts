import { AddArticleModel } from '../models/article.model';
import { Locator, Page } from '@playwright/test';

export class AddArticleView {
  header: Locator;
  titleInput: Locator;
  bodyInput: Locator;
  saveButton: Locator;
  alertPopup: Locator;

  constructor(private page: Page) {
    this.header = this.page.getByRole('heading', {
      name: 'Add New Entry',
    });
    this.titleInput = this.page.getByTestId('title-input');
    this.bodyInput = this.page.getByTestId('body-text');
    this.saveButton = this.page.getByTestId('save');
    this.alertPopup = this.page.getByTestId('alert-popup');
  }

  async createArticle(ArticleData: AddArticleModel): Promise<void> {
    await this.titleInput.fill(ArticleData.title);
    await this.bodyInput.fill(ArticleData.body);
    await this.saveButton.click();
  }
}
