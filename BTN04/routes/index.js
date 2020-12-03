var express = require('express');
var router = express.Router();
var electronicController = require('../controllers/eletronicController');
//const usersController = require('../controllers/usersController');

/* GET home page. */
router.get('/', electronicController.index);
router.get('/about', electronicController.about);
router.get('/contact', electronicController.contact);
module.exports = router;