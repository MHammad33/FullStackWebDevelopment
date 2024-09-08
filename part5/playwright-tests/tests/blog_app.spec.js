// @ts-check
import { expect, test } from "@playwright/test";

test.describe("Blog app", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:5173")
  });

  test("Login form is shown", async ({ page }) => {
    await expect(page.locator('#root')).toContainText('Log in to application');
    await expect(page.locator('form')).toContainText('Username');
    await expect(page.locator('form')).toContainText('Password');
    await expect(page.getByRole('button')).toContainText('Login');
  })
})
