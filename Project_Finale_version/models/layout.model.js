const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const LayoutSchema  = new Schema({
    layout_name: {
        type: String,
        required: true
    },
    layout_img: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    website: {
        type: Schema.Types.ObjectId,
        ref: "Website",
        required: true
    },
}, {strict: false})

module.exports = mongoose.model('Layout' , LayoutSchema)
