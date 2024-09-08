// @ts-check
import { expect, test } from "@playwright/test";

test.describe("Blog app", () => {
  test.beforeEach(async ({ page, request }) => {
    await request.post("http://localhost:3000/api/tests/reset");
    await request.post("http://localhost:3000/api/users", {
      data: {
        username: "hammad",
        name: "Hammad",
        password: "1122"
      }
    });
    await page.goto("http://localhost:5173")
  });

  test("Login form is shown", async ({ page }) => {
    await expect(page.locator('#root')).toContainText('Log in to application');
    await expect(page.locator('form')).toContainText('Username');
    await expect(page.locator('form')).toContainText('Password');
    await expect(page.getByRole('button')).toContainText('Login');
  })

  test.describe("Login", () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await page.getByTestId("test-username").fill("hammad");
      await page.getByTestId("test-password").fill("1122");
      await page.getByRole("button", { name: /login/i }).click();
      await page.waitForLoadState('networkidle');
      await expect(page.getByText("Hammad Logged in")).toBeVisible();
    })

    test('fails with wrong credentials', async ({ page }) => {
      await page.getByTestId("test-username").fill("test");
      await page.getByTestId("test-password").fill("wrong password");
      await page.getByRole("button", { name: /login/i }).click();
      await expect(page.getByText("Invalid username or password")).toBeVisible();
    })
  })
})
