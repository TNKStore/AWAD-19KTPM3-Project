const express = require('express');
const router = express.Router();
const groupController = require('./groupController');
const passport = require("../../passport");
router.use(require('../../middleware/checkToken'));

/* GET home page. */
router.post('/create', passport.authenticate('jwt', { session: false }), groupController.createGroup);

router.get('/invitation-link', passport.authenticate('jwt', { session: false }), groupController.createInvitationLink);

router.post('/invite/send', passport.authenticate('jwt', { session: false }), groupController.inviteToGroup);

router.post('/invite', passport.authenticate('jwt', { session: false }), groupController.invite);

module.exports = router;
