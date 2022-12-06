const express = require("express");
const router = express.Router();
const presentationController = require("./presentationController");
const slideController = require("../slide/slideController");
const passport = require("../../passport");
router.use(require("../../middleware/checkToken"));

/* GET home page. */
router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  presentationController.createPresentation
);

router.get(
  "/list",
  passport.authenticate("jwt", { session: false }),
  presentationController.listPresentation
);

router.post(
  "/update",
  passport.authenticate("jwt", { session: false }),
  presentationController.updatePresentation
);

router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  presentationController.deletePresentation
);

router.delete(
  ":presentationId/slide/:slideId",
  passport.authenticate("jwt", { session: false }),
  slideController.deleteSlide
);

module.exports = router;
