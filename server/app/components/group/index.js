const express = require("express");
const router = express.Router();
const groupController = require("./groupController");
const passport = require("../../passport");
router.use(require("../../middleware/checkToken"));

/* GET home page. */
router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  groupController.createGroup
);

router.get(
  "/invitation-link",
  passport.authenticate("jwt", { session: false }),
  groupController.createInvitationLink
);

router.post(
  "/invite/send",
  passport.authenticate("jwt", { session: false }),
  groupController.inviteToGroup
);

router.post(
  "/invite",
  passport.authenticate("jwt", { session: false }),
  groupController.invite
);

router.get(
  "/list",
  passport.authenticate("jwt", { session: false }),
  groupController.listGroup
);

router.get(
  "/member-of-group",
  passport.authenticate("jwt", { session: false }),
  groupController.listMemberIdOfGroup
);

router.get(
  "/member",
  passport.authenticate("jwt", { session: false }),
  groupController.getMemberOfGroup
);

module.exports = router;
