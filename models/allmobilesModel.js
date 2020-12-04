const mongoose= require('mongoose');
const Schema = mongoose.Schema();

console.log("model.js");
//Tạo model
const productSchema = mongoose.Schema({
    id: {type: String },
    name: {type: String, require: true},
    baseprice: {type: String, require: true},
    discountprice: {type: String, require: true},
    cover: {type: String, require: true},
    idmanufacturer: {type: String , require: true},
    battery: {type: String, require: true},
    camera: {type: String, require: true},
    processor: {type: String, require: true},
    screen:{type: String, require: true},
    storage: {type: String, require: true},
})

module.exports = mongoose.model('allmobiles', productSchema )
