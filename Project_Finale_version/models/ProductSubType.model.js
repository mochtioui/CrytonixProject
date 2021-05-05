const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ProductSubTypeSchema  = new Schema({
    name: {type: String, required: true},
    description: {type: String, required: true},
    productType: {type:mongoose.Schema.Types.ObjectId, ref:'ProductType'},

});

module.exports = mongoose.model('ProductSubType' , ProductSubTypeSchema);
