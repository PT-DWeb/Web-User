const { ObjectID } = require('mongodb');
const mongoose= require('mongoose');
const Schema = mongoose.Schema();

const accountSchema = mongoose.Schema({
    _id: {type: ObjectID},
    name: {type: String, require: true},
    password: {type: String, require: true},
    email: {type: String, require: true},
    avatar: {type: String, require: true},
    DoB: {type: String, require: true},
    address: {type: String, require: true},
    phone: {type: String, require: true},

})

module.exports = mongoose.model('Account', accountSchema, "users" );