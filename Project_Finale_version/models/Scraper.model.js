const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ScraperSchema  = new Schema({
    url: {type: String, required: true},
    selector: {type: String, required: true},
    product: {type:mongoose.Schema.Types.ObjectId, ref:'Product'},
    property: {type: String, required: true},
    schedule : {type: String, required: true},

});

module.exports = mongoose.model('Scraper' , ScraperSchema);
