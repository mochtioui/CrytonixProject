const Layout = require('../models/layout.model')


// get all layouts
exports.getLayout = async function (req, res) {
    try {
        const layout = await Layout.find({ website : req.params.siteId }).populate({
            path: 'website',
            populate: {
                path: 'theme'
            }
        });
        res.json(layout)
    } catch (err) {
        res.json({ message: err });
    }
}

// get One layout by id and name
exports.getOneLayout = async function (req, res) {
    try {
        const layout = await Layout.find({ website : req.params.siteId, layout_name:'Category' }).populate({
            path: 'website',
            populate: {
                path: 'theme'
            }
        });
        res.json(layout)
    } catch (err) {
        res.json({ message: err });
    }
}



// add layout
exports.addLayout = async  (req, res) => {

    try {
        const exist = await Layout.find({ website : req.body.website, layout_name : req.body.layout_name }).count()

        if (exist === 0) {
            const addedLayout = await Layout.create(req.body);
            res.json(addedLayout);
        } else {
            res.json({message: 'Layout already exist'})
        }


    } catch (err) {
        res.json({message: err});
    }
}
