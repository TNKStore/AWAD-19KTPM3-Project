const HistoryVote = require("../../models/historyVote");
const User = require("../../models/user");

exports.findById = (id) => HistoryVote.findByPk(id);

exports.create = (firstName, lastName, email, presentationId, slideId, question, option) => HistoryVote.create({
    firstName: firstName,
    lastName: lastName,
    email: email, 
    presentationId: presentationId,
    slideId: slideId,
    question: question,
    option: option
});

exports.historyVoteOfPresentation = (presentationId)=> HistoryVote.findAll({
    where: {
        presentationId: presentationId
    },
    order: [
        ["createdAt", "DESC"]
    ]
});

exports.delete =  (presentationId) => HistoryVote.destroy({
    where: {
        presentationId: presentationId
    }
});