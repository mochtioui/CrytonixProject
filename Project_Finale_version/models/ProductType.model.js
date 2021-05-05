const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ProductTypeSchema  = new Schema({
    name: {type: String, required: true},
    description: {type: String, required: true},

});

module.exports = mongoose.model('ProductType' , ProductTypeSchema);
