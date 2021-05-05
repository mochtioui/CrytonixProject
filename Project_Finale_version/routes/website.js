const express = require('express');
const router = express.Router();
const WebsiteService = require('../services/website.service')




// get all websites
router.get('/', WebsiteService.getWebsites);

// add website
router.post('/', WebsiteService.addWebsite);

// get website by Id
router.get('/:siteId', WebsiteService.getOneWebsite)

// delete website
router.delete('/:siteId', WebsiteService.deleteWebsite)

// update a website
router.put('/:siteId', WebsiteService.updateWebsite)

// update links of header
router.post('/header/link/:type', WebsiteService.updateLinksHeader)

// update  website ads
router.put('/web_ads/:siteId', WebsiteService.updateWebsite_ads)

//delete website ads

router.put('/delete_web_ads/:siteId', WebsiteService.deleteWebsite_ads)

module.exports = router;
