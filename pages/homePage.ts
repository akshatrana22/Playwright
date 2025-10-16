import { Locator, Page } from "@playwright/test";
import { BasePage } from "./basePage";

export class HomePage extends BasePage {
  readonly pageSection: Locator;
  constructor(page: Page) {
    const pageSection = page.locator(`.new-home`);
    super(page,pageSection);
    this.pageSection = pageSection
  }
  //make functions for HomePage specific actions
}
