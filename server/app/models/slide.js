const Sequelize = require('sequelize')
const sequelize = require("../models");
const Option = require("./option");

const Slide = sequelize.define("slide", {
    question: {
        type: Sequelize.STRING
    },
    position: {
        type: Sequelize.SMALLINT
    }
}, {
    freezeTableName: true
});

Slide.hasMany(Option, {
    onDelete: "CASCADE"
});
Option.belongsTo(Slide);

module.exports = Slide