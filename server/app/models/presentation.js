const Sequelize = require('sequelize')
const sequelize = require("../models");
const Slide = require("./slide");
const HistoryChat = require("./historyChat");
const Question = require("./question");

const Presentation = sequelize.define("presentation", {
    presentationName: {
        type: Sequelize.STRING,
        field: 'presentation_name'
    },
    code: {
        type: Sequelize.STRING,
        unique: true
    }
}, {
    freezeTableName: true
});

Presentation.hasMany(Slide, {
    onDelete: "CASCADE"
});
Slide.belongsTo(Presentation);

Presentation.hasMany(HistoryChat, {
    onDelete: "CASCADE"
});
HistoryChat.belongsTo(Presentation);

Presentation.hasMany(Question, {
    onDelete: "CASCADE"
});
Question.belongsTo(Presentation);

module.exports = Presentation