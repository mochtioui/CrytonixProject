const express = require('express');
const router = express.Router();
const Ads_bannerService = require('../services/Ads_banner.service');



// get back all the Ads_banners
router.get('/', Ads_bannerService.getAds_banners);

// submit a Ads_banner
router.post('/', Ads_bannerService.addAds_banner);

// specific Ads_banner by id
router.get('/:Ads_bannerId', Ads_bannerService.getOneAds_banner);

// delete Ads_bannerby id
router.delete('/:Ads_bannerId', Ads_bannerService.deleteAds_banner);

// update a Ads_banner by Id
router.put('/:Ads_bannerId', Ads_bannerService.updateAds_banner);

module.exports = router;
