import { test as base } from "@playwright/test";
import LoginPage from "../poms/login";
import Task1Page from "../poms/task1";

interface ExtendedFixtures {
  loginPage: LoginPage;
  task1Page: Task1Page;
}

export const test = base.extend<ExtendedFixtures>({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },

  task1Page: async ({ page }, use) => {
    const task1Page = new Task1Page(page);
    await use(task1Page);
  },
});
