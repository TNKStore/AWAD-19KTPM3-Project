const Slide = require("../../models/slide");
const Option = require("../../models/option");

exports.findById = (id) => Slide.findByPk(id);

exports.listSlideOfPresentation = (presentationId)=> Slide.findAll({
    include: {
        model: Option
    },
    where: {
        presentationId: presentationId
    },
    order: [
        [Option, "id", "ASC"]
    ]
});

exports.slideWithOptions = (slideId)=> Slide.findOne({
    include: {
        model: Option
    },
    where: {
        id: slideId
    }   
});

exports.create =  (position) => Slide.create({
    question: "",
    position: position
});

exports.update =  (slideId, question, position) => Slide.update({
    question: question,
    position: position
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