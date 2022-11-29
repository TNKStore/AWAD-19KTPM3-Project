const userService = require('./userService');
const {result} = require('lodash');
const createError = require("http-errors");
const User = require("../../models/user");

exports.list = async(req, res)=>{
    const response = await User.findAll();
    res.status(201).json({response});
}

exports.update = async(req, res) => {
    const  {email, firstName,lastName, phone, address } = req.body;
    const response = await userService.updateInfo(email, firstName, lastName, phone, address);
    if(response[0]>0) res.status(200).json({msg: "Update successfully !!"});
    else res.status(400).json({msg: "Can not update"});
}

exports.updatePassword = async (req, res) =>{
    const {email, password } = req.body;
    const response = await userService.updatePassword(email, password);
    if(response[0]>0) res.status(200).json({msg: "Update successfully !!"});
    else res.status(400).json({msg: "Can not update"});
}