const express = require('express');
const router = express.Router();
const controller = require('./authController')
const passport = require("../../passport");

router.get('/login', controller.login);

router.post('/login',
    //passport.authenticate('local'),
    controller.postLogIn);

router.post('/signup', controller.postSignUp);

router.get('/logout', controller.logout);

module.exports = router