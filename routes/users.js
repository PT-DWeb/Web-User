var express = require('express');
var router = express.Router();
const accountController = require('../controllers/accountController');

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

router.get('/edit', accountController.displayInfo);

router.put('/edit/:id', accountController.changeCustomerAvt);

module.exports = router;
