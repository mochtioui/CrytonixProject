const express = require('express');
const router = express.Router();
var SubTypeService = require('../services/ProductSubType.service');



// get all Sub-Types
router.get('/', SubTypeService.getAll);
// get all Sub-Types by product Type
router.get('/byType/:typeId', SubTypeService.getByType);
// create a new sub-type
router.post('/', SubTypeService.create);
//
router.post('/assignToWebsite/:websiteId', SubTypeService.assignToWebsite);
// get a sub-type by id
router.get('/:subTypeId', SubTypeService.getById);
router.get('/checkExistence/:websiteId/:typeId/:subtypeId', SubTypeService.checkExistence);

// delete a sub-type
router.delete('/:subTypeId', SubTypeService.delete);

// update a sub-type
router.put('/:subTypeId', SubTypeService.update);

// assign a type to a sub-type
router.put('/assignType/:subTypeId', SubTypeService.assignType);
// get a type by id
router.get('/pagesByWebsite/:websiteId', SubTypeService.getPagesByWebsite);
// get sub-types by website and Product Type
router.get('/getByWebsite/:websiteId/:typeId', SubTypeService.getByWebsite);
// get subtype by type
router.get('/subtypesPagesByType/:typeId', SubTypeService.getSubTypesPagesByType);

module.exports = router;
