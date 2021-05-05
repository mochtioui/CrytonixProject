const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ThemeSchema  = new Schema({
    theme_name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    theme_img: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Theme' , ThemeSchema)
