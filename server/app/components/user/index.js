const express = require('express');
const router = express.Router();
const userController = require('./userController');
const passport = require("../../passport");
router.use(require('../../middleware/checkToken'));

/* GET home page. */
router.get('/list', passport.authenticate('jwt', { session: false }), userController.list);

router.put('/update', passport.authenticate('jwt', { session: false }), userController.update);

router.put('/update-password', passport.authenticate('jwt', { session: false }), userController.updatePassword);

module.exports = router;
