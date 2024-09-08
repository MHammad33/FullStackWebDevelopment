const express = require("express");
const router = express.Router();

const {
  reset
} = require("../controllers/testing.controller");

router.route("/reset").post(reset);

module.exports = router;