const Sequelize = require('sequelize')
const sequelize = require(".");
const User = require("./user");
const Presentation = require("./presentation");

const Collaborator = sequelize.define("collaborator", {
    userId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        field: `user_id`
    },
    presentationId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        field: `presentation_id`
    },
    role: {
        type: Sequelize.STRING,
    }
}, {
    freezeTableName: true
});

Presentation.belongsToMany(User, { through: Collaborator, foreignKey: `presentation_id` });
User.belongsToMany(Presentation, { through: Collaborator, foreignKey: `user_id` });

module.exports = Collaborator