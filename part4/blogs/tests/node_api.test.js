const { test, after, beforeEach } = require("node:test");
const assert = require("node:assert");
const mongoose = require("mongoose");
const supertest = require("supertest");
const helper = require("./test_helper");
const app = require("../app");

const api = supertest(app);
const Blog = require("../models/blog");


/**
 * @dev Before each test, delete all the blogs in the database and add the initial blogs
 * @notice This is done to ensure that the tests are run on a clean database
 */
beforeEach(async () => {
  await Blog.deleteMany({});

  // Promise array to save all the blogs in the database
  const blogObjects = helper.initialBlogs.map(blog => new Blog(blog));
  const promiseArray = blogObjects.map(blog => blog.save());

  // Wait for all the promises to resolve
  await Promise.all(promiseArray);
});

/**
 * @dev Test to check if the blogs are returned as json
 */
test("blogs are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
})

/**
 * @dev Test to check if two blogs are returned
 */
test("there are two blogs", async () => {
  const response = await api.get("/api/blogs");
  assert.strictEqual(response.body.length, 2);
})

test("id is defined in the blog schema", async () => {
  const response = await api.get("/api/blogs");
  const result = response.body.map(blog => blog.id);

  // Check if the id is defined
  assert.ok(result[0]);
})

/**
 * @dev Test to check if a blog can be added
*/
test("a valid blog can be added", async () => {
  const newBlog = {
    title: "New Blog",
    author: "New Author",
    url: "newblog.com",
    likes: 10
  }

  // Add the new blog to the database
  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  // verify that the content of the blog post is saved correctly to the database.
  const blogsAtEnd = await helper.blogsInDb();
  const titles = blogsAtEnd.map(blog => blog.title);
  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1);
  assert.ok(titles.includes("New Blog"));
})

/**
 * @dev Test to check if the likes property is missing from the request
 */

test("if the likes property is missing, it will default to 0", async () => {
  const newBlog = {
    title: "New Blog",
    author: "New Author",
    url: "newblog.com"
  }

  // Add the new blog to the database
  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  // Check if the likes property is set to 0
  const blogsAtEnd = await helper.blogsInDb();
  const likes = blogsAtEnd.map(blog => blog.likes);
  assert.strictEqual(likes[likes.length - 1], 0);
})

/**
 * @dev Test to check if the title and url properties are missing from the request
 */
test("if the title and url properties are missing, return 400 Bad Request", async () => {
  const newBlog = {
    author: "New Author",
    likes: 10
  }

  // Add the new blog to the database
  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(400);
})

// Close the connection after all tests
after(() => {
  mongoose.connection.close();
})