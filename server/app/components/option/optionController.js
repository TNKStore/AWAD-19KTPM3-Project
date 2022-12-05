const optionService = require("./optionService");
const slideService = require("../slide/slideService");

exports.listSlide = async (req, res, next) => {
  const presentationId = req.body.presentationId;
  const slideList = await slideService.listSlideOfPresentation(presentationId);
  return res.status(200).send({ slideList: slideList });
};

exports.createSlide = async (req, res, next) => {
  const slide = await slideService.create();
  return res
    .status(200)
    .send({ slide: slide, message: "Create successfully!" });
};

exports.deleteSlide = async (req, res, next) => {
  const slideId = req.params["id"];
  await slideService.delete(slideId);
  return res.status(200).send({ message: "Delete successfully!" });
};

exports.updateSlide = async (req, res, next) => {
  const { slideId, question, answer } = req.body;
  const response = await slideService.update(slideId, question, answer);
  const slide = await slideService.findById(slideId);
  if(response[0]>0) {
    res.status(200).json({msg: "Update successfully!", slide});
  } else {
    res.status(400).json({msg: "Can not update"});
  } 
};

exports.addOption = async (req, res, next) => {
  const slideId = req.body.slideId;
  const slide = await slideService.findById(slideId);
  if (!slide) {
    return res.status(404).send({ message: "Slide not found" });
  }
  const option = await optionService.create();
  await slide.addOption(option);
  const result = await slideService.slideWithOptions(slideId);
  res.status(200).send({ slide: result, message: "Create successfully!" });
};

exports.updateOption = async (req, res, next) => {
  const { slideId, optionList }  = req.body;
  const slide = await slideService.findById(slideId);
  if (!slide) {
    return res.status(404).send({ message: "Slide not found" });
  }
  for (let x in optionList) {
    const option = await optionService.findById(optionList[x].id);
    if (!option || !await slide.hasOption(option)) {
      console.log(await slide.hasOption(option));
      return res.status(404).send({ message: "Option not found" });
    }
    await optionService.update(optionList[x].id, optionList[x].content, optionList[x].isCorrect);
  }
  const result = await slideService.slideWithOptions(slideId);
  res.status(200).send({ slide: result, message: "Create successfully!" });
};

exports.deleteOption = async (req, res, next) => {
  const slideId = req.params["slideId"];
  const optionId = req.params["optionId"];
  await slideService.delete(slideId);
  return res.status(200).send({ message: "Delete successfully!" });
};

