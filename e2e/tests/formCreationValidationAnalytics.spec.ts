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
  test.afterEach(async ({ page }) => {
    await test.step("Go to Dashboard", () => page.goto("/"));
    await test.step("Click on the dropdown button", () =>
      page.getByTestId(FORM_SELECTORS.moreActionsDropdown).first().click());
    await test.step("Click on delete form button", () =>
      page.getByTestId(FORM_SELECTORS.deleteFormButton).click());
    await test.step("Click on the delete checkbox", () =>
      page.getByTestId(FORM_SELECTORS.deleteArchiveCheckbox).click());
    await test.step("Click on the delete archive button", () =>
      page.getByTestId(FORM_SELECTORS.deleteArchiveButton).click());
  });

  // Sub task 1
  test("should be able to create and verify form", async ({
    formCreationValidationAnalytics,
  }) => {
    let previewPublishedPage: any;

    await test.step("Navigate to form creation page and add fields", async () =>
      (previewPublishedPage =
        await formCreationValidationAnalytics.createFormAndAddFields()));

    await test.step("Check if all form fields are visible", async () => {
      await Promise.all([
        expect(
          previewPublishedPage.getByText(FORM_TEXTS.emailFieldLabel)
        ).toBeVisible(),
        expect(
          previewPublishedPage.getByText(FORM_TEXTS.fullNameFieldLabel)
        ).toBeVisible(),
        expect(
          previewPublishedPage.getByText(FORM_TEXTS.phoneNumberFieldLabel)
        ).toBeVisible(),
      ]);
    });

    await test.step("Check if all fields are filled or not", async () => {
      await previewPublishedPage
        .getByTestId(FORM_SELECTORS.startOrSubmitButton)
        .click();
      await Promise.all([
        expect(
          previewPublishedPage.getByText(FORM_TEXTS.reqEmail)
        ).toBeVisible(),
        expect(
          previewPublishedPage.getByText(FORM_TEXTS.reqFirstName)
        ).toBeVisible(),
        expect(
          previewPublishedPage.getByText(FORM_TEXTS.reqLastName)
        ).toBeVisible(),
        expect(
          previewPublishedPage.getByText(FORM_TEXTS.reqPhone)
        ).toBeVisible(),
      ]);
    });

    await test.step("Check validation errors", async () => {
      await previewPublishedPage
        .getByTestId(FORM_SELECTORS.emailTextField)
        .fill(FORM_TEXTS.invalidEmail);
      await previewPublishedPage
        .getByTestId(FORM_SELECTORS.phoneNumberInputField)
        .fill(FORM_TEXTS.invalidPhone);
      await previewPublishedPage
        .getByTestId(FORM_SELECTORS.startOrSubmitButton)
        .click();
      await Promise.all([
        expect(
          previewPublishedPage.getByText(FORM_TEXTS.emailInvalid)
        ).toBeVisible(),
        expect(
          previewPublishedPage.getByText(FORM_TEXTS.usNumberStart)
        ).toBeVisible(),
      ]);
    });

    await test.step("Fill form with valid data and submit", async () =>
      formCreationValidationAnalytics.fillValidDataAndSubmit(
        previewPublishedPage
      ));

    await test.step(
      "Verify submitted response",
      formCreationValidationAnalytics.verifySubmission
    );
  });

  // Sub task 2
  test("should customize form's field elements", async ({
    formCreationValidationAnalytics,
  }) => {
    await test.step(
      "Navigate to form creation page and customize fields and verify fields",
      formCreationValidationAnalytics.customizePageAndVerify
    );
  });

  // Sub task 3
  test("should be able to verify form insights", async ({
    formCreationValidationAnalytics,
  }) => {
    await test.step(
      "Create a form and Verify initial form insights ",
      formCreationValidationAnalytics.publishFormAndVerifyInsights
    );

    await test.step(
      "Open form in a new tab (Visit)",
      formCreationValidationAnalytics.afterVisitAnalytics
    );

    await test.step(
      "Fill form in another new tab (Start)",
      formCreationValidationAnalytics.afterStartAnalytics
    );

    await test.step(
      "Submit form in a third new tab (Submit)",
      formCreationValidationAnalytics.afterSubmitAnalytics
    );
  });
});
