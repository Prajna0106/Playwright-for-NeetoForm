import { Page, expect } from "@playwright/test";
import { FORM_SELECTORS } from "../constants/selectors";
import { FORM_TEXTS } from "../constants/texts";

export default class FormCreationValidationAnalytics {
  constructor(private page: Page) {}

  createFormAndAddFields = async (): Promise<Page> => {
    await this.page.getByTestId(FORM_SELECTORS.addFullNameElement).click();
    await this.page.getByTestId(FORM_SELECTORS.addPhoneNumberElement).click();
    await this.page.getByTestId(FORM_SELECTORS.publishButton).click();

    const previewPromise = this.page.waitForEvent("popup");
    await this.page.getByTestId(FORM_SELECTORS.publishPreviewButton).click();
    return previewPromise;
  };

  fillValidDataAndSubmit = async (
    previewPublishedPage: Page
  ): Promise<void> => {
    await previewPublishedPage
      .getByTestId(FORM_SELECTORS.emailTextField)
      .fill(FORM_TEXTS.oliverEmail);

    await previewPublishedPage
      .getByTestId(FORM_SELECTORS.firstNameTextField)
      .fill(FORM_TEXTS.firstName);

    await previewPublishedPage
      .getByTestId(FORM_SELECTORS.lastNameTextField)
      .fill(FORM_TEXTS.lastName);

    await previewPublishedPage
      .getByTestId(FORM_SELECTORS.phoneNumberInputField)
      .fill(FORM_TEXTS.usPhoneNo);

    await previewPublishedPage
      .getByTestId(FORM_SELECTORS.startOrSubmitButton)
      .click();

    await expect(
      previewPublishedPage.getByTestId(FORM_SELECTORS.thankYouPageMessage)
    ).toBeVisible();

    await previewPublishedPage.close();
  };

  verifySubmission = async (): Promise<void> => {
    await this.page.getByTestId(FORM_SELECTORS.submissionsTab).click();

    await Promise.all([
      expect(
        this.page.getByRole("link", { name: FORM_TEXTS.oliverEmail })
      ).toBeVisible(),
      expect(this.page.getByText(FORM_TEXTS.fullName)).toBeVisible(),
      expect(this.page.getByText(FORM_TEXTS.validPhoneNo)).toBeVisible(),
    ]);
  };

  customizePageAndVerify = async (): Promise<void> => {
    // Single Choice configuration
    await this.page.getByTestId(FORM_SELECTORS.addSingleChoiceElement).click();
    await expect(
      this.page.getByTestId(FORM_SELECTORS.singleChoiceOptionsContainer)
    ).toBeVisible();

    await this.page.getByTestId(FORM_SELECTORS.contentTextField).click();
    await this.page
      .getByTestId(FORM_SELECTORS.contentTextField)
      .fill(FORM_TEXTS.singleChoice);

    // Multiple Choice configuration
    await this.page.getByTestId(FORM_SELECTORS.addMultiChoiceElement).click();
    await expect(
      this.page.getByTestId(FORM_SELECTORS.multiChoiceOptionsContainer)
    ).toBeVisible();

    await this.page.getByTestId(FORM_SELECTORS.contentTextField).click();
    await this.page
      .getByTestId(FORM_SELECTORS.contentTextField)
      .fill(FORM_TEXTS.multipleChoice);

    // Bulk options configuration
    await this.page
      .getByTestId(FORM_SELECTORS.singleChoiceOptionsContainer)
      .click();

    await this.page.getByTestId(FORM_SELECTORS.addBulkOptionLink).click();
    await this.page
      .getByTestId(FORM_SELECTORS.bulkAddOptionsTextarea)
      .fill(FORM_TEXTS.optionsUpto10);

    await this.page
      .getByTestId(FORM_SELECTORS.bulkAddOptionsDoneButton)
      .click();

    await expect(
      this.page.getByTestId(FORM_SELECTORS.formSingleChoiceOption)
    ).toHaveCount(10);

    await this.page.getByTestId(FORM_SELECTORS.randomizeSwitchLabel).click();

    const originalOptions = await this.page
      .getByTestId(FORM_SELECTORS.singleChoiceOption)
      .allTextContents();

    // Multiple Choice options expansion
    await this.page
      .getByTestId(FORM_SELECTORS.multiChoiceOptionsContainer)
      .click();

    for (let i = 1; i <= 6; i++) {
      await this.page.getByTestId(FORM_SELECTORS.addOptionLink).click();
    }

    await expect(
      this.page.getByTestId(FORM_SELECTORS.formMultipleChoiceOption)
    ).toHaveCount(10);

    await this.page.getByTestId(FORM_SELECTORS.hideQuestionToggleLabel).click();
    await expect(
      this.page.getByTestId(FORM_SELECTORS.publishButton)
    ).toBeVisible();

    // First preview verification
    await this.page.getByTestId(FORM_SELECTORS.publishButton).click();
    const newPopupPromise = this.page.waitForEvent("popup");
    await this.page.getByTestId(FORM_SELECTORS.publishPreviewButton).click();
    const previewPublishedPage = await newPopupPromise;

    await expect(
      previewPublishedPage.getByTestId(FORM_SELECTORS.formMultipleChoiceOption)
    ).toBeHidden();

    const displayedOptions = await previewPublishedPage
      .getByTestId(FORM_SELECTORS.singleChoiceOption)
      .allTextContents();

    await expect(originalOptions).not.toStrictEqual(displayedOptions);

    await previewPublishedPage.close();

    // Second preview verification
    await this.page
      .getByTestId(FORM_SELECTORS.multiChoiceOptionsContainer)
      .click();

    await this.page.getByTestId(FORM_SELECTORS.hideQuestionToggleLabel).click();
    await this.page.getByTestId(FORM_SELECTORS.publishButton).click();

    const secondPopupPromise = this.page.waitForEvent("popup");
    await this.page.getByTestId(FORM_SELECTORS.publishPreviewButton).click();
    const secondPreviewPage = await secondPopupPromise;

    await expect(
      secondPreviewPage.getByText(FORM_TEXTS.multipleChoice)
    ).toBeVisible();

    await secondPreviewPage.close();
  };

  publishFormAndVerifyInsights = async (): Promise<void> => {
    await this.page.getByTestId(FORM_SELECTORS.publishButton).click();
    await this.page.getByTestId(FORM_SELECTORS.moreDropdownIcon).click();
    await this.page.getByTestId(FORM_SELECTORS.analyticsMoreTab).click();

    await Promise.all([
      expect(
        this.page
          .getByTestId(FORM_SELECTORS.visitsMetric)
          .getByTestId(FORM_SELECTORS.insightsCount)
      ).toHaveText("0"),
      expect(
        this.page
          .getByTestId(FORM_SELECTORS.startsMetric)
          .getByTestId(FORM_SELECTORS.insightsCount)
      ).toHaveText("0"),
      expect(
        this.page
          .getByTestId(FORM_SELECTORS.submissionsMetric)
          .getByTestId(FORM_SELECTORS.insightsCount)
      ).toHaveText("0"),
      expect(
        this.page
          .getByTestId(FORM_SELECTORS.completionRateMetric)
          .getByTestId(FORM_SELECTORS.insightsCount)
      ).toHaveText("0%"),
    ]);
  };

  afterVisitAnalytics = async (): Promise<void> => {
    const initialVisitCount = Number(
      await this.page
        .getByTestId(FORM_SELECTORS.visitsMetric)
        .getByTestId(FORM_SELECTORS.insightsCount)
        .textContent()
    );

    const previewPromise = this.page.waitForEvent("popup");
    await this.page.getByTestId(FORM_SELECTORS.publishPreviewButton).click();
    const previewPage = await previewPromise;

    await this.page.waitForTimeout(3000);
    await this.page.reload();

    await expect(
      this.page
        .getByTestId(FORM_SELECTORS.visitsMetric)
        .getByTestId(FORM_SELECTORS.insightsCount)
    ).toHaveText(String(initialVisitCount + 1), { timeout: 15_000 });

    await previewPage.close();
  };

  afterStartAnalytics = async (): Promise<string> => {
    const initialStartCount = Number(
      await this.page
        .getByTestId(FORM_SELECTORS.startsMetric)
        .getByTestId(FORM_SELECTORS.insightsCount)
        .textContent()
    );

    const initialVisitCount = Number(
      await this.page
        .getByTestId(FORM_SELECTORS.visitsMetric)
        .getByTestId(FORM_SELECTORS.insightsCount)
        .textContent()
    );

    const previewPromise = this.page.waitForEvent("popup");
    await this.page.getByTestId(FORM_SELECTORS.publishPreviewButton).click();
    const previewPage = await previewPromise;

    await previewPage
      .getByTestId(FORM_SELECTORS.emailTextField)
      .fill(FORM_TEXTS.oliverEmail);

    await this.page.waitForTimeout(3000);
    await this.page.reload();

    await Promise.all([
      expect(
        this.page
          .getByTestId(FORM_SELECTORS.visitsMetric)
          .getByTestId(FORM_SELECTORS.insightsCount)
      ).toHaveText(String(initialVisitCount + 1), { timeout: 15_000 }),
      expect(
        this.page
          .getByTestId(FORM_SELECTORS.startsMetric)
          .getByTestId(FORM_SELECTORS.insightsCount)
      ).toHaveText(String(initialStartCount + 1), { timeout: 15_000 }),
    ]);

    const pageURL = previewPage.url();
    await previewPage.close();
    return pageURL;
  };

  afterSubmitAnalytics = async (): Promise<void> => {
    const initialStartCount = Number(
      await this.page
        .getByTestId(FORM_SELECTORS.startsMetric)
        .getByTestId(FORM_SELECTORS.insightsCount)
        .textContent()
    );

    const initialVisitCount = Number(
      await this.page
        .getByTestId(FORM_SELECTORS.visitsMetric)
        .getByTestId(FORM_SELECTORS.insightsCount)
        .textContent()
    );

    const initialSubmissions = Number(
      await this.page
        .getByTestId(FORM_SELECTORS.submissionsMetric)
        .getByTestId(FORM_SELECTORS.insightsCount)
        .textContent()
    );

    const previewPromise = this.page.waitForEvent("popup");
    await this.page.getByTestId(FORM_SELECTORS.publishPreviewButton).click();
    const previewPage = await previewPromise;

    await previewPage
      .getByTestId(FORM_SELECTORS.emailTextField)
      .fill(FORM_TEXTS.sampleEmail);

    await previewPage.getByTestId(FORM_SELECTORS.startOrSubmitButton).click();

    await this.page.reload();

    await Promise.all([
      expect(
        this.page
          .getByTestId(FORM_SELECTORS.visitsMetric)
          .getByTestId(FORM_SELECTORS.insightsCount)
      ).toHaveText(String(initialVisitCount + 1), { timeout: 15_000 }),
      expect(
        this.page
          .getByTestId(FORM_SELECTORS.startsMetric)
          .getByTestId(FORM_SELECTORS.insightsCount)
      ).toHaveText(String(initialStartCount), { timeout: 15_000 }),
      expect(
        this.page
          .getByTestId(FORM_SELECTORS.submissionsMetric)
          .getByTestId(FORM_SELECTORS.insightsCount)
      ).toHaveText(String(initialSubmissions + 1), { timeout: 15_000 }),
    ]);

    await previewPage.close();
  };
}
