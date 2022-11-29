const groupService = require('./groupService');
const userService = require('../user/userService');
const {result} = require('lodash');
const createError = require("http-errors");

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey("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");

exports.listGroup = async (req, res, next) =>{
    const userId = req.decoded.user.id;
    const groupList = await groupService.listGroupOfUser(userId);
    return res.status(200).json({groupList});
}

exports.listMemberIdOfGroup = async (req, res) => {
    const groupId = req.body.group_id;
    const memberOfGroup = await groupService.listMemberOfGroup(groupId);
    return res.status(200).json({memberOfGroup});
}

exports.createGroup = async (req, res, next) => {
    const { groupName } = req.body;
    const group = await groupService.create(groupName);
    console.log(req.decoded);
    const user = await userService.findById(req.decoded.user.id);
    if (!user) {
        return res.status(404).send({ message: "User not found" });
    }
    await group.addUser(user, { through: { role: "Owner" }});
    const result = await groupService.findGroupWithMember(group.id);
    return res.status(200).send({ group: result, message: "Create successfully!" });
}

exports.getMemberOfGroup = async (req, res, next) => {
    const groupId = req.body.group_id;
    const group = await groupService.findGroupWithMember(groupId);
    return res.status(200).send({group: group});
}

exports.createInvitationLink = async (req, res, next) => {
    const groupId = req.query['group'];
    const group = await groupService.findById(groupId);
    if (!group) {
        return res.status(404).send({ message: "Group not found" });
    }
    const domain = "http://localhost:4000";
    const invitationLink = domain + "/group/invite?group="+groupId+"&invitationString="+group.invitationString;
    return res.status(200).send({ link: invitationLink, message: "Create successfully!" });
}

exports.inviteToGroup = async (req, res, next) => {
    const { groupId, userId } = req.body;
    const group = await groupService.findById(groupId);
    if (!group) {
        return res.status(404).send({ message: "Group not found" });
    }
    const user = await userService.findById(userId);
    if (!user) {
        return res.status(404).send({ message: "User not found" });
    }
    const domain = "http://localhost:4000";

    //send invitation link
    const msg = {
        to: user.email, // Change to your recipient
        from: "tdhtrung19@clc.fitus.edu.vn", // Change to your verified sender
        subject: 'Group invitation',
        text: `Thanks for joining ${group.groupName} group!`,
        html: `<h1>Thanks for joining ${group.groupName} group!</h1>
        <a href="${domain}/group/invite?group=${group.id}&invitationLink=${group.invitationString}">Activate now</a>`
    }
    sgMail
        .send(msg)
        .then(() => {
            console.log(domain)
        })
        .catch((error) => {
            console.error(error)
            return res.status(400).send({ message: "Error sending mail!" });
        })
    return res.status(200).send({ message: "Email was sent!" });
}

exports.invite = async (req, res, next) => {
    const groupId = req.query['group'];
    const invitationString = req.query['invitationString'];
    const userId = req.decoded.user.id;

    const group = await groupService.findById(groupId);
    if (!group) {
        return res.status(404).send({ message: "Group not found" });
    }
    
    const result = await groupService.invite(groupId, invitationString);

    if (result) {
        const user = await userService.findById(userId);
        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }
        await group.addUser(user, { through: { role: "Member" }});
        return res.status(200).send({ error: false, message: 'Join group successfully!'});
    } else {
        return res.status(400).send({ error: true, message: 'Join group failed'});
    }
}