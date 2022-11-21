const express = require('express');
const router = express.Router();
const userController = require('./userController');

/* GET home page. */
router.get('/', userController.list);

module.exports = router;
