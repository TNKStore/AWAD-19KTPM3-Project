const Question = require("../../models/question");
const Sequelize = require('sequelize')

exports.findById = (id) => Question.findByPk(id);

exports.listQuestionOfPresentation = (presentationId)=> Question.findAll({
    where: {
        presentationId: presentationId
    },
    order: [
        ["createdAt", "DESC"]
    ]
});

exports.create = (firstName, lastName, email, content) => Question.create({
    firstName: firstName,
    lastName: lastName,
    email: email,
    content: content
});

exports.upvote = (questionId) => Question.increment('upvote',
    {
        by: 1,
        where: {
            id: questionId,
        }
});


exports.mark = (questionId) => Question.update({
    isAnswered: Sequelize.literal('NOT is_answered')},
    { where: {
        id: questionId
    }
});

exports.delete =  (presentationId) => Question.destroy({
    where: {
        presentationId: presentationId
    }
});