import { Locator, Page } from "@playwright/test";
import { BasePage } from "./basePage";

export class HomePage extends BasePage {
  readonly pageSection: Locator;
  constructor(page: Page) {
    super(page);
    this.pageSection = page.locator(`.new-home`);
  }
  //make functions for HomePage specific actions
}
