const groupService = require('../group/groupService');
const memberService = require('./memberService');
const {result} = require('lodash');
const createError = require("http-errors");

function getRolePriority(role) {
    switch (role) {
        case "Owner":
            return 2;
        case "Co-owner":
            return 1;     
        default:
            return 0; 
    }   
}

exports.updateMember = async (req, res, next) => {
    const { groupId, memberId, role } = req.body;
    const userId = req.decoded.user.id;
    const setter = await memberService.findMemberInGroup(groupId, userId);
    const member = await memberService.findMemberInGroup(groupId, memberId);
    if (!member || !setter) {
        return res.status(404).send({ message: "Member is not found in group" });
    }
    if (getRolePriority(setter.role) < getRolePriority(member.role) || getRolePriority(setter.role) < getRolePriority(role)) {
        return res.status(400).send({ message: "Cannot set role" });
    }
    if (setter.role === "Owner" && getRolePriority(setter.role) === getRolePriority(role)) {
        await memberService.updateMember(groupId, memberId, role);
        await memberService.updateMember(groupId, userId, "Member");
    }
    else {
        await memberService.updateMember(groupId, memberId, role);
    }

    const group = await groupService.findGroupWithMember(groupId);
    return res.status(200).send({ group: group });
}

exports.kickMember = async (req, res, next) => {
    const { groupId, memberId } = req.body;
    const userId = req.decoded.user.id;
    const kicker = await memberService.findMemberInGroup(groupId, userId);
    const member = await memberService.findMemberInGroup(groupId, memberId);
    if (!member || !kicker) {
        return res.status(404).send({ message: "Member is not found in group" });
    }
    if (getRolePriority(kicker.role) < getRolePriority(member.role) || kicker.role === "Member") {
        return res.status(400).send({ message: "Cannot kick selected member" });
    }
    
    await memberService.removeMember(groupId, memberId);

    const group = await groupService.findGroupWithMember(groupId);
    return res.status(200).send({ group: group });
}

