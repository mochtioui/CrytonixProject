const mongoose = require('mongoose');

const Links_BoxSchema  = mongoose.Schema({

    description: {
        type: String,
        required: true
    },
    links_Map: {
        type: Map,
        of: {
            type: String,
            validate: function(str) {
                if (str.startsWith('http://')) {
                    throw new Error(`Handle ${handle} must not be a URL`);  //condition qu'il soit pas un url
                }
                return true;
            }
        },
        required: true
    },






});

module.exports = mongoose.model('links_box' , Links_BoxSchema) ;
