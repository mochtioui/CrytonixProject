const Ads_banner = require('../models/Ads_banner.model');


// get back all the Ads_banners
exports.getAds_banners = async function (req, res) {

    try {


        const Ads_banners = await Ads_banner.find();
        res.json(Ads_banners)
    } catch (err) {
        res.json({ message: err });
    }
}

// add  an  Ads_banner
exports.addAds_banner = async  (req, res) => {
    const ads_banner = new Ads_banner({
        Ads_banner_name: req.body.Ads_banner_name,
        description: req.body.description,
        Ads_img: req.body.Ads_img,
        Valide_ads: req.body.Valide_ads
    });
    try {
        const savedAds_banner= await ads_banner.save();
        res.json(savedAds_banner);
    } catch (err) {
        res.json({message: err});
    }
}


// specific Ads_banner by id
exports.getOneAds_banner = async  (req, res) => {
    try {
        const ads_banner = await Ads_banner.findById(req.params.Ads_bannerId);
        res.json(ads_banner);
    } catch (err) {
        res.json({message: err});
    }
}

// delete Ads_banner
exports.deleteAds_banner = async  (req, res) => {
    try {
        const removedAds_banner = await Ads_banner.remove({_id: req.params.Ads_bannerId});
        res.json(removedAds_banner);
    } catch (err) {
        res.json({message: err});
    }
};

// update an Ads_banner
exports.updateAds_banner = async  (req, res) => {
    try {
        const updatedAds_banner = await Ads_banner.updateOne(
            { _id: req.params.Ads_bannerId },
            { $set: {
                     Ads_banner_name: req.body.Ads_banner_name,
                    description: req.body.description,
                    Ads_img: req.body.Ads_img,
                    Valide_ads: req.body.Valide_ads
                     }
            }
        );
        res.json(updatedAds_banner);
    } catch (err) {
        res.json({message: err});
    }
};

