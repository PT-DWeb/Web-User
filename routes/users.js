var express = require('express');
var router = express.Router();
var userController = require('../controllers/userController');




router.post('/register', userController.addUserToDatabase)

// router.get('/register', userController.alert1)

module.exports = router;
