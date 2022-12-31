const HistoryChat = require("../../models/historyChat");
const User = require("../../models/user");

exports.findById = (id) => HistoryVote.findByPk(id);

exports.create = (firstName, lastName, email, message) => HistoryChat.create({
    firstName: firstName,
    lastName: lastName,
    email: email, 
    message: message,
});

exports.historyChatOfPresentation = (presentationId)=> HistoryChat.findAll({
    where: {
        presentationId: presentationId
    },
    order: [
        [HistoryChat, "created_at", "DESC"]
    ]
});

exports.delete =  (presentationId) => HistoryChat.destroy({
    where: {
        presentationId: presentationId
    }
});