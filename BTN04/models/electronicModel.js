// exports.product = () => {
//     return [{
//             id: 1,
//             name: 'Samsung Galaxy J7',
//             image: './images/m1.jpg',
//             price: '$280.00',
//             promotionalPrice: '$200.00',
//         },
//         {
//             id: 2,
//             name: 'OPPO A37f',
//             image: './images/m2.jpg',
//             price: '$250.00',
//             promotionalPrice: '$230.00',
//         },
//         {
//             id: 3,
//             name: 'Apple iPhone X',
//             image: './images/m3.jpg',
//             price: '$300.00',
//             promotionalPrice: '$280.00',
//         },
//     ]
// }

const {db} = require('../dal/db');
const { ObjectId} = require('mongodb');

exports.newbrands = async () => {
    console.log('model db');
    const newbrandsCollection = db().collection('Products');
    const newbrands = await newbrandsCollection.find({id: "newbrand"}).toArray();
    console.dir(newbrands);
    return newbrands;
}

exports.hottestoffers = async () => {
    console.log('model db');
    const hottestoffersCollection = db().collection('Products');
    const hottestoffers = await hottestoffersCollection.find({id: "hottestoffer"}).toArray();
    console.dir(hottestoffers);
    return hottestoffers;
}

exports.highlightphone = async () => {
    console.log('model db');
    const highlightphoneCollection = db().collection('Products');
    const highlightphone = await highlightphoneCollection.find({name : /^iPhone/}).toArray();
    console.dir(highlightphone);
    return highlightphone;
}

exports.allmobiles = async () => {
    console.log('model db');
    const allmobilesCollection = db().collection('Products');
    const allmobiles = await allmobilesCollection.find({}).toArray();
    console.dir(allmobiles);
    return allmobiles;
}
