const { test, describe, beforeEach, after } = require("node:test");
const assert = require("node:assert");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const supertest = require("supertest");

const app = require("../app");
const api = supertest(app);
const User = require("../models/user.model");
const config = require("../utils/config");

const connectDb = async () => {
  await mongoose.connect(config.MONGODB_URI);
};
connectDb();

describe("Test Users. Initially One User in Db", () => {
  // Set up the database in a known state before each test
  beforeEach(async () => {
    await User.deleteMany({});
    const passwordHash = await bcrypt.hash("password", 10);
    const user = new User({ username: "root", passwordHash });
    await user.save();
  });

  test("GET /api/users returns one user", async () => {
    const users = await User.find({});
    assert.strictEqual(users.length, 1);
  });

  test("POST /api/users creates a new user", async () => {
    const newUser = {
      username: "newuser",
      name: "New User",
      password: "newpassword",
    };

    await api
      .post("/api/users")
      .send(newUser)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const users = await User.find({});
    assert.strictEqual(users.length, 2);
  });

  test("POST /api/users with short password returns 400", async () => {
    const newUser = {
      username: "newuser",
      name: "New User",
      password: "12",
    };

    await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    const users = await User.find({});
    assert.strictEqual(users.length, 1);
  });

  test("POST /api/users with missing password returns 400", async () => {
    const newUser = {
      username: "newuser",
      name: "New User",
    };

    await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    const users = await User.find({});
    assert.strictEqual(users.length, 1);
  });

  test("POST /api/users with short username returns 400", async () => {
    const newUser = {
      username: "ro",
      name: "Root User",
      password: "rootpassword",
    };

    await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    const users = await User.find({});
    assert.strictEqual(users.length, 1);
  })

  test("POST /api/users with existing username returns 400", async () => {
    const newUser = {
      username: "root",
      name: "Root User",
      password: "rootpassword",
    };

    await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    const users = await User.find({});
    assert.strictEqual(users.length, 1);
  });


});

after(async () => {
  await mongoose.connection.close();
});


