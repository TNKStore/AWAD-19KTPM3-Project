const express = require('express');
const router = express.Router();
const groupController = require('./groupController');
const passport = require("../../passport");
router.use(require('../../middleware/checkToken'));

/* GET home page. */
router.post('/create', passport.authenticate('jwt', { session: false }), groupController.createGroup);

module.exports = router;
