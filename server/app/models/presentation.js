const Sequelize = require('sequelize')
const sequelize = require("../models");
const Slide = require("./slide");

const Presentation = sequelize.define("presentation", {
    presentationName: {
        type: Sequelize.STRING,
        field: 'presentation_name'
    }
}, {
    freezeTableName: true
});

Presentation.hasMany(Slide);
Slide.belongsTo(Presentation);

module.exports = Presentation