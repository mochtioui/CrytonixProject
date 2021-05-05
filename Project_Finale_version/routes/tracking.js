const express = require('express');
const router = express.Router();
var TrackingService = require('../services/Tracking.service');


router.post('/', TrackingService.create);
router.get('/:shortUrl', TrackingService.redirectToBank);
router.get('/findAll/:websiteId', TrackingService.findAll);
router.get('/findById/:trackId', TrackingService.findById);
router.get('/short/:shortUrl', TrackingService.redirect);

router.get('/addBankClick/:websiteId/:productId', TrackingService.addBankClick);
router.get('/productClick/:websiteId/:productId', TrackingService.productClick);

router.get('/uniqueClicks/:trackedUrl', TrackingService.uniqueClicks);
router.get('/clicksByMonth/:trackedUrl', TrackingService.clicksByMonth);

router.get('/clicksByReferrer/:trackedUrl', TrackingService.clicksByReferrer);
router.get('/clicksByReferrerProduct/:productId', TrackingService.clicksByReferrerProduct);
router.get('/TopReferrer/:trackedUrl', TrackingService.TopReferrer);
router.get('/topProductReferrer/:productId', TrackingService.topProductReferrer);
router.get('/clicksByProduct/:productId', TrackingService.clicksByProduct);

router.get('/clicksByCountry/:trackedUrl', TrackingService.clicksByCountry);
router.get('/TopCountry/:trackedUrl', TrackingService.TopCountry);

router.get('/clicksByWebsite/:trackedUrl', TrackingService.clicksByWebsite);
router.get('/TopWebsite/:trackedUrl', TrackingService.TopWebsite);

module.exports = router;
