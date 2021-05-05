const Blog = require('../models/Blog');
var multer = require('multer');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'client/src/assets/img/theme')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname )
    }
})
var upload = multer({ storage: storage });


exports.addBlog = [ upload.single('file'), async (req, res) => {
    try {
        const blog = new Blog({
            Title: req.body.Title,
            Description: req.body.Description,
            Image: req.file.filename,
            website: req.body.website,
            users: req.body.users,
            Statut: "desactivated"
        });
        console.log(blog);

        blog.save((err, blog) => {
            if (err) res.json(err);
            else res.json(blog);
        });
    }catch (err) {
        res.json({message: err});
    }


}]
exports.getBlog = async  (req, res)=> {
    try {
        const blog = Blog.find().populate('website').populate('users').then(user => res.json(user));
    } catch (err) {
        res.json({message: err});
    }
}
exports.getBlogByWebsite = async  (req, res)=> {
    const WebId = req.params.id ;
    try {
        const blog = Blog.find({website: WebId}).populate('website').populate('users').then(user => res.json(user));
    } catch (err) {
        res.json({message: err});
    }
}


    exports.updateBlog =   async  (req, res) => {
        try {
            const updated = await Blog.updateOne(
                { _id: req.params.id },
                { $set: {
                        Title:req.body.Title,
                        Description:req.body.Description,
                        Image:req.body.Image,
                    }},

                {new: true, useFindAndModify: false}
            );
            console.log('ok');
            res.json(updated);
        } catch (err) {
            console.log(err);

            res.json({message: err});
        }
    };
exports.Asseign = async  (req, res) => {
    try {
        const updated = await Blog.updateOne(
            { _id: req.params.id },
            { $set: {
                    Blog:req.body.Blog,

                }},

            {new: true, useFindAndModify: false}
        );
        console.log('ok');
        res.json(updated);
    } catch (err) {
        console.log(err);

        res.json({message: err});
    }
};




exports.validationBlog = async  (req, res) => {
    try {
        const updated = await Blog.updateOne(
            { _id: req.params.id },
            { $set: {
                    Title:req.body.Title,
                    Description:req.body.Description,
                    Image:req.body.Image,
                    Statut: "Activated",
                }},

            {new: true, useFindAndModify: false}
        );
        res.json(updated);
    } catch (err) {
        res.json({message: err});
    }
};

exports.getByUser = async  (req, res) => {
    const User = req.params.id ;

    try {
        const blog = Blog.find(

        {users: User}).populate('website').then(user => res.json(user)

        );
    } catch (err) {
        res.json({message: err});
    }

//        const Blog  = await Blog.find({Title: "Test226"});
};

exports.getById = async  (req, res) => {
    const User = req.params.id ;

    try {
        const blog = Blog.find(

            {_id: User}).populate('users').populate('Blog').then(user => res.json(user)

        );
    } catch (err) {
        res.json({message: err});
    }

//        const Blog  = await Blog.find({Title: "Test226"});
};
