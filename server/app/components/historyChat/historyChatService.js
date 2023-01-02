const HistoryChat = require("../../models/historyChat");
const User = require("../../models/user");

exports.findById = (id) => HistoryVote.findByPk(id);

exports.create = (firstName, lastName, email, content) => HistoryChat.create({
    firstName: firstName,
    lastName: lastName,
    email: email, 
    content: content,
});

exports.historyChatOfPresentation = (presentationId)=> HistoryChat.findAll({
    where: {
        presentationId: presentationId
    },
    order: [
        ["createdAt", "ASC"]
    ]
});

exports.delete =  (presentationId) => HistoryChat.destroy({
    where: {
        presentationId: presentationId
    }
});