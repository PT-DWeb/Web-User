// const electronicModel = require('../models/electronicModel');

// exports.index = (req, res, next) => {
//     const products = await electronicModel.product();

//     console.log('electronic', products);

//     res.render('electronic/index',{products});
// };


const productsModel = require('../models/electronicModel')

console.log("electronicController.js 1");

exports.product = async(req, res, next) => {
    //Lấy dữ liệu 
    console.log("electronicController.js 2");
    const product = await productsModel.find();
    console.log(product);
    res.render('electronic/index', {product});
};

exports.brands = async (req, res, next) => {
    const allmobiles = await productsModel.find();
    console.log('allmobiles', allmobiles);
   
    res.render('electronic/allmobiles',{allmobiles});
};

exports.about = (req, res, next) => {
    res.render('electronic/about');
};

exports.contact = (req, res, next) => {
    res.render('electronic/contact');
};


exports.checkout = (req, res, next) => {
    res.render('electronic/checkout');
};

exports.payment = (req, res, next) => {
    res.render('electronic/payment');
};