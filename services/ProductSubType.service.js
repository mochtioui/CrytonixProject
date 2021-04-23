const SubType = require('../models/ProductSubType.model');

exports.create = async  (req, res) => {
    const subType = new SubType({
        name: req.body.name,
        description: req.body.description
    });
    try {
        const savedSubType = await subType.save();
        res.json(savedSubType);
    } catch (err) {
        res.json({message: err});
    }
};





exports.getAll =   (req, res) =>{
    SubType.find()
              .then(subTypes => res.json(subTypes))
              .catch(err => res.status(400).json('Error: ' + err));

};


exports.getById = async  (req, res) => {
    try {
        const type = await SubType.findById(req.params.subTypeId);
        res.json(type);
    } catch (err) {
        res.json({message: err});
    }
};


exports.delete = async  (req, res) => {
    try {
        const removed = await SubType.remove({_id: req.params.subTypeId});
        res.json(removed);
    } catch (err) {
        res.json({message: err});
    }
};

exports.update = async  (req, res) => {
    try {
        const updated = await SubType.updateOne(
            { _id: req.params.subTypeId },
            { $set: { description: req.body.description }}
        );
        res.json(updated);
    } catch (err) {
        res.json({message: err});
    }
};
exports.assignType = async  (req, res) => {
    try {
        const updated = await SubType.updateOne(
            { _id: req.params.subTypeId },
            { $set: { productType: req.body.productType }}
        );
        res.json(updated);
    } catch (err) {
        res.json({message: err});
    }
};