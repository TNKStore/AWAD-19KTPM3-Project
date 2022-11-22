const Sequelize = require('sequelize')
const sequelize = require("../models");
const User = require("./user");
const Group = require("./group");

const Member = sequelize.define("member", {
    userId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        field: `user_id`
    },
    groupId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        field: `group_id`
    },
    role: {
        type: Sequelize.STRING,
    }
});

User.belongsToMany(Group, { through: Member, foreignKey: `user_id` });
Group.belongsToMany(User, { through: Member, foreignKey: `group_id` });

module.exports = Member