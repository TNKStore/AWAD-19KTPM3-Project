const Sequelize = require('sequelize')
const sequelize = require("../models");
const Option = require("./option");

const Slide = sequelize.define("slide", {
    question: {
        type: Sequelize.STRING
    }
}, {
    freezeTableName: true
});

Slide.hasMany(Option, {
    onDelete: "CASCADE"
});
Option.belongsTo(Slide);

module.exports = Slide