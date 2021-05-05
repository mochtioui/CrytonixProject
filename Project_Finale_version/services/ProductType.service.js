const ProductType = require('../models/ProductType.model');
const Page = require('../models/page.model');
const Website = require('../models/website.model');
const Link = require('../models/link.model');
const SubType = require('../models/ProductSubType.model');
const Layout = require('../models/layout.model');

// get all Detail Types
exports.getAllTypes =   (req, res) =>{
   ProductType.find()
              .then(productTypes => res.json(productTypes))
              .catch(err => res.status(400).json('Error: ' + err));

};

// create a new product type
exports.create = async  (req, res) => {
    const type = new ProductType({
        name: req.body.name,
        description: req.body.description
    });
    try {
        const savedProductType = await type.save();
        res.json(savedProductType);
    } catch (err) {
        res.json({message: err});
    }
};

// get a type by id
exports.getById = async  (req, res) => {
    try {
        const type = await ProductType.findById(req.params.typeId);
        res.json(type);
    } catch (err) {
        res.json({message: err});
    }
};

// delete a product type
exports.delete = async  (req, res) => {
    try {
        const removed = await ProductType.remove({_id: req.params.typeId});
        res.json(removed);
    } catch (err) {
        res.json({message: err});
    }
};

// update a product type
exports.update = async  (req, res) => {
    try {
        const updated = await ProductType.updateOne(
            { _id: req.params.typeId },
            { $set: req.body}
            ,
            {new: true, useFindAndModify: false}
        );
        res.json(updated);
    } catch (err) {
        res.json({message: err});
    }
};

// assign a product type to a website
exports.assignTypeToWebsite = async  (req, res) => {
    console.log(req.body.website);

    const categoryLayout = await Layout.findOne({website:req.body.website,layout_name:'category'}).then().catch();

    const prodPage =req.body;
    prodPage.layout = categoryLayout;
    console.log(prodPage);
    const saved = await Page.create(prodPage)
        .then(async (s)=>{
            await  res.json(s);


           const subCategoryLayout = await Layout.findOne({website:req.body.website,layout_name:'subcategory'}).then().catch();
            console.log(req.body.website);
           console.log(subCategoryLayout);

                    console.log(req.body.subTypes);
                    req.body.subTypes.forEach( (sub) =>
                        {
                     //      const subType =  SubType.findById(sub.value).then().catch();
                           console.log(sub);
                            const b ={

                                "page_name":sub.label,
                                "type":"subCategory",
                                "productSubType":sub.value,
                                "productTypePage": s._id,
                                "website":req.body.website,
                                "layout":subCategoryLayout._id



                        };
                            addPage(b);

                        }


                    )



        })
        .catch(err => res.status(400).json('Error: ' + err));
};
const addPage = async function(body) {
    const saved = await Page.create(body)
        .then( (s)=>{


            return s;
        })
        .catch();
};
// get  Product Types by website
exports.getByWebsite =   (req, res) =>{
    Page.find({website:req.params.websiteId,type:"category"})
        .then(pages => {
            const types =[];
            pages.forEach( async  (page,i) =>{
                    const type = await ProductType.findById(page.get('productType'));
                    types.push(type);

                    if(i === pages.length -1){

                        await res.json(types);
                    }
                }
            );


        })
        .catch(err => res.status(400).json('Error: ' + err));

};
// get  Product Types pages by website
exports.getTypesPagesByWebsite =   (req, res) =>{
    Page.find({website:req.params.websiteId,type:"category"})
        .then(pages => {

            res.json(pages);


        })
        .catch(err => res.status(400).json('Error: ' + err));

};

exports.checkExistence = async  (req, res) => {
    Page.findOne({website:req.params.websiteId,type:"category",productType:req.params.typeId})
        .then(page => {
     if (page != null) {
         res.json(true);
     }
     else res.json(false);

        })
        .catch(err => res.status(400).json('Error: ' + err));
};
