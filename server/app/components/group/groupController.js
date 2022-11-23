const groupService = require('./groupService');
const userService = require('../user/userService');
const memberService = require('../member/memberService');
const {result} = require('lodash');
const createError = require("http-errors");

exports.createGroup = async (req, res, next) => {
    const { groupName, userId } = req.body;
    const group = await groupService.create(groupName);
    console.log(group.id);
    //const user = req.user;
    //console.log(user);
    const user = await  userService.findById(userId);
    if (!user) {
        return res.status(404).send({ message: "User not found" });
    }
    await memberService.create(group.id, user.id, "Owner");
    return res.status(200).send({ data: {group}, message: "Create successfully!" });
}

