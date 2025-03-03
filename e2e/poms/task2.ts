import { Page, expect, Browser } from "@playwright/test";
import { FORM_SELECTORS } from "../constants/selectors";
import { FORM_TEXTS } from "../constants/texts";
export default class Task2Page {
  constructor(private page: Page, private browser: Browser) {}
  page1: Page;
  createAndChangeAccessControl = async () => {
    await this.page.getByTestId(FORM_SELECTORS.publishButton).click();
    await this.page.getByTestId(FORM_SELECTORS.settingsTab).click();
    await this.page
      .getByTestId(FORM_SELECTORS.accessControlSettingsLink)
      .click();
    await this.page
      .getByTestId(FORM_SELECTORS.accessControlPasswordProtected)
      .click();
    await this.page.getByTestId(FORM_SELECTORS.passwordInputField).fill("1");
    await this.page.getByTestId(FORM_SELECTORS.neetoMoleculesHeader).click();
    await expect(
      this.page.getByTestId(FORM_SELECTORS.passwordInputError)
    ).toBeVisible();
    await this.page
      .getByTestId(FORM_SELECTORS.passwordInputField)
      .fill(FORM_TEXTS.password);
    await this.page.getByTestId(FORM_SELECTORS.saveChangesButton).click();
  };

  openAndSubmitForm = async () => {
    await this.page.getByTestId(FORM_SELECTORS.shareTab).click();
    let text: string = await this.page
      .getByTestId(FORM_SELECTORS.nuiInputField)
      .innerText();
    if (text) console.log(text);
    const newContext = await this.browser.newContext({
      storageState: { cookies: [], origins: [] },
    });
    const newPage = await newContext.newPage();
    await newPage.goto(text);
    await expect(
      newPage.getByTestId(FORM_SELECTORS.passwordProtectedHeading)
    ).toBeVisible();
    await newPage
      .getByTestId(FORM_SELECTORS.passwordTextField)
      .fill(FORM_TEXTS.password);
    await newPage.getByTestId(FORM_SELECTORS.continueButton).click();
    await newPage
      .getByTestId(FORM_SELECTORS.emailTextField)
      .fill(FORM_TEXTS.oliverEmail);
    await newPage.waitForTimeout(2000);
    await newPage.getByTestId(FORM_SELECTORS.startOrSubmitButton).click();
    await expect(
      newPage.getByTestId(FORM_SELECTORS.thankYouPageMessage)
    ).toBeVisible();
    await newPage.close();
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

  createAndVerifyForm = async () => {
    await this.page.getByTestId(FORM_SELECTORS.publishButton).click();
    await this.page.getByTestId(FORM_SELECTORS.settingsTab).click();
    await this.page
      .getByTestId(FORM_SELECTORS.uniqueSubmissionSettingsLink)
      .click();
    await this.page.getByTestId(FORM_SELECTORS.cookieTrackRadioItem).click();
    await this.page.getByTestId(FORM_SELECTORS.saveChangesButton).click();
    const previewPromise = this.page.waitForEvent("popup");
    await this.page.getByTestId(FORM_SELECTORS.publishPreviewButton).click();
    this.page1 = await previewPromise;
    await this.page1
      .getByTestId(FORM_SELECTORS.emailTextField)
      .fill(FORM_TEXTS.oliverEmail);
    await this.page1.waitForTimeout(2000);
    await this.page1.getByTestId(FORM_SELECTORS.startOrSubmitButton).click();
    await expect(
      this.page1.getByTestId(FORM_SELECTORS.thankYouPageMessage)
    ).toBeVisible();
    await this.page1.close();
    const newPromise = this.page.waitForEvent("popup");
    await this.page.getByTestId(FORM_SELECTORS.publishPreviewButton).click();
    this.page1 = await newPromise;
    await expect(
      this.page1.getByTestId(FORM_SELECTORS.alreadySubmittedMessage)
    ).toBeVisible();
    await this.page1.close();
  };

  openFormInIncognitoTab = async () => {
    await this.page.getByTestId(FORM_SELECTORS.shareTab).click();
    let text: string = await this.page
      .getByTestId(FORM_SELECTORS.nuiInputField)
      .innerText();
    if (text) console.log(text);
    const newContext = await this.browser.newContext({
      storageState: { cookies: [], origins: [] },
    });
    const newPage = await newContext.newPage();
    await newPage.goto(text);
    await newPage
      .getByTestId(FORM_SELECTORS.emailTextField)
      .fill(FORM_TEXTS.sampleEmail);
    await newPage.waitForTimeout(2000);
    await newPage.getByTestId(FORM_SELECTORS.startOrSubmitButton).click();
    await expect(
      newPage.getByTestId(FORM_SELECTORS.thankYouPageMessage)
    ).toBeVisible();
    await newPage.close();
  };

  changePreferences = async () => {
    await this.page.getByTestId(FORM_SELECTORS.settingsTab).click();
    await this.page
      .getByTestId(FORM_SELECTORS.uniqueSubmissionSettingsLink)
      .click();
    await this.page.getByTestId(FORM_SELECTORS.noTrackRadioItem).click();
    await this.page.getByTestId(FORM_SELECTORS.saveChangesButton).click();
    const previewPromise = this.page.waitForEvent("popup");
    await this.page.getByTestId(FORM_SELECTORS.publishPreviewButton).click();
    this.page1 = await previewPromise;
    await this.page1
      .getByTestId(FORM_SELECTORS.emailTextField)
      .fill(FORM_TEXTS.sampleEmail);
    await this.page1.waitForTimeout(2000);
    await this.page1.getByTestId(FORM_SELECTORS.startOrSubmitButton).click();
    await expect(
      this.page1.getByTestId(FORM_SELECTORS.thankYouPageMessage)
    ).toBeVisible();
    await this.page1.close();
  };

  createFormWithSingleChoice = async () => {
    await this.page.getByTestId(FORM_SELECTORS.addSingleChoiceElement).click();
    await this.page
      .getByTestId(FORM_SELECTORS.contentTextField)
      .fill(FORM_TEXTS.interestedQuestion);
    await this.page.getByTestId(FORM_SELECTORS.optionInput3).hover();
    await this.page.getByTestId(FORM_SELECTORS.deleteOptionButton3).click();
    await this.page.getByTestId(FORM_SELECTORS.optionInput2).hover();
    await this.page.getByTestId(FORM_SELECTORS.deleteOptionButton2).click();
    await this.page
      .getByTestId(FORM_SELECTORS.optionInput0)
      .fill(FORM_TEXTS.yes);
    await this.page
      .getByTestId(FORM_SELECTORS.optionInput1)
      .fill(FORM_TEXTS.no);
    const source = await this.page.getByTestId(
      FORM_SELECTORS.formMultipleChoiceOption
    );
    const sourceBox = await source.boundingBox();

    if (sourceBox) {
      const startX = sourceBox.x + sourceBox.width / 2;
      const startY = sourceBox.y + sourceBox.height / 2;
      const endY = startY - 150;

      await this.page.mouse.move(startX, startY);
      await this.page.mouse.down();
      await this.page.mouse.move(startX, endY, { steps: 10 });
      await this.page.mouse.up();
    }
    await this.page.waitForTimeout(2000);
  };

  setUpAndVerifyConditionalLogic = async () => {
    await this.page.getByTestId(FORM_SELECTORS.settingsTab).click();
    await this.page
      .getByTestId(FORM_SELECTORS.conditionalLogicSettingsLink)
      .click();
    await this.page.getByTestId(FORM_SELECTORS.noDataPrimaryButton).click();
    await this.page.getByTestId(FORM_SELECTORS.conditionQuestionSelect).click();
    await this.page.waitForTimeout(2000);
    await this.page
      .getByText(FORM_TEXTS.interestedQuestion, { exact: true })
      .click();

    await this.page.getByTestId(FORM_SELECTORS.conditionVerbSelect).click();
    await this.page.getByText(FORM_TEXTS.contains, { exact: true }).click();
    await this.page.getByTestId(FORM_SELECTORS.conditionValueSelect).click();
    await this.page.getByText(FORM_TEXTS.yes, { exact: true }).click();

    await this.page.getByTestId(FORM_SELECTORS.actionTypeSelect).click();
    await this.page.getByText(FORM_TEXTS.show, { exact: true }).click();
    await this.page.getByTestId(FORM_SELECTORS.actionFieldSelect).click();
    await this.page.getByText(FORM_TEXTS.emailAddress, { exact: true }).click();
    await this.page.getByTestId(FORM_SELECTORS.saveChangesButton).click();
    await this.page.getByTestId(FORM_SELECTORS.publishButton).click();
    const previewPromise = this.page.waitForEvent("popup");
    await this.page.getByTestId(FORM_SELECTORS.publishPreviewButton).click();
    await this.page.waitForTimeout(2000);
    this.page1 = await previewPromise;
    await this.page1
      .getByTestId(FORM_SELECTORS.formSingleChoiceOption)
      .getByText("No")
      .click();
    await this.page1.waitForTimeout(2000);
    await this.page1.getByTestId(FORM_SELECTORS.startOrSubmitButton).click();
    await this.page1.waitForTimeout(2000);
    await expect(
      this.page1.getByTestId(FORM_SELECTORS.thankYouPageMessage)
    ).toBeVisible();
    await this.page1.close();
    const newPromise = this.page.waitForEvent("popup");
    await this.page.getByTestId(FORM_SELECTORS.publishPreviewButton).click();
    this.page1 = await newPromise;
    await this.page1
      .getByTestId(FORM_SELECTORS.formSingleChoiceOption)
      .getByText(FORM_TEXTS.yes)
      .click();
    await this.page1.waitForTimeout(2000);
    await this.page1.getByTestId(FORM_SELECTORS.startOrSubmitButton).click();
    await this.page1.waitForTimeout(2000);
    await expect(
      this.page1.getByTestId(FORM_SELECTORS.emailTextField)
    ).toBeVisible();
    await this.page1
      .getByTestId(FORM_SELECTORS.emailTextField)
      .fill(FORM_TEXTS.oliverEmail);
    await this.page1.waitForTimeout(2000);
    await this.page1.getByTestId(FORM_SELECTORS.startOrSubmitButton).click();
    await expect(
      this.page1.getByTestId(FORM_SELECTORS.thankYouPageMessage)
    ).toBeVisible();
    await this.page1.close();
  };

  changeConditionalLogic = async () => {
    await this.page.waitForTimeout(2000);
    await this.page
      .getByTestId(FORM_SELECTORS.conditionalLogicDropdown)
      .click();
    await this.page.getByTestId(FORM_SELECTORS.conditionsDisableButton).click();
    const previewPromise = this.page.waitForEvent("popup");
    await this.page.getByTestId(FORM_SELECTORS.publishPreviewButton).click();
    this.page1 = await previewPromise;
    await expect(
      this.page1
        .getByTestId(FORM_SELECTORS.formGroupQuestion)
        .getByText(FORM_TEXTS.emailFieldLabel)
    ).toBeVisible();
    await expect(
      this.page1
        .getByTestId(FORM_SELECTORS.formGroupQuestion)
        .getByText(`${FORM_TEXTS.interestedQuestion}*`)
    ).toBeVisible();
    await this.page1.close();
  };
}
