import { expect, test as base, Page } from "@playwright/test";

const test = base.extend<{ page: Page }>({
  page: async ({ page }, use) => {
    await page.goto("https://subway.in/");
    await expect(page).toHaveTitle("Subway");
    await collapseDisclaimer(page);
    await use(page);
  },
});

async function collapseDisclaimer(page: Page): Promise<void> {
  const modal = page.locator(".MuiPaper-root");
  if (await modal.isVisible()) {
    const closeButton = page.locator('button[aria-label="close"]');
    await expect(closeButton).toBeVisible();
    await closeButton.click();
    await expect(modal).toBeHidden();
  }
}

export { test, expect };
