const Presentation = require("../../models/presentation");

exports.findById = (id) => Presentation.findByPk(id);

exports.listPresentation = (userId)=> Presentation.findAll({
    where: {
        userId: userId
    }   
});

exports.create =  (presentationName) => Presentation.create({
    presentationName: presentationName
});

exports.update =  (presentationId, presentationName) => Slide.update({
    presentationName: presentationName,
    },
    {
        where: {
            id: presentationId,
        }
});

exports.delete =  (presentationId) => Presentation.destroy({
    where: {
        id: presentationId
    }
});