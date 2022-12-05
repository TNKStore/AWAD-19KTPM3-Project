const Presentation = require("../../models/presentation");

exports.findById = (id) => Presentation.findByPk(id);

exports.create =  (presentationName) => Presentation.create({
    presentationName: presentationName
});

exports.update =  (slideId, question) => Slide.update({
    question: question,
    },
    {
        where: {
            id: slideId,
        }
});

exports.delete =  (slideId) => Slide.destroy({
    where: {
        id: slideId
    }
});