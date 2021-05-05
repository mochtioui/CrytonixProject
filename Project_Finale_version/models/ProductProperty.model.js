const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ProductPropertySchema  = new Schema({
    name: {type: String, required: true},
    description: {type: String, required: true},
    type: {type: String, required: true},
    subType: [{type:mongoose.Schema.Types.ObjectId, ref:'ProductSubType'}],


});

module.exports = mongoose.model('ProductProperty' , ProductPropertySchema);
