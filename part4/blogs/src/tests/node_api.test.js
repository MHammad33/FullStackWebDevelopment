const { test, after, beforeEach, describe } = require("node:test");
const assert = require("node:assert");
const supertest = require("supertest");
const mongoose = require("mongoose");

const app = require("../app");
const Blog = require("../models/blog.model");
const helper = require("./helper");
const config = require("../utils/config");
const connectDb = require("../db/connectDb");


const api = supertest(app);

describe("Initially some blogs are saved", () => {
  // Delete all blogs and save initial blogs before each test
  beforeEach(async () => {
    await connectDb(config.MONGODB_URI);
    await Blog.deleteMany({});
    await Blog.insertMany(helper.initialBlogs);
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

  describe("Viewing a specific blog", () => {

    test("succeeds with a valid id", async () => {
      const blogsAtStart = await helper.blogsInDb();
      const blogToView = blogsAtStart[0];

      const resultBlog = await api
        .get(`/api/blogs/${blogToView.id}`)
        .expect(200)
        .expect("Content-Type", /application\/json/);

      assert.deepStrictEqual(resultBlog.body, blogToView);
    });

    test("fails with status code 404 if blog does not exist", async () => {
      const validNonExistingId = await helper.nonExistingId();
      await api
        .get(`/api/blogs/${validNonExistingId}`)
        .expect(404);
    });

    test("fails with status code 400 if id is invalid", async () => {
      const invalidId = "5a3d5da59070081a82a3445";
      await api
        .get(`/api/blogs/${invalidId}`)
        .expect(400);
    });
  });

  describe("Adding a new blog", () => {

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

  });

  describe("Deleting a blog", () => {

    test("a blog can be deleted", async () => {
      const blogsAtStart = await helper.blogsInDb();
      const blogToDelete = blogsAtStart[0];

      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .expect(204);

      const blogsAtEnd = await helper.blogsInDb();
      const titles = blogsAtEnd.map(blog => blog.title);

      assert(!titles.includes(blogToDelete.title));
      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1);
    });

    test("fails with status code 404 if blog does not exist", async () => {
      const validNonExistingId = await helper.nonExistingId();
      await api
        .delete(`/api/blogs/${validNonExistingId}`)
        .expect(404);
    }
    );

    test("fails with status code 400 if id is invalid", async () => {
      const invalidId = "5a3d5da59070081a82a3445";
      await api
        .delete(`/api/blogs/${invalidId}`)
        .expect(400);
    });
  });

});




// Close the connection after all tests are done
after(async () => {
  await mongoose.connection.close();
})