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

// Test that the GET request returns the correct status code
test("blogs are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
  ;
})

// Test that the GET request returns the correct number of blog posts
test("all blogs are returned", async () => {
  const response = await api.get("/api/blogs");
  assert.strictEqual(response.body.length, helper.initialBlogs.length);
})

// Test that the unique identifier property of the blog posts is named id
test("unique identifier property of the blog posts is named id", async () => {
  const res = await helper.blogsInDb();
  const blog = res[0];
  assert(blog.id);
});

// Test that a new blog post can be added
test("a valid blog can be added", async () => {
  const newBlog = {
    title: "Test Blog",
    author: "Test Author",
    url: "http://testurl.com",
    likes: 10
  };

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const blogsAtEnd = await helper.blogsInDb();

  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1);
  assert(blogsAtEnd.some(blog => blog.title === "Test Blog"));
});

// Test that if the likes property is missing from the request, it will default to 0
test("if the likes property is missing from the request, it will default to 0", async () => {
  const newBlog = {
    title: "Test Blog",
    author: "Test Author",
    url: "http://testurl.com"
  };

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const blogsAtEnd = await helper.blogsInDb();
  const blog = blogsAtEnd.find(blog => blog.title === "Test Blog");
  assert.strictEqual(blog.likes, 0);
});

// Test that if title and url properties are missing, response is 400 Bad Request
test("if title and url properties are missing, response is 400 Bad Request", async () => {
  const newBlog = {
    author: "Test Author",
    likes: 10
  };

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(400)
    .expect("Content-Type", /application\/json/);

  const blogsAtEnd = await helper.blogsInDb();
  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length);

});




// Close the connection after all tests are done
after(async () => {
  await mongoose.connection.close();
})