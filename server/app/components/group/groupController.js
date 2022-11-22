const groupService = require('./groupService');
const userService = require('../user/userService');
const {result} = require('lodash');
const createError = require("http-errors");

exports.createGroup = async (req, res, next) => {
    const { groupName } = req.body;
    const group = await groupService.create(groupName);
    const user = await userService.findById(req.decoded.user.id);
    if (!user) {
        return res.status(404).send({ message: "User not found" });
    }
    await group.addUser(user, { through: { role: "Owner" }});
    const result = await groupService.findGroupWithMember(group.id);
    return res.status(200).send({ group: result, message: "Create successfully!" });
}

