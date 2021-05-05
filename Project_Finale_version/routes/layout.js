const express = require('express');
const router = express.Router();
const LayoutService = require('../services/layout.service')

// get all layout
router.get('/:siteId', LayoutService.getLayout)

// get One layout by id and name
router.get('/findby/:siteId', LayoutService.getOneLayout)

// add layout
router.post('/', LayoutService.addLayout)

module.exports = router;
