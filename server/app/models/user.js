const {DataTypes} = require('sequelize');

module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
        firstName: {
            type: Sequelize.STRING,
            field: 'first_name'
        },
        lastName: {
            type: Sequelize.STRING,
            field: 'last_name'
        },
        email: {
            type: Sequelize.STRING,
            unique: true
        },
        password: {
            type: Sequelize.STRING
        },
        phone: {
            type: Sequelize.STRING
        },
        address: {
            type: Sequelize.STRING
        },
        activated: {
            type: Sequelize.BOOLEAN
        },
        activationString: {
            type: Sequelize.STRING,
            field: 'activation_string'
        }
    });
  
    return User;
};