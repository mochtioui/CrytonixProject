const Links_box = require('../models/Links_Box');


// get back all the Links_Box
exports.getLinks_Box = async function (req, res) {
    try {
        const Links_Box = await Links_box.find();
        res.json(links_box)
    } catch (err) {
        res.json({ message: err });
    }
}

// submit a Links_Box
exports.addLinks_Box = async  (req, res) => {
    const links_box = new Links_box({
        description: req.body.description,
        links_Map: req.body.links_Map,

    });
    try {
        const savedLinks_Box = await links_box.save();
        res.json(savedLinks_Box);
    } catch (err) {
        res.json({message: err});
    }
}


// specific Links_Box
exports.getOneLinks_Box = async  (req, res) => {
    try {
        const links_Box = await Links_box.findById(req.params.Links_BoxId);
        res.json(links_Box);
    } catch (err) {
        res.json({message: err});
    }
}

// delete Links_Box
exports.deleteLinks_Box = async  (req, res) => {
    try {
        const removedLinks_Box  = await Links_box.remove({_id: req.params.Links_BoxId});
        res.json(removedLinks_Box);
    } catch (err) {
        res.json({message: err});
    }
}

// update a Links_Box
exports.updateLinks_Box = async  (req, res) => {
    try {
        const updatedLinks_Box = await Links_box.updateOne(
            { _id: req.params.Links_BoxId },
            { $set: { description: req.body.description,
                    links_Map: req.body.links_Map,
                    }}
        );
        res.json(updatedLinks_Box);
    } catch (err) {
        res.json({message: err});
    }
}

