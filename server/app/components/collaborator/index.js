const express = require('express');
const router = express.Router();
const collaboratorController = require('./collaboratorController');
const passport = require("../../passport");
router.use(require('../../middleware/checkToken'));

/* GET home page. */
router.post('/remove', passport.authenticate('jwt', { session: false }), collaboratorController.removeCollaborator);

module.exports = router;

