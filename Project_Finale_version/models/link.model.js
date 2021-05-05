const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const LinkSchema  = new Schema({
    link_text: {
        type: String,
        required: true
    },
    page: {
         type: Schema.Types.ObjectId,
         ref: "Page",
         required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
}, {strict: false})

module.exports = mongoose.model('Link' , LinkSchema)
