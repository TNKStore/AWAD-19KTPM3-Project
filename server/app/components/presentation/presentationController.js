const userService = require("../user/userService");
const presentationService = require("../presentation/presentationService");

exports.listPresentation = async (req, res, next) => {
  const userId = req.decoded.user.id;
  const presentationList = await presentationService.listPresentation(userId);
  return res.status(200).send({ presentationList: presentationList });
};

exports.createPresentation = async (req, res, next) => {
  const userId = req.decoded.user.id;
  const user = await userService.findById(userId);
  const { presentationName } = req.body;
  const presentation = await presentationService.create(presentationName);
  await user.addPresentation(presentation);
  res
    .status(200)
    .send({ presentation: presentation, message: "Create successfully!" });
};

exports.deletePresentation = async (req, res, next) => {
  const userId = req.decoded.user.id;
  const user = await userService.findById(userId);
  const presentationId = req.params["id"];
  const presentation = await presentationService.findById(presentationId);
  if (!presentation || !(await user.hasPresentation(presentation))) {
    return res.status(404).send({ message: "Presentation not found" });
  }
  await presentationService.delete(presentationId);
  return res.status(200).send({ message: "Delete successfully!" });
};

exports.updatePresentation = async (req, res, next) => {
  const userId = req.decoded.user.id;
  const user = await userService.findById(userId);
  const { presentationId, presentationName } = req.body;
  const presentation = await presentationService.findById(presentationId);
  if (!presentation || !(await user.hasPresentation(presentation))) {
    return res.status(404).send({ message: "Presentation not found" });
  }
  const response = await presentationService.update(
    presentationId,
    presentationName
  );
  const result = await presentationService.findById(presentationId);
  if (response[0] > 0) {
    res.status(200).json({ msg: "Update successfully!", result });
  } else {
    res.status(400).json({ msg: "Can not update" });
  }
};
