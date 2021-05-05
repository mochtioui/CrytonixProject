const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ClickSchema  = new Schema({
    type: {type: String, required: true},
    referrer: {type: String, required: true},
    TrackedUrl: {type:mongoose.Schema.Types.ObjectId, ref:'TrackedUrl', required: false},
    product: {type:mongoose.Schema.Types.ObjectId, ref:'Product', required: false},
    website: {type:mongoose.Schema.Types.ObjectId, ref:'Website', required: false},
    ip: {type: String, required: true},
    country: {type: String, required: true},
    region: {type: String, required: true},
    city: {type: String, required: true},
    date: {type: Date, default: Date.now},

});

module.exports = mongoose.model('Click' , ClickSchema);
