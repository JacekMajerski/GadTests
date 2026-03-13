import { Page } from '@playwright/test';

export class BasePage {
  url = '/articles.html';

  constructor(protected page: Page) {}

  async goto(): Promise<void> {
    await this.page.goto(this.url);
  }

  async title(): Promise<string> {
    return this.page.title();
  }
}
