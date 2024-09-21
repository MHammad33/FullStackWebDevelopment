const express = require("express");
const usersRouter = express.Router();

const { getUsers, createUser } = require("../controllers/user.controller");

usersRouter.route("/").get(getUsers).post(createUser);

module.exports = usersRouter;
