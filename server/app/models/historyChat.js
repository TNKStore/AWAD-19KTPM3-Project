const Sequelize = require('sequelize')
const sequelize = require(".");

const HistoryChat = sequelize.define("history_chat", {
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
    content: {
        type: Sequelize.STRING
    }
}, {
    freezeTableName: true
});

module.exports = HistoryChat