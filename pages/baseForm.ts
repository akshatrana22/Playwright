import { Locator, Page } from "@playwright/test";

export class BaseForm {
  readonly formSection: Locator;
  readonly page: Page;

  constructor(page: Page, formSelector: Locator) {
    this.formSection = formSelector;
    this.page = page;
  }

  public async fillFormInput(
    inputs: {
      label: string;
      value: string;
      checkBox?: boolean;
      dropDown?: boolean;
      radio?: boolean;
      inputField?: boolean;
    }[]
  ): Promise<void> {
    for (const {
      label,
      value,
      checkBox,
      dropDown,
      radio,
      inputField,
    } of inputs) {
      if (checkBox) {
      } else if (dropDown) {
        const dropdown = this.formSection
          .locator(`div[field-step="1"]`)
          .filter({ hasText: label })
          .getByRole("combobox");
        if ((await dropdown.count()) < 1) {
          throw new Error(`Field ${label} not found`);
        }
        await dropdown.waitFor({ state: "visible" });
        await dropdown.click();
        const option = this.page.getByRole("option", { name: value });
        if ((await option.count()) < 1) {
          throw new Error(`Option ${value} not found`);
        }
        await option.click();
      } else if (radio) {
        const radioLocator = this.formSection.getByRole("radio", {
          name: label,
        });
        if ((await radioLocator.count()) < 1) {
          throw new Error(`Field ${label} not found`);
        }
        await radioLocator.click();
      } else if (inputField) {
        const inputLocator = this.formSection
          .locator(".form-floating")
          .getByPlaceholder(label)
          .or(
            this.formSection
              .locator(`div[field-step="1"]`)
              .filter({ hasText: label })
              .locator("textarea")
          );
        if ((await inputLocator.count()) < 1) {
          throw new Error(`Field ${label} not found as input locator value is ${inputLocator}`);
        }
        await inputLocator.waitFor({ state: "visible" });
        await inputLocator.pressSequentially(value, { delay: 200 });
      }
    }
  }
}
