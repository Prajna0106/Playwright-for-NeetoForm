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

  // Sub task 1
  test("should be able to create and verify form", async ({ task1Page }) => {
    let page1: any;

    await test.step("Navigate to form creation page and add fields", async () =>
      (page1 = await task1Page.createFormAndAddFields()));

    await test.step("Check if all form fields are visible", async () => {
      Promise.all([
        expect(page1.getByText(FORM_TEXTS.emailFieldLabel)).toBeVisible(),
        expect(page1.getByText(FORM_TEXTS.fullNameFieldLabel)).toBeVisible(),
        expect(page1.getByText(FORM_TEXTS.phoneNumberFieldLabel)).toBeVisible(),
      ]);
    });

    await test.step("Check if all fields are filled or not", async () => {
      await page1.getByTestId(FORM_SELECTORS.startOrSubmitButton).click();
      Promise.all([
        expect(page1.getByText(FORM_TEXTS.reqEmail)).toBeVisible(),
        expect(page1.getByText(FORM_TEXTS.reqFirstName)).toBeVisible(),
        expect(page1.getByText(FORM_TEXTS.reqLastName)).toBeVisible(),
        expect(page1.getByText(FORM_TEXTS.reqPhone)).toBeVisible(),
      ]);
    });

    await test.step("Check validation errors", async () => {
      await page1
        .getByTestId(FORM_SELECTORS.emailTextField)
        .fill(FORM_TEXTS.invalidEmail);
      await page1
        .getByTestId(FORM_SELECTORS.phoneNumberInputField)
        .fill(FORM_TEXTS.invalidPhone);
      await page1.getByTestId(FORM_SELECTORS.startOrSubmitButton).click();
      Promise.all([
        expect(page1.getByText(FORM_TEXTS.emailInvalid)).toBeVisible(),
        expect(page1.getByText(FORM_TEXTS.usNumberStart)).toBeVisible(),
      ]);
    });

    await test.step("Fill form with valid data and submit", async () =>
      task1Page.fillValidDataAndSubmit(page1));

    await test.step("Verify submitted response", async () =>
      task1Page.verifySubmission());

    await test.step(`Delete the form `, async () => task1Page.deleteForm());
  });

  // Sub task 2
  test("should customize form's field elements", async ({ task1Page }) => {
    await test.step("Navigate to form creation page and customize fields and verify fields", async () =>
      task1Page.createAndCustomizePageAndVerify());

    await test.step("Delete the form", async () => task1Page.deleteForm());
  });

  // Sub task 3
  test("should be able to verify form insights", async ({ task1Page }) => {
    await test.step("Create a form and Verify initial form insights ", async () =>
      task1Page.publishFormAndVerifyInsights());

    await test.step("Open form in a new tab (Visit)", async () =>
      task1Page.afterVisitAnalytics());

    await test.step("Fill form in another new tab (Start)", async () =>
      task1Page.afterStartAnalytics());

    await test.step("Submit form in a third new tab (Submit)", async () =>
      task1Page.afterSubmitAnalytics());

    await test.step("Delete the form", async () => task1Page.deleteForm());
  });
});
