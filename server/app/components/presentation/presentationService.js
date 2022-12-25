const Presentation = require("../../models/presentation");
const User = require("../../models/user");

exports.findById = (id) => Presentation.findByPk(id);

exports.listPresentation = (userId)=> Presentation.findAll({
    raw: true,
    nest: true,
    include: {
        model: User,
        attributes: ['id', 'firstName', 'lastName', 'email'],
        through: {
            attributes: ['role']
        },
        where: {
            id: userId
        }
    }  
});

exports.findPresentationWithCollaborator = (id) => Presentation.findOne({ 
    where: { id: id },
    include: {
        model: User,
        attributes: ['id', 'firstName', 'lastName', 'email'],
        through: {
            attributes: ['role']
        }
    } 
});

exports.create =  (presentationName, code) => Presentation.create({
    presentationName: presentationName,
    code: code
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