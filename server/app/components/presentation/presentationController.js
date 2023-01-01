const userService = require("../user/userService");
const presentationService = require("../presentation/presentationService");
const slideService = require("../slide/slideService");
const optionService = require("../option/optionService");
const collaboratorService = require("../collaborator/collaboratorService");

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
  await presentation.addUser(user, { through: { role: "Owner" } });
  const slide = await slideService.create(0);
  await presentation.addSlide(slide);
  const option1 = await optionService.create(0);
  const option2 = await optionService.create(1);
  const option3 = await optionService.create(2);
  await slide.addOptions([option1, option2, option3]);
  const result = await presentationService.findPresentationWithCollaborator(
    presentation.id
  );
  res
    .status(200)
    .send({ presentation: result, message: "Create successfully!" });
};

exports.deletePresentation = async (req, res, next) => {
  const userId = req.decoded.user.id;
  const presentationId = req.params["id"];
  const presentation = await presentationService.findById(presentationId);
  if (!presentation) {
    return res.status(404).send({ message: "Presentation not found" });
  }
  const collaborator = await collaboratorService.findCollaboratorInPresentation(
    presentationId,
    userId
  );
  if (!collaborator) {
    return res.status(404).send({ message: "Collaborator not found" });
  }
  if (!collaborator.role === "Owner") {
    return res.status(400).send({ message: "Cannot delete presentation" });
  }
  await presentationService.delete(presentationId);
  return res.status(200).send({ message: "Delete successfully!" });
};

exports.updatePresentation = async (req, res, next) => {
  const userId = req.decoded.user.id;
  const { presentationId, presentationName } = req.body;
  const presentation = await presentationService.findById(presentationId);
  if (!presentation) {
    return res.status(404).send({ message: "Presentation not found" });
  }
  const collaborator = await collaboratorService.findCollaboratorInPresentation(
    presentationId,
    userId
  );
  if (!collaborator) {
    return res.status(404).send({ message: "Collaborator not found" });
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

exports.getCollaboratorOfPresentation = async (req, res, next) => {
  const presentationId = req.params["id"];
  const presentation =
    await presentationService.findPresentationWithCollaborator(presentationId);
  return res.status(200).send({ presentation: presentation });
};

exports.addCollaborator = async (req, res, next) => {
  const userId = req.decoded.user.id;
  const { presentationId, email } = req.body;
  const presentation = await presentationService.findById(presentationId);
  if (!presentation) {
    return res.status(404).send({ message: "Presentation not found" });
  }
  const collaborator = await collaboratorService.findCollaboratorInPresentation(
    presentationId,
    userId
  );
  if (!collaborator) {
    return res.status(404).send({ message: "Collaborator not found" });
  }
  if (!collaborator.role === "Owner") {
    return res.status(400).send({ message: "Cannot add collaborator" });
  }
  const user = await userService.findByEmailForAdding(email);
  if (!user) {
    return res.status(404).send({ message: "User not found" });
  }
  await presentation.addUser(user, { through: { role: "Editor" } });
  return res
    .status(200)
    .send({ error: false, message: "Add collaborator successfully!" });
};
