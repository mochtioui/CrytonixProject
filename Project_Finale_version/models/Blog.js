const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const BlogSchema  = new Schema({
    Title: {
        type: String,
        required: true,
    },
    Description: {
        type: String,
        required: true
    },
    Image: {
        type: String,
        required: true
    },
    website: {
        type: Schema.Types.ObjectId,
        ref: "Website",
        required: true,
    },
    users: {
        type: Schema.Types.ObjectId,
        ref: "users",
        required: true,
    },
    Blog: [{
        type: Schema.Types.ObjectId,
        ref: "Blog",
    }],
    Statut: {
        type: String,
        required: true,
    },

})

module.exports = mongoose.model('Blog' , BlogSchema)
