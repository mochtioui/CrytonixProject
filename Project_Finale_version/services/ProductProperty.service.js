const Property = require('../models/ProductProperty.model');

// get all Detail properties
exports.getAll =   (req, res) =>{

      Property.find().populate('subType').exec()
              .then(propertyies => res.json(propertyies))
              .catch(err => res.status(400).json('Error: ' + err));

};

// create a new product property
exports.create = async  (req, res) => {
    const property = new Property({
        name: req.body.name,
        description: req.body.description,
        type: req.body.type,
        subType: req.body.subType,
    });
    try {
        const saved = await property.save();
        res.json(saved);
    } catch (err) {
        res.json({message: err});
    }
};

// get a property by id
exports.getById = async  (req, res) => {
    try {
        const property = await Property.findById(req.params.propertyId);
        res.json(property);
    } catch (err) {
        res.json({message: err});
    }
};

// delete a product property
exports.delete = async  (req, res) => {
    try {
        const removed = await Property.remove({_id: req.params.propertyId});
        res.json(removed);
    } catch (err) {
        res.json({message: err});
    }
};

// update a product property
exports.update = async  (req, res) => {
    try {
        const updated = await Property.updateOne(
            { _id: req.params.propertyId },
            { $set: req.body}
            ,
            {new: true, useFindAndModify: false}
        );
        res.json(updated);
    } catch (err) {
        res.json({message: err});
    }
};
// assign a sub-type to a product property
exports.assignSubType = async  (req, res) => {
    try {
        const updated = await Property.updateOne(
            { _id: req.params.propertyId },
            { $set: { subType: req.body.subType }}
        );
        res.json(updated);
    } catch (err) {
        res.json({message: err});
    }
};
// get all Product properties
exports.getAllBySubType =    (req, res) =>{

    Property.find({ subType: req.params.subTypeId }).populate('subType').exec()
        .then(propertyies => res.json(propertyies))
        .catch(err => res.status(400).json('Error: ' + err));

};
// get all Product properties that doesn't belong to a specified subType
exports.getNotAssigned =    (req, res) =>{

    Property.find({ subType: {$ne :req.params.subTypeId} })
        .then(propertyies => res.json(propertyies))
        .catch(err => res.status(400).json('Error: ' + err));

};
