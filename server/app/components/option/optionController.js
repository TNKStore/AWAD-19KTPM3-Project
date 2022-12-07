const optionService = require("./optionService");
const slideService = require("../slide/slideService");

exports.addOption = async (req, res, next) => {
  const slideId = req.body.slideId;
  const position = req.body.position;
  const slide = await slideService.findById(slideId);
  if (!slide) {
    return res.status(404).send({ message: "Slide not found" });
  }
  const option = await optionService.create(position);
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
      return res.status(404).send({ message: "Option not found" });
    }
    await optionService.update(optionList[x].id, optionList[x].content, optionList[x].isCorrect, optionList[x].position);
  }
  const result = await slideService.slideWithOptions(slideId);
  res.status(200).send({ slide: result, message: "Create successfully!" });
};

exports.deleteOption = async (req, res, next) => {
  const slideId = req.params["slideId"];
  const slide = await slideService.findById(slideId);
  if (!slide) {
    return res.status(404).send({ message: "Slide not found" });
  }
  const optionId = req.params["optionId"];
  const option = await optionService.findById(optionId);
  if (!option || !await slide.hasOption(option)) {
    return res.status(404).send({ message: "Option not found" });
  }
  await slideService.delete(slideId);
  return res.status(200).send({ message: "Delete successfully!" });
};