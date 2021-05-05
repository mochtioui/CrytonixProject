const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ProductSchema  = new Schema({
    title: {type: String, required: true},
    country_code: {type: String, required: true},
    picture: {type: String, required: true},
    bankLink: {type: String, required: true},
    alt_pic: {type: String, required: false},
    active: {type: Boolean, required: true},
    sponsored: {type: Boolean, required: true},
    subType: {type:mongoose.Schema.Types.ObjectId, ref:'ProductSubType'},


}, {strict: false});

module.exports = mongoose.model('Product' , ProductSchema);
