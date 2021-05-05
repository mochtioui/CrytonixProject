const Theme = require('../models/theme.model');
const Website = require('../models/website.model');
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


// get back all the themes
exports.getThemes = async function (req, res) {
    try {
        const themes = await Theme.find();
        res.json(themes)
    } catch (err) {
        res.json({ message: err });
    }
}

// submit a theme
exports.addTheme =  [ upload.single('file'), async (req, res) => {

    try {
        const { theme_name, description } = req.body

        const exist = await Theme.find({ theme_name : theme_name}).count()

        if (exist === 0) {

            const theme = new Theme({
                theme_name: theme_name,
                description: description,
                theme_img: req.file.filename
            })

            const addedTheme = await theme.save();
            res.json(addedTheme)

        } else {
            res.json({ message : 'exist'})
        }

    } catch (err) {
        res.json({message: err});
    }

}]

// check used theme
exports.checkUsedTheme = async  (req, res) => {
    try {

        const exist = await Website.find({ theme: req.params.themeId }).count()
        res.json({ exist : exist});

    } catch (err) {
        res.json({message: err});
    }
}

// delete theme
exports.deleteTheme = async  (req, res) => {
    try {
        const removedTheme = await Theme.remove({_id: req.params.themeId});
        res.json(removedTheme);
    } catch (err) {
        res.json({message: err});
    }
}

// update a theme
exports.updateTheme =  [ upload.single('file'), async  (req, res) => {
    try {

        const { theme_name, description, _id} = req.body
        const theme_img = req.file && req.file.filename

        const exist = await Theme.find({ theme_name : theme_name , _id : {$ne: _id} }).count()

        if( exist === 0) {

            let theme = {};

            if(theme_img) {

                theme = {
                    theme_name: theme_name,
                    description: description,
                    theme_img: theme_img
                }

            } else {

                theme = {
                    theme_name: theme_name,
                    description: description,
                }
            }

            const updatedTheme = await Theme.findOneAndUpdate(
                { _id: _id },
                { $set: theme },
                { new: true, useFindAndModify: false});

            res.json(updatedTheme);

        } else {
            res.json({ message : 'exist'})
        }

    } catch (err) {
        res.json({message: err});
    }
}]

