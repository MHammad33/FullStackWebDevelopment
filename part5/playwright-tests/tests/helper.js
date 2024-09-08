// @ts-check
const loginWith = async (page, username, password) => {
  await page.getByTestId("test-username").fill(username);
  await page.getByTestId("test-password").fill(password);
  await page.getByRole("button", { name: /login/i }).click();
  await page.waitForLoadState('networkidle');
};

const createBlog = async (page, blog) => {
  await page.getByRole("button", { name: "New Blog" }).click();
  await page.getByTestId("title").fill(blog.title);
  await page.getByTestId("author").fill(blog.author);
  await page.getByTestId("url").fill(blog.url);
  await page.getByRole("button", { name: "Add Blog" }).click();
  await page.getByText(blog.title).waitFor();
}

module.exports = {
  loginWith, createBlog
}