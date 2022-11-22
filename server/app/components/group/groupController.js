const groupService = require('./groupService');
const userService = require('../user/userService');
const {result} = require('lodash');
const createError = require("http-errors");

exports.createGroup = async (req, res, next) => {
    const { groupName } = req.body;
    const group = await groupService.create(groupName);
    return res.status(200).send({ data: {group}, message: "Create successfully!" });
}

exports.addMember = async (req, res, next) => {
    const { groupId, userId } = req.body;
    const group = await groupService.findById(groupId);
    if (!group) {
           return res.status(404).send({ message: "Group not found" })
    }
    const user = await userService.findById(userId);
    if (!user) {
        return res.status(404).send({ message: "User not found" })
    }
    group.addUser(user);
    return res.status(200).send({ data: group.toJSON(), message: "Create successfully!" });
}