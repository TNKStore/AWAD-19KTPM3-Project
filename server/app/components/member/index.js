const express = require('express');
const router = express.Router();
const memberController = require('./memberController');
const passport = require("../../passport");
router.use(require('../../middleware/checkToken'));

/* GET home page. */
router.post('/update-role', passport.authenticate('jwt', { session: false }), memberController.updateMember);

module.exports = router;

