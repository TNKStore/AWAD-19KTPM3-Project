const Sequelize = require('sequelize')
const sequelize = require("../models");

const Option = sequelize.define("option", {
    content: {
        type: Sequelize.STRING
    }
}, {
    freezeTableName: true
});

module.exports = Option