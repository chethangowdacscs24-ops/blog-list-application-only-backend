const app = require("../app");
const mongoose = require("mongoose");
const supertest = require("supertest");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const { test, after, beforeEach, describe } = require("node:test");
const assert = require("node:assert/strict");
const helper = require("./test_helper");
const api = supertest(app);

describe("testing user routers:", () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash("sekret", 10);
    const user = new User({ username: "root", passwordHash });

    await user.save();
  });

  test("creation of a fresh user succeeds", async () => {
    const usersAtStart = await helper.usersInDB();
    const newUser = {
      username: "cheth",
      password: "cheth@369",
      name: "chethan",
    };

    await api
      .post("/api/users")
      .send(newUser)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await helper.usersInDB();
    assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1);
    const usernames = usersAtEnd.map((u) => u.username);
    assert(usernames.includes(newUser.username));
  });

  after(async () => {
    await mongoose.connection.close();
  });
});
