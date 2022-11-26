const Member = require("../../models/member");

exports.findMemberInGroup = (groupId, memberId) => Member.findOne({ 
        where: {
            groupId: groupId,
            user_id: memberId
        }
})

exports.updateMember = (groupId, memberId, role) => Member.update({
    role: role
}, {
    where: {
        groupId: groupId,
        user_id: memberId
    }
})