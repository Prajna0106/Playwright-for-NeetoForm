import { Page, expect } from "@playwright/test";
import { FORM_SELECTORS } from "../constants/selectors";
import { FORM_TEXTS } from "../constants/texts";
export default class Task1Page {
  constructor(private page: Page) {}

  createFormAndAddFields = async () => {
    await this.page.getByTestId(FORM_SELECTORS.addFullNameElement).click();
    await this.page.getByTestId(FORM_SELECTORS.addPhoneNumberElement).click();
    await this.page.getByTestId(FORM_SELECTORS.publishButton).click();
    const previewPromise = this.page.waitForEvent("popup");
    await this.page.getByTestId(FORM_SELECTORS.publishPreviewButton).click();
    return await previewPromise;
  };

  fillValidDataAndSubmit = async (page1: Page) => {
    await page1
      .getByTestId(FORM_SELECTORS.emailTextField)
      .fill(FORM_TEXTS.oliverEmail);
    await page1
      .getByTestId(FORM_SELECTORS.firstNameTextField)
      .fill(FORM_TEXTS.firstName);
    await page1
      .getByTestId(FORM_SELECTORS.lastNameTextField)
      .fill(FORM_TEXTS.lastName);
    await page1
      .getByTestId(FORM_SELECTORS.phoneNumberInputField)
      .fill(FORM_TEXTS.usPhoneNo);
    await page1.getByTestId(FORM_SELECTORS.startOrSubmitButton).click();
    await expect(
      page1.getByTestId(FORM_SELECTORS.thankYouPageMessage)
    ).toBeVisible();
    await page1.close();
  };

  verifySubmission = async () => {
    await this.page.getByTestId(FORM_SELECTORS.submissionsTab).click();
    await expect(
      this.page.getByRole("link", { name: FORM_TEXTS.oliverEmail })
    ).toBeVisible();
    await expect(this.page.getByText(FORM_TEXTS.fullName)).toBeVisible();
    await expect(this.page.getByText(FORM_TEXTS.validPhoneNo)).toBeVisible();
  };

  deleteForm = async () => {
    await this.page.getByTestId(FORM_SELECTORS.buildTab).click();
    await this.page.waitForTimeout(3000);
    await this.page.getByTestId(FORM_SELECTORS.nuiDropdownIcon).click();
    await this.page.waitForTimeout(3000);
    await this.page.getByTestId(FORM_SELECTORS.formDeleteButton).click();
    await this.page.getByTestId(FORM_SELECTORS.deleteArchiveCheckbox).click();
    await this.page.getByTestId(FORM_SELECTORS.deleteArchiveButton).click();
  };

  createAndCustomizePageAndVerify = async () => {
    await this.page.getByTestId(FORM_SELECTORS.addSingleChoiceElement).click();
    await expect(
      this.page.getByTestId(FORM_SELECTORS.singleChoiceOptionsContainer)
    ).toBeVisible();
    await this.page.getByTestId(FORM_SELECTORS.contentTextField).click();
    await this.page
      .getByTestId(FORM_SELECTORS.contentTextField)
      .fill(FORM_TEXTS.singleChoice);

    await this.page.getByTestId(FORM_SELECTORS.addMultiChoiceElement).click();
    await expect(
      this.page.getByTestId(FORM_SELECTORS.multiChoiceOptionsContainer)
    ).toBeVisible();
    await this.page.getByTestId(FORM_SELECTORS.contentTextField).click();
    await this.page
      .getByTestId(FORM_SELECTORS.contentTextField)
      .fill(FORM_TEXTS.multipleChoice);

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

    await this.page
      .getByTestId(FORM_SELECTORS.multiChoiceOptionsContainer)
      .click();
    for (let i = 1; i <= 6; i++) {
      await this.page.getByTestId(FORM_SELECTORS.addOptionLink).click();
    }

    await expect(
      this.page.getByTestId(FORM_SELECTORS.formMultipleChoiceOption)
    ).toHaveCount(6);
    await this.page.getByTestId(FORM_SELECTORS.hideQuestionToggleLabel).click();
    await this.page.waitForTimeout(5000);

    await this.page.getByTestId(FORM_SELECTORS.publishButton).click();
    const page2Promise = this.page.waitForEvent("popup");
    await this.page.getByTestId(FORM_SELECTORS.publishPreviewButton).click();
    const page2 = await page2Promise;

    await expect(
      page2.getByTestId(FORM_SELECTORS.formMultipleChoiceOption)
    ).toBeHidden();

    const displayedOptions = await page2
      .getByTestId(FORM_SELECTORS.singleChoiceOption)
      .allTextContents();
    expect(JSON.stringify(originalOptions)).not.toBe(
      JSON.stringify(displayedOptions)
    );
    await page2.close();

    await this.page
      .getByTestId(FORM_SELECTORS.multiChoiceOptionsContainer)
      .click();
    await this.page.getByTestId(FORM_SELECTORS.hideQuestionToggleLabel).click();
    await this.page.getByTestId(FORM_SELECTORS.publishButton).click();
    const page3Promise = this.page.waitForEvent("popup");
    await this.page.getByTestId(FORM_SELECTORS.publishPreviewButton).click();
    const page3 = await page3Promise;
    expect(page3.getByText(FORM_TEXTS.multipleChoice)).toBeVisible();
    await page3.waitForTimeout(2000);
    await page3.close();
  };

  publishFormAndVerifyInsights = async () => {
    await this.page.getByTestId(FORM_SELECTORS.publishButton).click();
    await this.page.getByTestId(FORM_SELECTORS.moreDropdownIcon).click();
    await this.page.getByTestId(FORM_SELECTORS.analyticsMoreTab).click();
    await expect(
      this.page
        .getByTestId(FORM_SELECTORS.visitsMetric)
        .getByTestId(FORM_SELECTORS.insightsCount)
    ).toHaveText("0");
    await expect(
      this.page
        .getByTestId(FORM_SELECTORS.startsMetric)
        .getByTestId(FORM_SELECTORS.insightsCount)
    ).toHaveText("0");
    await expect(
      this.page
        .getByTestId(FORM_SELECTORS.submissionsMetric)
        .getByTestId(FORM_SELECTORS.insightsCount)
    ).toHaveText("0");
    await expect(
      this.page
        .getByTestId(FORM_SELECTORS.completionRateMetric)
        .getByTestId(FORM_SELECTORS.insightsCount)
    ).toHaveText("0%");
  };

  afterVisitAnalytics = async () => {
    const initialVisitCount = Number(
      await this.page
        .getByTestId(FORM_SELECTORS.visitsMetric)
        .getByTestId(FORM_SELECTORS.insightsCount)
        .textContent()
    );
    const page1Promise = this.page.waitForEvent("popup");
    await this.page.getByTestId(FORM_SELECTORS.publishPreviewButton).click();
    const page1 = await page1Promise;
    await this.page.waitForTimeout(3000);
    await this.page.reload();
    await expect(
      this.page
        .getByTestId(FORM_SELECTORS.visitsMetric)
        .getByTestId(FORM_SELECTORS.insightsCount)
    ).toHaveText(String(initialVisitCount + 1), { timeout: 15000 });
    await page1.close();
  };

  afterStartAnalytics = async () => {
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
    const page2Promise = this.page.waitForEvent("popup");
    await this.page.getByTestId(FORM_SELECTORS.publishPreviewButton).click();
    const page2 = await page2Promise;
    await page2
      .getByTestId(FORM_SELECTORS.emailTextField)
      .fill(FORM_TEXTS.oliverEmail);
    await this.page.waitForTimeout(3000);
    await this.page.reload();
    await expect(
      this.page
        .getByTestId(FORM_SELECTORS.visitsMetric)
        .getByTestId(FORM_SELECTORS.insightsCount)
    ).toHaveText(String(initialVisitCount + 1), { timeout: 15000 });
    await expect(
      this.page
        .getByTestId(FORM_SELECTORS.startsMetric)
        .getByTestId(FORM_SELECTORS.insightsCount)
    ).toHaveText(String(initialStartCount + 1), { timeout: 15000 });
    const pageURL = await page2.url();
    await page2.close();
    return pageURL;
  };

  afterSubmitAnalytics = async () => {
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
    const page3Promise = this.page.waitForEvent("popup");
    await this.page.getByTestId(FORM_SELECTORS.publishPreviewButton).click();
    const page3 = await page3Promise;
    await page3
      .getByTestId(FORM_SELECTORS.emailTextField)
      .fill(FORM_TEXTS.sampleEmail);
    await page3.getByTestId(FORM_SELECTORS.startOrSubmitButton).click();
    await this.page.reload();
    await expect(
      this.page
        .getByTestId(FORM_SELECTORS.visitsMetric)
        .getByTestId(FORM_SELECTORS.insightsCount)
    ).toHaveText(String(initialVisitCount + 1), { timeout: 15000 });
    await expect(
      this.page
        .getByTestId(FORM_SELECTORS.startsMetric)
        .getByTestId(FORM_SELECTORS.insightsCount)
    ).toHaveText(String(initialStartCount), { timeout: 15000 });
    await expect(
      this.page
        .getByTestId(FORM_SELECTORS.submissionsMetric)
        .getByTestId(FORM_SELECTORS.insightsCount)
    ).toHaveText(String(initialSubmissions + 1), { timeout: 15000 });
    await page3.close();
  };
}
