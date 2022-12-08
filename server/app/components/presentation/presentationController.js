const userService = require("../user/userService");
const presentationService = require("../presentation/presentationService");
const slideService = require("../slide/slideService");
const optionService = require("../option/optionService");

exports.listPresentation = async (req, res, next) => {
  const userId = req.decoded.user.id;
  const presentationList = await presentationService.listPresentation(userId);
  return res.status(200).send({ presentationList: presentationList });
};

exports.createPresentation = async (req, res, next) => {
  const userId = req.decoded.user.id;
  const user = await userService.findById(userId);
  const number = "0123456789";
  let code = [];
  let allCode = [];
  const presentationList = await presentationService.listPresentation(userId);
  presentationList.forEach((value) => {
    allCode.push(value.code);
  });
  console.log("All code: " + allCode);
  for (let i = 0; i < 6; i++) {
    let index = Math.floor(Math.random() * 10);
    code[i] = number[index];
  }
  while (allCode.indexOf(code.join("")) != -1) {
    for (let i = 0; i < 6; i++) {
      let index = Math.floor(Math.random() * 10);
      code[i] = number[index];
    }
  }
  const { presentationName } = req.body;
  const presentation = await presentationService.create(
    presentationName,
    code.join("")
  );
  await user.addPresentation(presentation);
  const slide = await slideService.create(0);
  await presentation.addSlide(slide);
  const option1 = await optionService.create(0);
  const option2 = await optionService.create(1);
  const option3 = await optionService.create(2);
  await slide.addOptions([option1, option2, option3]);
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
