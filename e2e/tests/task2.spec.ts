import { expect } from "@playwright/test";
import { test } from "../fixtures";
import { FORM_TEXTS } from "../constants/texts";
import { FORM_SELECTORS } from "../constants/selectors";
test.describe("Form Page", () => {
  test.beforeEach(async ({ page }) => {
    await test.step("Go to dashboard", () => page.goto("/"));
    await test.step("Click on add form button", () =>
      page.getByTestId(FORM_SELECTORS.addFormButton).click());
    await test.step("Click on start from scratch button", () =>
      page.getByTestId(FORM_SELECTORS.startFromScratchButton).click());
  });
  test("should be able to access control the form", async ({
    page,
    task2Page,
  }) => {
    await test.step("create a form and change the access control", async () =>
      task2Page.createAndChangeAccessControl());

    await test.step("open the form in a new incognito tab and submit the form", async () =>
      task2Page.openAndSubmitForm());

    await test.step("verify the form", async () => {
      await page.getByTestId(FORM_SELECTORS.submissionsTab).click();
      await expect(
        page.getByRole("link", { name: `${FORM_TEXTS.oliverEmail}` })
      ).toBeVisible();
    });

    await test.step(`Delete the form`, async () => task2Page.deleteForm());
  });

  test("should be able to do unique submissions", async ({ task2Page }) => {
    await test.step("create a form and submit the form", async () =>
      task2Page.createAndVerifyForm());

    await test.step("open the form in incognito mode", async () =>
      task2Page.openFormInIncognitoTab());

    await test.step("change the preferences", async () =>
      task2Page.changePreferences());

    await test.step(`Delete the form`, async () => task2Page.deleteForm());
  });

  test("should be able to do conditional logic", async ({ task2Page }) => {
    await test.step("create a form with a single choice question", async () =>
      task2Page.createFormWithSingleChoice());

    await test.step("set up and verifythe conditional logic", async () =>
      task2Page.setUpAndVerifyConditionalLogic());

    await test.step("change the conditional logic ", async () =>
      task2Page.changeConditionalLogic());

    await test.step(`Delete the form`, async () => task2Page.deleteForm());
  });
});
