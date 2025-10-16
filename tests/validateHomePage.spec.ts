import { test, expect } from "../fixture/application_fixture";
import { HomePage } from "../pages/homePage";
import { TalkToUsPage } from "../pages/talkToUsPage";
import testData from "../testData/testData.json";

test.describe("Home page validation", () => {
  test(
    "Validate elements in HomePage are visible",
    { tag: "@MR-01" },
    async ({ page }) => {
      const homePage = new HomePage(page);
      await test.step("Validate 'Menu' link is visible", async () => {
        await expect(homePage.getButtonOrLink("link", "Menu")).toBeVisible();
      });
      await test.step("Validate 'Home' link is visible", async () => {
        await expect(homePage.getButtonOrLink("button", "Home")).toBeVisible();
      });
      await test.step("Validate 'About us' link is visible", async () => {
        await expect(
          homePage.getButtonOrLink("link", "About Us")
        ).toBeVisible();
      });
      await test.step("Validate 'Talk to us' button is visible", async () => {
        await expect(
          homePage.getButtonOrLink("button", "Talk to us")
        ).toBeVisible();
      });
      await test.step("Validate user can click on Customer care link and fill the form", async () => {
        await expect(
          homePage.getButtonOrLink("link", "Customer Care")
        ).toBeVisible();
      });
    }
  );
  test(
    "Validate user can click on customter care and fill the details",
    { tag: "@MR-02" },
    async ({ page }) => {
      const data = testData["MR-01"];
      const homePage = new HomePage(page);
      const [customerCarePage] = await Promise.all([
        page.context().waitForEvent("page"),
        homePage.getButtonOrLink("link", "Customer Care").click(),
      ]);
      const talkToUsPage = new TalkToUsPage(customerCarePage);
      expect(customerCarePage).toHaveTitle("Talk To Us!");
      await expect(talkToUsPage.pageSection).toBeVisible();
      await talkToUsPage.talkToUsForm.fillFormInput([
        { label: "Mobile Number", value: data.mobile, inputField: true },
        { label: "Name", value: data.Name, inputField: true },
        { label: "Email", value: data.email, inputField: true },
        { label: "Service", radio: true, value: data.service },
        {
          label: "Remarks/Comments (Up to 1000 words):",
          value: data.remarks,
          inputField: true,
        },
        { label: "Salutation", value: data.salutation, dropDown: true },
        {
          label: "Please select the type of feedback:",
          value: data.feedback,
          dropDown: true,
        },
      ]);
   }
  );
});
