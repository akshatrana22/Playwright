import { Locator, Page, expect } from "@playwright/test";

export class BasePage {
  readonly baseSelector: Locator;

  constructor(page: Page, baseSection: Locator) {
    this.baseSelector = baseSection;
  }

  public getButtonOrLink(type: "button" | "link", label: string, index?: number) {
    if (type === "button") {
      const buttonLocator = this.baseSelector
        .getByText(label)
        .nth(index ?? 0)
        .or(this.baseSelector.getByRole("button", { name: label, exact: true }));
      return buttonLocator;
    } else {
      const linkLocator = this.baseSelector
        .getByText(label)
        .nth(index ?? 0)
        .or(this.baseSelector.getByRole("link", { name: label, exact: true }));
      return linkLocator;
    }
  }

  public getTab(label: string) {
    const tabLocator = this.baseSelector
      .getByText(label)
      .or(this.baseSelector.getByRole("tab", { name: label, exact: true }));
    return tabLocator;
  }
}
