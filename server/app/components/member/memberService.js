const Member = require("../../models/member");
const bcrypt = require("bcrypt");

exports.create = async (groupId, userId, role) => {
    return await Member.create({
        groupId: groupId,
        userId: userId,
        role: role
    })
}