const express = require('express');
const router = express.Router();
var LabelService = require('../services/PropertyLabel.service');



// get all label
router.get('/', LabelService.getAll);

// create a new label
router.post('/', LabelService.create);

// create many new label
router.post('/createMany', LabelService.createMany);
// get a label by id
router.get('/:labelId', LabelService.getById);

// delete a label
router.delete('/:labelId', LabelService.delete);

// update a label
router.put('/:labelId', LabelService.update);


module.exports = router;
