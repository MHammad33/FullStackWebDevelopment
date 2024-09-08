// @ts-check
import { expect, test, screen } from "@playwright/test";
import { createBlog, createUniqueBlog, loginWith } from "./helper";

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
      await loginWith(page, "hammad", "1122")
      await expect(page.getByText("Hammad Logged in")).toBeVisible();
    })

    test('fails with wrong credentials', async ({ page }) => {
      await loginWith(page, "wrong username", "wrong password");
      await expect(page.getByText("Invalid username or password")).toBeVisible();
    })

  })

  test.describe("When logged in", () => {
    test.beforeEach(async ({ page }) => {
      await loginWith(page, "hammad", "1122");
    })

    test("a new blog can be created", async ({ page }) => {
      const newBlog = { title: "Test Title 1", author: "Test Author 1", url: "testurl1.com" }
      await createBlog(page, newBlog);
      await expect(page.getByText("Test Title 1")).toBeVisible();
    })

    test.describe("When a blog exists", () => {
      test.beforeEach(async ({ page }) => {
        const newBlog = { title: "Test Title 1", author: "Test Author 1", url: "testurl1.com" }
        await createBlog(page, newBlog);
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

      test.describe("Remove Button Visibility", () => {
        test.beforeEach(async ({ page, request }) => {

          await request.post("http://localhost:3000/api/users", {
            data: { username: "user", name: "User", password: "1122" }
          });

          await page.getByRole("button", { name: "logout" }).click();
          await loginWith(page, "user", "1122");
        })

        test("non-author cannot see remove button", async ({ page }) => {
          const locator = page.locator('div').filter({ hasText: "Test Title" });
          await locator.getByRole("button", { name: "view" }).click();
          await expect(locator.getByRole("button", { name: "Remove" })).not.toBeVisible();
        })
      })
    })

    test.describe("When several blogs exists", async () => {
      test.beforeEach(async ({ page }) => {
        for (let i = 0; i < 3; i++) {
          await createBlog(page, createUniqueBlog(i + 1));
        }
      })

      test("blogs are arranged in the order with the most likes first", async ({ page }) => {
        test.slow();

        const blogs = await page.locator(".blog-card").all();
        const titles = ["Blog Title 1", "Blog Title 2", "Blog Title 3"];
        const likes = [1, 4, 3];

        for (let i = 0; i < titles.length; i++) {
          const blog = await page.locator(`.blog-card:has-text("${titles[i]}")`);
          await blog.locator("button:has-text('View')").click();
          for (let j = 0; j < likes[i]; j++) {
            await blog.locator("button:has-text('Like')").click();
          }
        }

        const blogTitles = await page.locator(".blog-card").allTextContents();
        const sortedTitles = [...blogTitles].sort((a, b) => b.likes - a.likes);

        expect(blogTitles).toEqual(sortedTitles);
      })
    })
  })


})
