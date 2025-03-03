import { expect, Page } from "@playwright/test";
import { FORM_SELECTORS } from "../constants/selectors";
import { FORM_TEXTS } from "../constants/texts";

export default class Task3Page {
  constructor(private page: Page) {}

  createFormAndApplyTheme = async () => {
    await this.page.getByTestId(FORM_SELECTORS.addLogoElement).click();
    await this.page.getByTestId(FORM_SELECTORS.openAssetLibraryButton).click();
    await this.page
      .getByTestId(FORM_SELECTORS.neetoImageUploaderMyImagesTab)
      .click();
    await this.page.getByTestId(FORM_SELECTORS.niuLibraryImage4).click();
    await this.page
      .getByTestId(FORM_SELECTORS.selectOriginalImageSwitch)
      .click();
    await this.page
      .getByTestId(FORM_SELECTORS.neetoImageUploaderCropSubmitButton)
      .click();
    await expect(this.page.getByTestId(FORM_SELECTORS.logoImage)).toBeVisible();
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

  createFormWithMultipleElements = async () => {
    await this.page.getByTestId(FORM_SELECTORS.addOpinionScaleElement).click();
    await this.page.waitForTimeout(2000);
    await this.page.getByTestId(FORM_SELECTORS.addStarRatingElement).click();
    await this.page.waitForTimeout(2000);
    await this.page.getByTestId(FORM_SELECTORS.addMatrixElement).click();
    await this.page.waitForTimeout(2000);

    await this.page
      .getByTestId(FORM_SELECTORS.opinionScalePreviewGroup)
      .click();
    await this.page
      .getByTestId(FORM_SELECTORS.contentTextField)
      .waitFor({ state: "visible" });
    await this.page
      .getByTestId(FORM_SELECTORS.contentTextField)
      .fill(FORM_TEXTS.opinionScale);

    await this.page.getByTestId(FORM_SELECTORS.starRatingPreviewGroup).click();
    await this.page
      .getByTestId(FORM_SELECTORS.contentTextField)
      .waitFor({ state: "visible" });
    await this.page
      .getByTestId(FORM_SELECTORS.contentTextField)
      .fill(FORM_TEXTS.starRating);

    await this.page.getByTestId(FORM_SELECTORS.matrixPreviewGroup).click();
    await this.page
      .getByTestId(FORM_SELECTORS.contentTextField)
      .waitFor({ state: "visible" });
    await this.page
      .getByTestId(FORM_SELECTORS.contentTextField)
      .fill(FORM_TEXTS.matrix);
    await this.page.getByTestId(FORM_SELECTORS.publishButton).click();
  };

  fillTheForm = async () => {
    const page1Promise = this.page.waitForEvent("popup");
    await this.page.getByTestId(FORM_SELECTORS.publishPreviewButton).click();
    const page1 = await page1Promise;
    await page1
      .getByTestId(FORM_SELECTORS.emailTextField)
      .fill(FORM_TEXTS.sampleEmail);
    await page1
      .getByTestId(FORM_SELECTORS.opinionScaleList)
      .getByText("4")
      .click();
    await page1
      .getByTestId(FORM_SELECTORS.previewRatingIcon)
      .getByText("5")
      .click();

    await page1
      .getByTestId(FORM_SELECTORS.formMatrixTable)
      .locator(FORM_TEXTS.span)
      .nth(1)
      .click();
    await page1
      .getByTestId(FORM_SELECTORS.formMatrixTable)
      .locator(FORM_TEXTS.span)
      .nth(2)
      .click();
    await page1.getByTestId(FORM_SELECTORS.startOrSubmitButton).click();
    await expect(
      page1.getByTestId(FORM_SELECTORS.thankYouPageMessage)
    ).toBeVisible();
    await page1.close();
  };

  downloadSubmissions = async () => {
    await this.page.getByTestId(FORM_SELECTORS.submissionsTab).click();
    await this.page.getByTestId(FORM_SELECTORS.submittedResponse1).hover();
    await this.page.getByTestId(FORM_SELECTORS.viewSubmission1Button).click();
    await this.page.waitForTimeout(2000);

    await this.page.getByTestId(FORM_SELECTORS.downloadAsPdfRadioItem).click();
    await this.page.getByTestId(FORM_SELECTORS.actionDropdownBtn).click();
    const page2Promise = this.page.waitForEvent("popup");
    await this.page.getByTestId(FORM_SELECTORS.actionDropdownBtn).click();
    const page2 = await page2Promise;
    await page2.bringToFront();
    page2.waitForTimeout(2000);
    await this.page.bringToFront();
    await this.page.getByTestId(FORM_SELECTORS.paneCloseButton).click();
  };

  createFormWithCustomFieldCode = async () => {
    await this.page.waitForTimeout(2000);
    await this.page.getByTestId(FORM_SELECTORS.addStarRatingElement).click();
    await this.page.waitForTimeout(2000);
    await this.page.getByTestId(FORM_SELECTORS.addMultiChoiceElement).click();
    await this.page.waitForTimeout(2000);
    await this.page.getByTestId(FORM_SELECTORS.addMatrixElement).click();
    await this.page.waitForTimeout(2000);

    // Star Rating
    await this.page.getByTestId(FORM_SELECTORS.starRatingPreviewGroup).click();
    await this.page
      .getByTestId(FORM_SELECTORS.contentTextField)
      .waitFor({ state: "visible" });
    await this.page
      .getByTestId(FORM_SELECTORS.contentTextField)
      .fill(FORM_TEXTS.rateCustomerService);
    await this.page
      .getByTestId(FORM_SELECTORS.advancedPropertiesButton)
      .click();
    await this.page
      .getByTestId(FORM_SELECTORS.fieldCodeTextField)
      .fill(FORM_TEXTS.customerService);

    // Multi-choice
    await this.page
      .getByTestId(FORM_SELECTORS.multiChoiceOptionsContainer)
      .click();
    await this.page
      .getByTestId(FORM_SELECTORS.contentTextField)
      .waitFor({ state: "visible" });
    await this.page
      .getByTestId(FORM_SELECTORS.contentTextField)
      .fill(FORM_TEXTS.preferredLanguage);
    await this.page
      .getByTestId(FORM_SELECTORS.optionInput0)
      .fill(FORM_TEXTS.python);
    await this.page
      .getByTestId(FORM_SELECTORS.optionInput1)
      .fill(FORM_TEXTS.javascript);
    await this.page
      .getByTestId(FORM_SELECTORS.optionInput2)
      .fill(FORM_TEXTS.ruby);
    await this.page.getByTestId(FORM_SELECTORS.optionInput3).fill(FORM_TEXTS.c);
    await this.page
      .getByTestId(FORM_SELECTORS.advancedPropertiesButton)
      .click();
    await this.page
      .getByTestId(FORM_SELECTORS.fieldCodeTextField)
      .fill(FORM_TEXTS.language);

    // Matrix
    await this.page.getByTestId(FORM_SELECTORS.matrixPreviewGroup).click();
    await this.page
      .getByTestId(FORM_SELECTORS.contentTextField)
      .waitFor({ state: "visible" });
    await this.page
      .getByTestId(FORM_SELECTORS.contentTextField)
      .fill(FORM_TEXTS.rateCustomerService);

    // Rows
    await this.page
      .getByTestId(FORM_SELECTORS.matrixRowContainer)
      .getByTestId(FORM_SELECTORS.addOptionLink)
      .click();
    await this.page
      .getByTestId(FORM_SELECTORS.matrixRowContainer)
      .getByTestId(FORM_SELECTORS.optionInput0)
      .fill(FORM_TEXTS.friendliness);
    await this.page
      .getByTestId(FORM_SELECTORS.matrixRowContainer)
      .getByTestId(FORM_SELECTORS.optionInput1)
      .fill(FORM_TEXTS.knowledge);
    await this.page
      .getByTestId(FORM_SELECTORS.matrixRowContainer)
      .getByTestId(FORM_SELECTORS.optionInput2)
      .fill(FORM_TEXTS.quickness);

    // Columns
    await this.page
      .getByTestId(FORM_SELECTORS.matrixColumnContainer)
      .getByTestId(FORM_SELECTORS.addOptionLink)
      .click();
    await this.page
      .getByTestId(FORM_SELECTORS.matrixColumnContainer)
      .getByTestId(FORM_SELECTORS.optionInput0)
      .fill(FORM_TEXTS.excellent);
    await this.page
      .getByTestId(FORM_SELECTORS.matrixColumnContainer)
      .getByTestId(FORM_SELECTORS.optionInput1)
      .fill(FORM_TEXTS.veryGood);
    await this.page
      .getByTestId(FORM_SELECTORS.matrixColumnContainer)
      .getByTestId(FORM_SELECTORS.optionInput2)
      .fill(FORM_TEXTS.average);

    await this.page
      .getByTestId(FORM_SELECTORS.advancedPropertiesButton)
      .click();
    await this.page
      .getByTestId(FORM_SELECTORS.fieldCodeTextField)
      .fill(FORM_TEXTS.customerRep);
    await this.page.getByTestId(FORM_SELECTORS.publishButton).click();
  };

  changeURLParams = async () => {
    const page1Promise = this.page.waitForEvent("popup");
    await this.page.getByTestId(FORM_SELECTORS.publishPreviewButton).click();
    const page1 = await page1Promise;

    const params = new URLSearchParams({
      email: FORM_TEXTS.oliverEmail,
      customer_service: FORM_TEXTS.noOfCustomerService,
      languages: FORM_TEXTS.languages,
      "customer_rep.Knowledge": FORM_TEXTS.excellent,
      "customer_rep.Quickness": FORM_TEXTS.veryGood,
      "customer_rep.Friendliness": FORM_TEXTS.average,
    });

    const currentURL = new URL(page1.url());
    params.forEach((value, key) => currentURL.searchParams.append(key, value));
    await page1.goto(currentURL.toString());
    await page1.getByTestId(FORM_SELECTORS.startOrSubmitButton).click();
    await expect(
      page1.getByTestId(FORM_SELECTORS.thankYouPageContent)
    ).toBeVisible();
  };
}
