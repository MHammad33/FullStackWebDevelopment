const { test, after, beforeEach, describe } = require("node:test");
const assert = require("node:assert");
const supertest = require("supertest");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const app = require("../app");
const Blog = require("../models/blog.model");
const User = require("../models/user.model");
const helper = require("./helper");
const config = require("../utils/config");
const connectDb = require("../db/connectDb");


const api = supertest(app);

describe("Initially some blogs are saved and one user in the db", () => {
  let token;

  beforeEach(async () => {

    await connectDb(config.MONGODB_URI);

    // Delete all users and save one user before each test
    await User.deleteMany({});
    const passwordHash = await bcrypt.hash("password", 10);
    const user = new User({ username: "root", passwordHash });
    await user.save();

    // Log in to get a token
    const response = await api.post("/api/login").send({
      username: "root", password: "password"
    });
    token = response.body.token;

    const blogsToAdd = helper.initialBlogs.map(blog => new Blog({
      ...blog,
      user: user._id
    }));

    // Delete all blogs and save initial blogs before each test
    await Blog.deleteMany({});
    await Blog.insertMany(blogsToAdd);
  });

  // Test that the GET request returns the correct status code
  test("blogs are returned as json", async () => {
    await api
      .get("/api/blogs")
      .set("Authorization", `Bearer ${token}`)
      .expect(200)
      .expect("Content-Type", /application\/json/);
    ;
  })

  // Test that the GET request returns the correct number of blog posts
  test("all blogs are returned", async () => {
    const response = await api.get("/api/blogs").set("Authorization", `Bearer ${token}`);
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
        .set("Authorization", `Bearer ${token}`)
        .expect(200)
        .expect("Content-Type", /application\/json/);


      assert.deepStrictEqual(resultBlog.body, blogToView);
    });

    test("fails with status code 404 if blog does not exist", async () => {
      const validNonExistingId = await helper.nonExistingId();
      await api
        .get(`/api/blogs/${validNonExistingId}`)
        .set("Authorization", `Bearer ${token}`)
        .expect(404);
    });

    test("fails with status code 400 if id is invalid", async () => {
      const invalidId = "5a3d5da59070081a82a3445";
      await api
        .get(`/api/blogs/${invalidId}`)
        .set("Authorization", `Bearer ${token}`)
        .expect(400);
    });

    test("fails with status code 401 if token is missing", async () => {
      const blogsAtStart = await helper.blogsInDb();
      const blogToView = blogsAtStart[0];

      await api
        .get(`/api/blogs/${blogToView.id}`)
        .expect(401);
    })
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
        .set("Authorization", `Bearer ${token}`)
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
        .set("Authorization", `Bearer ${token}`)
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
        .set("Authorization", `Bearer ${token}`)
        .send(newBlog)
        .expect(400)
        .expect("Content-Type", /application\/json/);

      const blogsAtEnd = await helper.blogsInDb();
      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length);

    });

    test("fails with status code 401 if token is missing", async () => {
      const newBlog = {
        title: "Test Blog",
        author: "Test Author",
        url: "http://testurl.com",
        likes: 10
      };

      await api
        .post("/api/blogs")
        .send(newBlog).expect(401);
    })

  });

  describe("Deleting a blog", () => {

    test("a blog can be deleted", async () => {
      const blogsAtStart = await helper.blogsInDb();
      const blogToDelete = blogsAtStart[0];

      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .set("Authorization", `Bearer ${token}`)
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
        .set("Authorization", `Bearer ${token}`)
        .expect(404);
    }
    );

    test("fails with status code 400 if id is invalid", async () => {
      const invalidId = "5a3d5da59070081a82a3445";
      await api
        .delete(`/api/blogs/${invalidId}`)
        .set("Authorization", `Bearer ${token}`)
        .expect(400);
    });

    test("fails with status code 401 if token is missing", async () => {
      const blogsAtStart = await helper.blogsInDb();
      const blogToDelete = blogsAtStart[0];

      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .expect(401);
    })
  });

  describe("Updating a blog", () => {

    test("a blog can be updated", async () => {
      const blogsAtStart = await helper.blogsInDb();
      const blogToUpdate = blogsAtStart[0];

      const updatedBlog = {
        ...blogToUpdate,
        likes: 10
      };

      await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send(updatedBlog)
        .set("Authorization", `Bearer ${token}`)
        .expect(200)
        .expect("Content-Type", /application\/json/);

      const blogsAtEnd = await helper.blogsInDb();
      const newUpdatedBlog = blogsAtEnd.find(blog => blog.id === blogToUpdate.id);
      assert.strictEqual(newUpdatedBlog.likes, 10);
    });

    test("fails with status code 404 if blog does not exist", async () => {
      const validNonExistingId = await helper.nonExistingId();
      await api
        .put(`/api/blogs/${validNonExistingId}`)
        .set("Authorization", `Bearer ${token}`)
        .expect(404);
    });

    test("fails with status code 400 if id is invalid", async () => {
      const invalidId = "5a3d5da59070081a82a3445";
      await api
        .put(`/api/blogs/${invalidId}`)
        .set("Authorization", `Bearer ${token}`)
        .expect(400);
    });

    test("fails with status code 401 if token is missing", async () => {
      const blogsAtStart = await helper.blogsInDb();
      const blogToUpdate = blogsAtStart[0];

      await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .expect(401);
    });

  });

});




// Close the connection after all tests are done
after(async () => {
  await mongoose.connection.close();
})