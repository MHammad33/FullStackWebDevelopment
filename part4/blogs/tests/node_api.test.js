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


// Close the connection after all tests
after(() => {
  mongoose.connection.close();
})