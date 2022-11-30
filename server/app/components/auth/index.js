const express = require('express');
const router = express.Router();
const controller = require('./authController')

router.post('/login', controller.postLogIn);

router.post('/login-google', controller.postLogInGoogle);

router.post('/signup', controller.postSignUp);

router.get('/logout', controller.logout);

module.exports = router