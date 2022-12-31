const Sequelize = require('sequelize')
const sequelize = require(".");
const User = require("./user");
const Option = require("./option");

const HistoryVote = sequelize.define("history_vote", {
    firstName: {
        type: Sequelize.STRING,
        field: 'first_name'
    },
    lastName: {
        type: Sequelize.STRING,
        field: 'last_name'
    },
    email: {
        type: Sequelize.STRING
    },
    presentationId: {
        type: Sequelize.INTEGER,
        field: `presentation_id`
    },
    slideId: {
        type: Sequelize.INTEGER,
        field: `slide_id`
    },
    question: {
        type: Sequelize.STRING,
    },
    option: {
        type: Sequelize.STRING,
    }
}, {
    freezeTableName: true
});

module.exports = HistoryVote