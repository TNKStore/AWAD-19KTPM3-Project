const Group = require("../../models/group");
const User = require("../../models/user");
const Member = require("../../models/member");
var randomstring = require("randomstring");

exports.findById = (id) => Group.findByPk(id);

exports.listGroupOfUser = (userId)=> Group.findAll({
    include: {
        model: User,
        attributes: ['id'],
        through: {
            attributes: ['role']
        },
        where: {
            id: userId
        }
    }
        
});

exports.listMemberOfGroup = async (id) =>{
    return await Member.findAll({
        where: { group_id: id }
    })
}
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

exports.invite = async (groupId, invitationString) => {
    const group = await Group.findOne({
        where: {
            id: groupId,
            invitationString: invitationString
        }
    });

    if (!group) {
        return false;
    }
    return true;
}