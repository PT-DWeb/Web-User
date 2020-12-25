var express = require('express');
var router = express.Router();

var userController = require('../controllers/userController');



router.get('/register', userController.displayFormRegister);
router.post('/register', userController.addUserToDatabase);

router.get('/login',userController.displayFormLogin);

// router.get('/register', userController.alert1)

const accountController = require('../controllers/accountController');

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

router.get('/edit', accountController.displayInfo);

router.put('/edit/:id', accountController.changeCustomerAvt);


module.exports = router;
