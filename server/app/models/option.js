const Sequelize = require('sequelize')
const sequelize = require("../models");

const Option = sequelize.define("option", {
    content: {
        type: Sequelize.STRING
    },
    isCorrect: {
        type: Sequelize.BOOLEAN,
        field: 'is_correct'
    }
}, {
    freezeTableName: true
});

module.exports = Option