const Sequelize = require('sequelize')
const sequelize = require("../models");
const Slide = require("./slide");

const Presentation = sequelize.define("presentation", {
    presentationName: {
        type: Sequelize.STRING,
        field: 'presentation_name'
    },
    code: {
        type: Sequelize.INTEGER
    }
}, {
    freezeTableName: true
});

Presentation.hasMany(Slide, {
    onDelete: "CASCADE"
});
Slide.belongsTo(Presentation);

module.exports = Presentation