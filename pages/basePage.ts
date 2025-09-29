import { Locator, Page, expect } from "@playwright/test";

export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  getButtonOrLink(type: "button" | "link", label: string, index?: number) {
    if (type === "button") {
      const buttonLocator = this.page
        .getByText(label)
        .nth(index ?? 0)
        .or(this.page.getByRole("button", { name: label, exact: true }));
      return buttonLocator;
    } else {
      const linkLocator = this.page
        .getByText(label)
        .nth(index ?? 0)
        .or(this.page.getByRole("link", { name: label, exact: true }));
      return linkLocator;
    }
  }

  getTab(label: string) {
    const tabLocator = this.page
      .getByText(label)
      .or(this.page.getByRole("tab", { name: label, exact: true }));
    return tabLocator;
  }
}
