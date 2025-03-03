import { test as base } from "@playwright/test";
import LoginPage from "../poms/login";
import Task1Page from "../poms/task1";
import Task2Page from "../poms/task2";
import Task3Page from "../poms/task3";

interface ExtendedFixtures {
  loginPage: LoginPage;
  task1Page: Task1Page;
  task2Page: Task2Page;
  task3Page: Task3Page;
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

  task2Page: async ({ page, browser }, use) => {
    const task2Page = new Task2Page(page, browser);
    await use(task2Page);
  },

  task3Page: async ({ page, browser }, use) => {
    const formPage = new Task3Page(page);
    await use(formPage);
  },
});
