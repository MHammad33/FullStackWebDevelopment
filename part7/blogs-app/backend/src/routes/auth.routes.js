const express = require("express");
const router = express.Router();

const { loginUser } = require("../controllers/auth.controller");

router.route("/login").post(loginUser);

module.exports = router;
