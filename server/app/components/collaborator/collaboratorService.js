const Collaborator = require("../../models/collaborator");

exports.findCollaboratorInPresentation = (presentationId, collaboratorId) => Collaborator.findOne({ 
    where: {
        presentationId: presentationId,
        user_id: collaboratorId
    }
})

exports.removeCollaborator = (presentationId, collaboratorId) => Collaborator.destroy({
    where: {
        groupId: presentationId,
        user_id: collaboratorId
    }
})