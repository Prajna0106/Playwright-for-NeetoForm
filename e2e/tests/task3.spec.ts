import { expect } from "@playwright/test";
import { test } from "../fixtures";
test.describe("Form Page", () => {
  test.beforeEach(async ({ page }) => {
    await test.step("Go to dashboard", () => page.goto("/"));
    await test.step("Add a new form", () =>
      page.getByTestId("add-form-button").click());
    await test.step("Start from scratch", () =>
      page.getByTestId("start-from-scratch-button").click());
  });
  test("should be able to apply a theme to the form", async ({ task3Page }) => {
    await test.step("create a form and upload a logo", async () =>
      task3Page.createFormAndApplyTheme());

    await test.step(`Delete the form`, async () => task3Page.deleteForm());
  });

  test("should be able to download submissions", async ({ task3Page }) => {
    await test.step("Create a form with multiple elements", async () =>
      task3Page.createFormWithMultipleElements());

    await test.step("Fill out the form", async () => task3Page.fillTheForm());

    await test.step("Download submissions", async () =>
      task3Page.downloadSubmissions());

    await test.step(`Delete the form`, async () => task3Page.deleteForm());
  });

  test("should be able to pre-fill form using URL parameters", async ({
    task3Page,
  }) => {
    await test.step("Create form with multiple elements and set custom field code", async () =>
      task3Page.createFormWithCustomFieldCode());

    await test.step("Change the URL parameters", async () =>
      task3Page.changeURLParams());

    await test.step("Delete the form", async () => task3Page.deleteForm());
  });
});
