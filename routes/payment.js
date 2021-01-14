const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');
const loginMiddleware=require('../middleware/loginMiddleware');

//,loginMiddleware.restrict
router.get('/checkout', paymentController.checkout);
router.post('/payment', paymentController.payment);
//router.get('/payment', paymentController.payment);
router.get('/cart',paymentController.cart);
router.get('/cart/add',paymentController.addtoCart);
router.get('/cart/pop',paymentController.popCart);
router.get('/cart/remove',paymentController.removeCart);
router.get('/history/:idUser',paymentController.history);

module.exports = router;