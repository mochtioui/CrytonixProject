const Page = require('../models/page.model')
const Link = require('../models/link.model')
var multer = require('multer');


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'client/src/assets/img/page')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname )
    }
})


var upload = multer({ storage: storage });


// get all pages
exports.getPages = async function (req, res) {
    try {
        const pages = await Page.find({ website : req.params.siteId })
            .populate('layout')
            .populate('productType')
            .populate('productSubType')
            .populate({
                path: 'SubTypePage',
                populate: {
                    path: 'productTypePage'
                }
            })
            .populate('productTypePage')
            .populate('product')
            .populate('best_category_list')
            .populate({
            path: 'website',
            populate: {
                path: 'theme'
            }
        })
        res.json(pages)

    } catch (err) {
        res.json({ message: err });
    }
}

// get pages by subTypes
exports.getPagesBySubTypes = async function (req, res) {
    try {
        const pages = await Page.find({ SubTypePage : req.params.subTypePage_id })
            .populate('product')
            .populate({
                path: 'SubTypePage',
                populate: {
                    path: 'productTypePage'
                }
            })

        res.json(pages)

    } catch (err) {
        res.json({ message: err });
    }
}

// get page by Id
exports.getOnePage = async  (req, res) => {
    try {
        const page = await Page.findById(req.params.siteId).populate('layout')
        res.json(page);

    } catch (err) {
        res.json({message: err});
    }

}

// add page
exports.addPage = [ upload.single('page_img'), async  (req, res) => {

    try {

        let page  = JSON.parse(req.body.page);

        if ( req.file ) {
            page.page_img = req.file.filename
        }
        page.website = req.body.website

        const exist = await Page.find({ website : page.website, page_name : page.page_name }).count()

        if (exist === 0) {
            const addedPage = await Page.create(page)
                .then(result => result.populate('layout').populate('best_category_list')
                    .execPopulate())

            res.json(addedPage);

        } else {
            res.json({message: 'Page already exist'})
        }


    } catch (err) {
        res.json({message: err});
    }
}]

// update page
exports.updatePage = [ upload.single('page_img'), async  (req, res) => {
    try {

        let page  = JSON.parse(req.body.page);

        if ( req.file ){
            page.page_img = req.file.filename
        }
        const exist = await Page.find({ website : page.website, page_name : page.page_name, _id : {$ne: page._id } }).count()
        if ( exist === 0) {

           const updatedPage = await Page.findOneAndUpdate(
                { _id: page._id },
                { $set: page },
                { new: true, useFindAndModify: false }
            ).populate('layout')
               .populate('productType')
               .populate('productSubType')
               .populate({
                   path: 'SubTypePage',
                   populate: {
                       path: 'productTypePage'
                   }
               })
               .populate('productTypePage')
               .populate('product')
               .populate('best_category_list')
               .populate({
                   path: 'website',
                   populate: {
                       path: 'theme'
                   }
               })
            res.json(updatedPage);

        } else {
            res.json({message: 'Page already exist'})
        }

    } catch (err) {
        res.json({message: err});
    }
}]

// delete page
exports.deletePage = async  (req, res) => {
    try {



        const removedPage =  await Page.findOneAndRemove({ _id : req.params.pageId }).then( async page => {
                await Link.remove({ page : page._id})
                await Page.find({productTypePage: page._id}).then(async subTypePages => {
                    await subTypePages.map(async subTypePage => {
                         await Page.remove({ SubTypePage : subTypePage._id })
                         await Page.remove({ _id: subTypePage._id })
                    })
                })
            }
        )

        res.json(removedPage)

    } catch (err) {
        res.json({message: err});
    }
}

// update position page
exports.updatePosPage = async  (req, res) => {
    try {
        const updatedPage = await Page.findOneAndUpdate(
            { _id: req.params.pageId },
            { $set: { pos : req.params.pos } },
            { new: true, useFindAndModify: false })

            res.json(updatedPage);

    } catch (err) {
        res.json({message: err});
    }

}
