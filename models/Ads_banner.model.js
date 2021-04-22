const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Ads_bannerSchema  = new Schema({
    Ads_banner_name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    Ads_img: {
        type: String,
        required: true
    },

   Valide_ads: {
        type: Boolean,
        default: true,
        required: true,
    }

});

module.exports = mongoose.model('Ads_banner' , Ads_bannerSchema);
