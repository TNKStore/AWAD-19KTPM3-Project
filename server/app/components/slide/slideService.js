const Slide = require("../../models/slide");
const Option = require("../../models/option");

exports.findById = (id) => Slide.findByPk(id);

exports.listSlideOfPresentation = (presentationId)=> Slide.findAll({
    include: {
        model: Option
    },
    where: {
        presentationId: presentationId
    }   
});

exports.slideWithOptions = (slideId)=> Slide.findOne({
    include: ["options"],
    where: {
        id: slideId
    }   
});

exports.create =  () => Slide.create({
    question: ""
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