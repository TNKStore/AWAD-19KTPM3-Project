const Group = require("../../models/group");
const bcrypt = require("bcrypt");
var randomstring = require("randomstring");

// const sgMail = require('@sendgrid/mail')
// sgMail.setApiKey(process.env.SENDGRID_API_KEY)

function hashPassword(password) {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
}

exports.findById = (id) => Group.findByPk(id);

exports.checkActivate = async (user) => {
    return user.activated;
}

exports.verifyPassword = (password, user) => bcrypt.compare(password, user.password)

exports.create = async (groupName) => {
    const invitationString = randomstring.generate();
    return await Group.create({
        groupName: groupName,
        invitationString: invitationString
    })
}

exports.updateInfo = (email, firstName, lastName, address, phone) => User.update({
    firstName: firstName,
    lastName: lastName,
    phone: phone,
    address: address
}, {
    where: {
        email: email
    }
})

exports.updatePassword = (email, pwd) => User.update({
    pwd: hashPassword(pwd)
}, {
    where: {
        email: email
    }
})

exports.updateAddress = (id, address, phone) => User.update({
    address: address,
    phone: phone
}, {
    where: {
        id: id
    }
})