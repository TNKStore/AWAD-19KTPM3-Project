const express = require("express");
const router = express.Router();
const optionController = require("./optionController");
const passport = require("../../passport");
router.use(require("../../middleware/checkToken"));

module.exports = router;
