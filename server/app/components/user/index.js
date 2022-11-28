const express = require('express');
const router = express.Router();
const userController = require('./userController');

/* GET home page. */
router.get('/list', userController.list);
router.post('/register', userController.register);
router.put('/update', userController.update);
router.put('/update-password', userController.updatePassword);
module.exports = router;
