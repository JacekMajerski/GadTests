import { MainMenuComponent } from '../components/main-menu.component';
import { LoginUser } from '../models/user.model';
import { BasePage } from './base.page';
import { Page } from '@playwright/test';

export class LoginPage extends BasePage {
  url = '/login/';
  mainMenu = new MainMenuComponent(this.page);

  constructor(page: Page) {
    super(page);
  }

  async login(email: string, password: string): Promise<void> {
    await this.page.getByPlaceholder('Enter User Email').fill(email);
    await this.page.getByPlaceholder('Enter Password').fill(password);
    await this.page.getByRole('button', { name: 'LogIn' }).click();
  }
  async loginNew(loginUserData: LoginUser): Promise<void> {
    await this.page
      .getByPlaceholder('Enter User Email')
      .fill(loginUserData.userEmail);
    await this.page
      .getByPlaceholder('Enter Password')
      .fill(loginUserData.userPassword);
    await this.page.getByRole('button', { name: 'LogIn' }).click();
  }
  async waitFotPageToLoadUrl(): Promise<void> {
    await this.page.waitForURL(this.url);
  }
}
