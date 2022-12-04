const Sequelize = require('sequelize')
const sequelize = require("../models");
const Option = require("./option");

const Slide = sequelize.define("slide", {
    question: {
        type: Sequelize.STRING
    },
    answer: {
        type: Sequelize.STRING
    }
}, {
    freezeTableName: true
});

Slide.hasMany(Option);
Option.belongsTo(Slide);

module.exports = Slide