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

  test.describe("When logged in", () => {
    test.beforeEach(async ({ page }) => {
      await page.getByTestId("test-username").fill("hammad");
      await page.getByTestId("test-password").fill("1122");
      await page.getByRole("button", { name: /login/i }).click();
      await page.waitForLoadState('networkidle');
    })

    test("a new blog can be created", async ({ page }) => {
      await page.getByRole("button", { name: "New Blog" }).click();
      await page.getByTestId("title").fill("test title");
      await page.getByTestId("author").fill("test author");
      await page.getByTestId("url").fill("test http://www.url.com");
      await page.getByRole("button", { name: "Add Blog" }).click();

      await expect(page.getByText("test title")).toBeVisible();

    })

    test.describe("When a blog exists", () => {
      test.beforeEach(async ({ page }) => {
        await page.getByRole("button", { name: "New Blog" }).click();
        await page.getByTestId("title").fill("test title");
        await page.getByTestId("author").fill("test author");
        await page.getByTestId("url").fill("test http://www.url.com");
        await page.getByRole("button", { name: "Add Blog" }).click();
      })

      test("a blog can be liked", async ({ page }) => {
        await page.getByRole("button", { name: "View" }).click();
        await page.getByRole("button", { name: "Like" }).click();
        await expect(page.getByText("1 likes")).toBeVisible();
      })

      test("a blog can be deleted", async ({ page }) => {
        await page.getByRole("button", { name: "View" }).click();
        page.once("dialog", async (dialog) => {
          await dialog.accept();
        });
        await page.getByRole("button", { name: "Remove" }).click();
        await expect(page.getByText("test title")).not.toBeVisible();
      })
    })
  })
})
