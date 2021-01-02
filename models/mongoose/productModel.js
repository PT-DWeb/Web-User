const mongoose= require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const Schema = mongoose.Schema();

console.log("model.js");
//Tạo model
const productSchema = mongoose.Schema({
    name: {type: String, require: true},
    baseprice: {type: String, require: true},
    discountprice: {type: String, require: true},
    price: {type: Number,require: true},
    cover: {type: String, require: true},
    idmanufacturer: {type: String , require: true},
    battery: {type: String, require: true},
    camera: {type: String, require: true},
    processor: {type: String, require: true},
    screen:{type: String, require: true},
    storage: {type: String, require: true},

    quantityAvailable: {type: Number,min: 1,required: true},
    quantitySold:{type: Number,min: 0,required: true},
    description: {type: String, required: true},
    releaseDay: {type: Date, default: Date.now()},
    DeletedState: {type: Number,default: 0, enum: [0,1]},
    reviewNum: {type: Number, default: 0},
    trackNum: {type: Number, default: 0},
})

productSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('allmobiles', productSchema )
