const Group = require("../../models/group");
const User = require("../../models/user");
var randomstring = require("randomstring");

exports.findById = (id) => Group.findByPk(id);

exports.create = async (groupName) => {
    const invitationString = randomstring.generate();
    return await Group.create({
        groupName: groupName,
        invitationString: invitationString
    })
}

exports.findGroupWithMember = (id) => Group.findOne({ 
    where: { id: id },
    include: {
        model: User,
        attributes: ['id', 'firstName', 'lastName', 'email'],
        through: {
            attributes: ['role']
        }
    } 
});