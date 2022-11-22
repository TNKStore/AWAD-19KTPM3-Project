const Sequelize = require('sequelize')
const sequelize = require("../models");

const Group = sequelize.define("group", {
    groupName: {
        type: Sequelize.STRING,
        field: 'group_name'
    },
    invitationString: {
        type: Sequelize.STRING,
        field: 'invitation_string'
    }
});

module.exports = Group