const Sequelize = require('sequelize')
const sequelize = require(".");

const Question = sequelize.define("question", {
    firstName: {
        type: Sequelize.STRING,
        field: 'first_name'
    },
    lastName: {
        type: Sequelize.STRING,
        field: 'last_name'
    },
    email: {
        type: Sequelize.STRING
    }, 
    content: {
        type: Sequelize.STRING,
    },
    upvote: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
    isAnswered: {
        type: Sequelize.BOOLEAN,
        field: 'is_answered',
        defaultValue: false
    }
}, {
    freezeTableName: true
});

module.exports = Question