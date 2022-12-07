const slideService = require("./slideService");
const optionService = require("../option/optionService");
const presentationService = require("../presentation/presentationService");

exports.listSlide = async (req, res, next) => {
  const presentationId = req.query["presentationId"];
  const slideList = await slideService.listSlideOfPresentation(presentationId);
  return res.status(200).send({ slideList: slideList });
};

exports.createSlide = async (req, res, next) => {
  const presentation = await presentationService.findById(req.body.presentationId);
  if (!presentation) {
    return res.status(404).send({ message: "Presentation not found" });
  }
  const slide = await slideService.create(req.body.position);
  await presentation.addSlide(slide);
  const option1 = await optionService.create(1);
  const option2 = await optionService.create(2);
  const option3 = await optionService.create(3);
  await slide.addOptions([option1, option2, option3]);
  const result = await slideService.slideWithOptions(slide.id);
  res.status(200).send({ slide: result, message: "Create successfully!" });
};

exports.deleteSlide = async (req, res, next) => {
  const presentationId = req.params["presentationId"];
  const presentation = await presentationService.findById(presentationId);
  if (!presentation) {
    return res.status(404).send({ message: "Presentationpresentation not found" });
  }
  const optionId = req.params["optionId"];
  const option = await optionService.findById(optionId);
  if (!option || !await slide.hasOption(option)) {
    return res.status(404).send({ message: "Option not found" });
  }
  const slideId = req.params["slideId"];
  await slideService.delete(slideId);
  return res.status(200).send({ message: "Delete successfully!" });
};

exports.updateSlide = async (req, res, next) => {
  const { presentationId, slideId, question, position } = req.body;
  const presentation = await presentationService.findById(presentationId);
  if (!presentation) {
    return res.status(404).send({ message: "Presentation not found" });
  }
  const slide = await slideService.findById(slideId);
  if (!slide || !await presentation.hasSlide(slide)) {
    return res.status(404).send({ message: "Slide not found" });
  }
  const response = await slideService.update(slideId, question, position);
  const result = await slideService.slideWithOptions(slideId);
  if(response[0]>0) {
    res.status(200).json({msg: "Update successfully!", result});
  } else {
    res.status(400).json({msg: "Can not update"});
  } 
};


