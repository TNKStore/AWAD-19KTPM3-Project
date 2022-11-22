const express = require('express');
const router = express.Router();
const groupController = require('./groupController');

/* GET home page. */
router.post('/create', groupController.createGroup);

module.exports = router;
