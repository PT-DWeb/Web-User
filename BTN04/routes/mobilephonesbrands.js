var express = require('express');
var router = express.Router();
var electronicController = require('../controllers/eletronicController');
//const usersController = require('../controllers/usersController');


router.get('/allmobiles', electronicController.brands);
module.exports = router;