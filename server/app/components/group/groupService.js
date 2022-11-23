const Group = require("../../models/group");
const bcrypt = require("bcrypt");
var randomstring = require("randomstring");

exports.findById = (id) => Group.findByPk(id);

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