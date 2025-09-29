import { Locator, Page } from "@playwright/test";
import { BasePage } from "./basePage";
import { BaseForm } from "./baseForm";

export class TalkToUsPage extends BasePage {
  readonly pageSection: Locator;
  readonly talkToUsForm: BaseForm;
  constructor(page: Page) {
    super(page);
    this.pageSection = page.locator(`#divForm`);
    this.talkToUsForm = new BaseForm(page, this.pageSection);
  }
}
