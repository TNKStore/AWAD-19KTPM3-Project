const presentationService = require("../presentation/presentationService");
const collaboratorService = require("./collaboratorService");
const { result } = require("lodash");
const createError = require("http-errors");

exports.removeCollaborator = async (req, res, next) => {
  const { presentationId, collaboratorId } = req.body;
  const userId = req.decoded.user.id;
  const remover = await collaboratorService.findCollaboratorInPresentation(
    presentationId,
    userId
  );
  const collaborator = await collaboratorService.findCollaboratorInPresentation(
    presentationId,
    collaboratorId
  );
  if (!collaborator || !remover) {
    return res.status(404).send({ message: "Collaborator not found" });
  }
  if (remover.role !== "Owner" || userId === collaboratorId) {
    return res
      .status(400)
      .send({ message: "Cannot remove selected collaborator" });
  }

  await collaboratorService.removeCollaborator(presentationId, collaboratorId);

  const presentation =
    await presentationService.findPresentationWithCollaborator(presentationId);
  return res.status(200).send({ presentation: presentation });
};
