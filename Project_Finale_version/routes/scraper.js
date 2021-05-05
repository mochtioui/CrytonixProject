const express = require('express');
const router = express.Router();
var ScraperService = require('../services/Scraper.service');

//
router.post('/scraper', ScraperService.scrape);
router.post('/', ScraperService.create);

module.exports = router;
