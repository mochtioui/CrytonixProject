const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TrackedUrlSchema  = new Schema({
    name: {type: String, required: true},
    original: {type: String, required: true},
    short: {type: String, required: true},
    type: {type: String, required: true},
    product: {type:mongoose.Schema.Types.ObjectId, ref:'Product', required: false},
    website: {type:mongoose.Schema.Types.ObjectId, ref:'Website', required: false},

    createdAt: {type: Date, default: Date.now},
    clicks: {type: Number, required: true, default: 0}
});

module.exports = mongoose.model('TrackedUrl' , TrackedUrlSchema);
