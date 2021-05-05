const express = require('express');
const router = express.Router();
const Links_BoxService = require('../services/Links_Box.service');



// get back all the Links_Box
router.get('/', Links_BoxService.getLinks_Box);

// submit a Links_Box
router.post('/', Links_BoxService.addLinks_Box);

// specific Links_Box
router.get('/:Links_BoxId', Links_BoxService.getLinks_Box);

// delete Links_Box
router.delete('/:Links_BoxId', Links_BoxService.deleteLinks_Box);

// update a Links_Box
router.patch('/:Links_BoxId', Links_BoxService.updateLinks_Box);

module.exports = router;
