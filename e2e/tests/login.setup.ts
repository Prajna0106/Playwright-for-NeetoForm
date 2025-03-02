import { test } from "../fixtures";
import { STORAGE_STATE } from "../../playwright.config";

test.describe("Login page", () => {
  test("should login to home page with correct credentials.", async ({
    page,
    loginPage,
  }) => {
    await page.goto("/");

    await loginPage.loginAndVerifyUser({
      email: process.env.ADMIN_EMAIL!,
      password: process.env.ADMIN_PASSWORD!,
    });
    await page.context().storageState({ path: STORAGE_STATE });
  });
});
