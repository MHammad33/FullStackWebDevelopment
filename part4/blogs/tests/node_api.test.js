const { test, after, beforeEach, describe } = require("node:test");
const assert = require("node:assert");
const mongoose = require("mongoose");
const supertest = require("supertest");
const helper = require("./test_helper");
const app = require("../app");

const api = supertest(app);
const Blog = require("../models/blog");




describe("when there is initially some blogs saved", () => {
  /**
   * @dev Before each test, delete all the blogs in the database and add the initial blogs
   */
  beforeEach(async () => {
    await Blog.deleteMany({});
    await Blog.insertMany(helper.initialBlogs);
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
    * @dev Test to check if all blogs are returned
    */
  test("all blogs are returned", async () => {
    const response = await api.get("/api/blogs");
    assert.strictEqual(response.body.length, helper.initialBlogs.length);
  })


  /**
   * @dev Test to check whether a specific blog is within the returned blogs
   */
  test("a specific blog is within the returned blogs", async () => {
    const response = await api.get("/api/blogs");
    const titles = response.body.map(blog => blog.title);
    assert.ok(titles.includes("Canonical string reduction"));
  });

  /**
   * @dev Testing a specific blog 
   */
  describe("viewing a specific blog", () => {

    /**
     * @dev Test to check if the blog id is valid
     */
    test("succeeds with a valid id", async () => {
      const blogsAtStart = await helper.blogsInDb();
      const blogToView = blogsAtStart[0];

      const response = await api
        .get(`/api/blogs/${blogToView.id}`)
        .expect(200)
        .expect("Content-Type", /application\/json/);

      assert.deepStrictEqual(response.body, blogToView);
    });

    /**
     * @dev Test to check if the blog id is invalid
     */
    test("fails with statuscode 404 if blog does not exist", async () => {
      const validNonexistingId = await helper.nonExistingId();

      await api
        .get(`/api/blogs/${validNonexistingId}`)
        .expect(404);
    });

    /**
     * @dev Test to check if the id is invalid
     */
    test("fails with statuscode 400 if id is invalid", async () => {
      const invalidId = "5a3d5da59070081a82a3445";
      await api
        .get(`/api/blogs/${invalidId}`)
        .expect(400);
    });
  })

  /**
   * @dev Test to check if a blog can be added
   */
  describe("addition of a new blog", () => {
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
     * @dev Test should fail with status code 400 if data is invalid
     */
    test("fails with status code 400 if data is invalid", async () => {
      const newBlog = {
        author: "New Author",
        likes: 10
      }

      // Add the new blog to the database
      await api
        .post("/api/blogs")
        .send(newBlog)
        .expect(400);

      const blogsAtEnd = await helper.blogsInDb();
      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length);
    });


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

  })

  /**
   * @dev Test to check if a blog can be deleted
   */
  describe("deletion of a blog", () => {

    /**
     * @dev Test to check if the blog can be deleted
     */
    test("succeeds with status code 204 if id is valid", async () => {
      const blogsAtStart = await helper.blogsInDb();
      const blogToDelete = blogsAtStart[0];

      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .expect(204);

      const blogsAtEnd = await helper.blogsInDb();
      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1);

      const titles = blogsAtEnd.map(blog => blog.title);
      assert.ok(!titles.includes(blogToDelete.title));
    })
  });

  /**
   * @dev Test to check if a blog can be updated
   */
  describe("updating a blog", () => {

    /**
     * @dev Test to check if a blog can be updated
     */
    test("succeeds with a valid id", async () => {
      const blogsAtStart = await helper.blogsInDb();
      const blogToUpdate = blogsAtStart[0];

      const updatedBlog = {
        likes: 100,
      }

      await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send(updatedBlog)
        .expect(200);

      const blogsAtEnd = await helper.blogsInDb();
      const updatedLikes = blogsAtEnd.map(blog => blog.likes);
      assert.strictEqual(updatedLikes[0], 100);
    })

  })




  // ! End Describe
});


// Close the connection after all tests
after(() => {
  mongoose.connection.close();
})