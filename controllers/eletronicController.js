// const electronicModel = require('../models/electronicModel');

// exports.index = (req, res, next) => {
//     const products = await electronicModel.product();

//     console.log('electronic', products);

//     res.render('electronic/index',{products});
// };


const allmobilesModel = require('../models/allmobilesModel')

console.log("electronicController.js 1");

exports.product = async(req, res, next) => {
    //Lấy dữ liệu 
    console.log("electronicController.js 2");
    const product = await allmobilesModel.find();
    //console.log(product);
    res.render('electronic/index', {product});
};

exports.brands = async (req, res, next) => {
    const allmobiles = await allmobilesModel.find();
    //console.log('allmobiles', allmobiles);
   
    res.render('electronic/allmobiles',{title: "All Mobiles",allmobiles});
};


exports.apple = async (req, res, next) => {
    const allmobiles = await allmobilesModel.find({name: /^iPhone/});
    //console.log('allmobiles', allmobiles);
   
    res.render('electronic/allmobiles',{title: "Apple", allmobiles});
};

exports.samsung = async (req, res, next) => {
    const allmobiles = await allmobilesModel.find({name: /^Samsung/});
    //console.log('allmobiles', allmobiles);
   
    res.render('electronic/allmobiles',{title: "Samsung", allmobiles});
};

exports.detail = async (req, res, next) => {
    var id = req.params.id;
    console.log("DAY LA ID "+ req.params.id);
    const detail = await allmobilesModel.findOne({_id:id});
    console.log('detail', detail);
   
    res.render('electronic/detail',{detail});
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
