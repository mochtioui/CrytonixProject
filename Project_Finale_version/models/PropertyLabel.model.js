const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PropertyLabelSchema  = new Schema({
    label: {type: String, required: true},
    property: {type:mongoose.Schema.Types.ObjectId, ref:'ProductProperty'},
    website: {type:mongoose.Schema.Types.ObjectId, ref:'Website'},



});

module.exports = mongoose.model('PropertyLabel' , PropertyLabelSchema);
