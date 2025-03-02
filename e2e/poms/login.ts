import { Page, expect } from "@playwright/test";
import { LOGIN_SELECTORS } from "../constants/selectors/login";
export default class LoginPage {
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  loginAndVerifyUser = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    await this.page.getByTestId(LOGIN_SELECTORS.emailField).fill(email);
    await this.page.getByTestId(LOGIN_SELECTORS.passwordField).fill(password);
    await this.page.getByTestId(LOGIN_SELECTORS.loginButton).click();
    await this.page.waitForTimeout(2000); // Wait for the page to load
    await expect(
      this.page.getByTestId(LOGIN_SELECTORS.profileButton)
    ).toBeVisible();
  };
}
