import { MainMenuComponent } from '../components/main-menu.component';
import { BasePage } from '../pages/base.page';
import { Page } from '@playwright/test';

export class ArticlesPage extends BasePage {
  url = '/articles.html';
  mainMenu = new MainMenuComponent(this.page);
  articleButtonLogged = this.page.locator('#add-new');
  articleTitle = this.page.getByTestId('title-input');
  articleBody = this.page.getByTestId('body-text');

  constructor(page: Page) {
    super(page);
  }
}
