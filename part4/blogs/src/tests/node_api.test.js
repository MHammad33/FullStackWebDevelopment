const { test, after, beforeEach } = require("node:test");
const assert = require("node:assert");
const supertest = require("supertest");
const mongoose = require("mongoose");

const app = require("../app");
const Blog = require("../models/blog.model");
const helper = require("./helper");
const config = require("../utils/config");
const connectDb = require("../db/connectDb");


const api = supertest(app);

// Delete all blogs and save initial blogs before each test
beforeEach(async () => {
  await connectDb(config.MONGODB_URI);

  console.log("Deleting all blogs");
  await Blog.deleteMany({});

  console.log("Saving initial blogs");
  const blogObjects = helper.initialBlogs.map(blog => new Blog(blog));
  const promiseArray = blogObjects.map(blog => blog.save());
  await Promise.all(promiseArray);
});

test("blogs are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
  ;
})

test("all blogs are returned", async () => {
  const response = await api.get("/api/blogs");
  assert.strictEqual(response.body.length, helper.initialBlogs.length);
})

test("unique identifier property of the blog posts is named id", async () => {
  const res = await helper.blogsInDb();
  const blog = res[0];
  assert(blog.id);
});

// Close the connection after all tests are done
after(async () => {
  await mongoose.connection.close();
})