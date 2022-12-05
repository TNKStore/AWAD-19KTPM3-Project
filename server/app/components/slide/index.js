const express = require("express");
const router = express.Router();
const slideController = require("./slideController");
const optionController = require("../option/optionController");
const passport = require("../../passport");
router.use(require("../../middleware/checkToken"));

/* GET home page. */
router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  slideController.createSlide
);

router.get(
  "/list",
  passport.authenticate("jwt", { session: false }),
  slideController.listSlide
);

router.post(
  "/update",
  passport.authenticate("jwt", { session: false }),
  slideController.updateSlide
);

router.delete(
  ":presentationId/slide/:slideId",
  passport.authenticate("jwt", { session: false }),
  slideController.deleteSlide
);

router.post(
  "/add-option",
  passport.authenticate("jwt", { session: false }),
  optionController.addOption
);

router.post(
  "/update-option",
  passport.authenticate("jwt", { session: false }),
  optionController.updateOption
);

router.delete(
  ":slideId/option/:optionId",
  passport.authenticate("jwt", { session: false }),
  optionController.deleteOption
);

module.exports = router;
