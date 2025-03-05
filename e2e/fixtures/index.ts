import { test as base } from "@playwright/test";
import LoginPage from "../poms/login";
import FormCreationValidationAnalytics from "../poms/formCreationValidationAnalytics.spec.ts";
import Task2Page from "../poms/task2";
import Task3Page from "../poms/task3";

interface ExtendedFixtures {
  loginPage: LoginPage;
  formCreationValidationAnalytics: FormCreationValidationAnalytics;
  task2Page: Task2Page;
  task3Page: Task3Page;
}

export const test = base.extend<ExtendedFixtures>({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },

  formCreationValidationAnalytics: async ({ page }, use) => {
    const task1Page = new FormCreationValidationAnalytics(page);
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
