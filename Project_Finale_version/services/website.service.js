const Website = require('../models/website.model')
const Page = require('../models/page.model')
const Link = require('../models/link.model')
const Layout = require('../models/layout.model')



// get all website
exports.getWebsites = async function (req, res) {
    try {
        const websites = await Website.find();
        res.json(websites)
    } catch (err) {
        res.json({ message: err });
    }
}

// add website
exports.addWebsite = async  (req, res) => {
    const website = new Website({
        domain: req.body.domain,
        logo_pic: req.body.logo_pic,
        site_name: req.body.site_name,
        theme: req.body.theme,
        Language: req.body.Language ,
        Contry: req.body.Contry ,
        Curreny_sign:req.body.Curreny_sign,
        ads_banners :null

    });
    try {
        const savedWebsite = await website.save(
            addLayouts(req.body.layouts,website._id)
        )
        res.json(savedWebsite);

    } catch (err) {
        res.json({message: err});
    }
}

const addLayouts = function(layouts,websiteId){

    layouts.forEach(async (item, index)=> {
        item.website = websiteId
        const layout = new Layout(item)
        await layout.save(
              layout.layout_name === 'home' &&  addPages(layout,websiteId)
        )

    })

}



const addPages = async  function(layout,websiteId){

    const page = new Page({
        page_name : layout.layout_name,
        layout : layout._id,
        website: websiteId
    })


    const addedPage = await page.save()

    console.log(addedPage)

    await addLinks(addedPage, websiteId)

}




const addLinks = async function(page, websiteId) {

    const link = new Link({
        link_text: page.page_name,
        page: page._id,
    })

    await link.save(
        await Website.updateOne(
            { _id: websiteId },
            { $push: { 'header.links' : link._id }}
        )
    )
}

// get website by Id
exports.getOneWebsite = async  (req, res) => {
    try {
        const website = await Website.findById(req.params.siteId)
            .populate('theme')
            .populate('ads_banners')
            .populate('layouts')
            .populate({
                path: 'pages',
                populate: {
                    path: 'layout'
                }
            })
            .populate({
                path: 'header.links',
                populate: ({
                    path: 'page',
                    populate: {
                        path: 'layout'
                    }
                })
            });

        res.json(website);
    } catch (err) {
        res.json({message: err});
    }

}

// delete website
exports.deleteWebsite = async  (req, res) => {
    try {
        const removedWebsite = await Website.remove({_id: req.params.siteId});
        res.json(removedWebsite);
    } catch (err) {
        res.json({message: err});
    }
}

// update a website
exports.updateWebsite = async  (req, res) => {
    try {
        const updatedWebsite = await Website.updateOne(
            { _id: req.params.siteId },
            { $set:
                    {
                        theme: req.body.theme,
                        Contry: req.body.Contry,
                        Curreny_sign: req.body.Curreny_sign,
                        Language: req.body.Language,
                        site_name: req.body.site_name,
                        logo_pic: req.body.logo_pic,
                        domain: req.body.domain,

                    }


            }
        );
        res.json(updatedWebsite);
    } catch (err) {
        res.json({message: err});
    }
}

// update links of header ( add or remove )
exports.updateLinksHeader = async  (req, res) => {
    try {
        let updateLinks;

        // remove link
        if (req.params.type === 'remove'){
            await Link.deleteOne({ _id : req.body._id});
        }

        // add link
        if(req.params.type === 'add'){

            let link = new Link({
                link_text:  req.body.link_text,
                page :  req.body.page
            })

            updateLinks =  await link.save().then(link => link.populate({
                path: 'page',
                populate: {
                    path: 'layout'
                }
            }).execPopulate())

            await Website.updateOne(
                    { _id: req.body.site_id},
                    { $push: { "header.links" : link._id }})

        }

        // edit link
        if(req.params.type === 'edit') {

            updateLinks = await Link.findOneAndUpdate(
                {_id: req.body._id},
                { $set: { link_text: req.body.link_text, page: req.body.page }},
                {new: true, useFindAndModify: false})
                .populate({
                    path: 'page',
                    populate: {
                        path: 'layout'
                    }
                })

        }

        res.json(updateLinks);

    } catch (err) {
        res.json({message: err});
    }
}


// update a website ads banner
exports.updateWebsite_ads = async  (req, res) => {
    try {
        const updateWebsite_ads = await Website.updateOne(
            { _id: req.params.siteId },
            { $set:
                    {
                        ads_banners: req.body.ads_banners,
                    }
            }
        );
        res.json(updateWebsite_ads);
    } catch (err) {
        res.json({message: err});
    }
};



// delete a website ads banner
exports.deleteWebsite_ads = async  (req, res) => {
    try {
        const deleteWebsite_ads = await Website.updateOne(
            { _id: req.params.siteId },
            { $set:
                    {
                        ads_banners: null,
                    }
            }
        );
        res.json(deleteWebsite_ads);
    } catch (err) {
        res.json({message: err});
    }
};
