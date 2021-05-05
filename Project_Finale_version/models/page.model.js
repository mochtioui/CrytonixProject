const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PageSchema  = new Schema({
    page_name: {
        type: String,
        required: true
    },
    layout: {
        type: Schema.Types.ObjectId,
        ref: "Layout",
        required: true
    },
    pos: {
        type: Number,
        required: false
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
    productType: {
        type: Schema.Types.ObjectId,
        ref: "ProductType",
    },
    productSubType: {
        type: Schema.Types.ObjectId,
        ref: "ProductSubType",
    },
    productTypePage: {
        type: Schema.Types.ObjectId,
        ref: "Page",
    },
    product: {
        type: Schema.Types.ObjectId,
        ref: "Product",
    },
    SubTypePage: {
        type: Schema.Types.ObjectId,
        ref: "Page",
    },
    best_category_list: [
        {
        type: Schema.Types.ObjectId,
        ref: "Page",
        }
    ],

}, {strict: false});


module.exports = mongoose.model('Page' , PageSchema)
