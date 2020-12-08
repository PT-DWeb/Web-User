const { ObjectID } = require('mongodb');
const mongoose= require('mongoose');
const Schema = mongoose.Schema();

const accountSchema = mongoose.Schema({
    id: {type: ObjectID },
    name: {type: String},
    password: {type: String},
    email: {type: String},
    avatar: {type: String}
})

module.exports = mongoose.model('Account', accountSchema, "users" );