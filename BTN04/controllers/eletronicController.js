// const electronicModel = require('../models/electronicModel');

// exports.index = (req, res, next) => {
//     const products = await electronicModel.product();

//     console.log('electronic', products);

//     res.render('electronic/index',{products});
// };

const electronicModel = require('../models/electronicModel');

exports.index = async (req, res, next) => {
    const newbrands = await electronicModel.newbrands();
    const hottestoffers = await electronicModel.hottestoffers();
    const highlightphone = await electronicModel.highlightphone();
    console.log('New brand', newbrands);
    console.log('Hottest', hottestoffers);
    console.log('Highlightphone', highlightphone);

    res.render('electronic/index',{newbrands,hottestoffers,highlightphone});
};

exports.brands = async (req, res, next) => {
    const allmobiles = await electronicModel.allmobiles();
    console.log('allmobiles', allmobiles);
   
    res.render('electronic/allmobiles',{allmobiles});
};

exports.about = (req, res, next) => {
    res.render('electronic/about');
};

exports.contact = (req, res, next) => {
    res.render('electronic/contact');
};

