var express = require('express');
var router = express.Router();
var electronicController = require('../controllers/eletronicController');
//const usersController = require('../controllers/usersController');

/* GET home page. */
router.get('/', electronicController.index);
// router.get('/about', clothesController.about);
// router.get('/contact', clothesController.contact);
module.exports = router;