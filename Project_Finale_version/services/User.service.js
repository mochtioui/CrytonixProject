const users = require('../models/users');
var bcrypt = require("bcrypt-nodejs");
var jwt = require("jsonwebtoken");

exports.getuser = async  (req, res)=>
{

    const user = res.locals.user;
    if (user != null) {
        if (user.role === "Administrator") {
            try {
                const User = users.find().populate('website').then(user => res.json(user));
            } catch (err) {
                res.json({message: err});
            }


        } else {
            res.json({error: " You don't have permission "})

        }

    }
    else
        {
            res.json({error: " You need to sign in"})
        }




}

exports.register = async  (req, res) => {
    const user = res.locals.user;
    if(user.role==="Administrator"){
    users.findOne({ email: req.body.email }).then(user => {
        if (!user) {
            console.log(req.body.website);
            const User = new users({
                username: req.body.username,
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10)),
                role: req.body.role,
                country: req.body.country,
                website: req.body.website,
                function: req.body.function,
                Statut: "activated"
            });
            User.save((err, User) => {
                if (err) res.json(err);
                else res.json(User);
            });
        }

else {
        res.json({error : " User already exist"})
    }
    })
    }
    else {  res.json({error : " You don't have permission "})}
}

exports.login = async  (req, res) => {
    users.findOne({email: req.body.email}, (err, users) => {
        if (err) res.json(err)
        if (!users) res.json({error: "User n'existe pas"});
        else {
            if (bcrypt.compareSync(req.body.password, users.password)) {
                var token = jwt.sign({users}, 'secret', {expiresIn: 28800})
                res.json(token)
            } else {
                res.json({error : "Mot de passe incorrecte "});
            }
        }
    })
}
exports.loginn = async  (req, res , next) => {
    const token = req.headers.authorization;
    console.log(token);
    try {
    if(token != null){
    const user = parseToken(token);
    users.findById(user.users._id, function (err , user) {
        if (err) {
            return res.json({error: "Error"});
        }
        if (user) {
            res.locals.user = user;
            next();
        }
    })
    }
    }catch(err){
            return res.json({error: "You need to sign in"});

        }

    }

exports.update = async  (req, res) => {
    try {
        const updated = await users.updateOne(
            { _id: req.params.id },
            { $set: {
                    username:req.body.username,
                    email:req.body.email,
                    website:req.body.website,
                    Statut:req.body.Statut,
                }},

            {new: true, useFindAndModify: false}
        );
        res.json(updated);
    } catch (err) {
        res.json({message: err});
    }
};

exports.changepassword = async  (req, res) => {
    try {
        const updated = await users.updateOne(
            { _id: req.params.id },
            { $set: {
                    password:bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10)),
                }},

            {new: true, useFindAndModify: false}
        );
        res.json(updated);
    } catch (err) {
        res.json({message: err});
    }
};
exports.getById = async  (req, res) => {
    try {
        const user  = await users.findById(req.params.id);
        user.password = bcrypt.hashSync(user.password , bcrypt.genSaltSync(10))
        res.json(user);
    } catch (err) {
        res.json({message: err});
    }
};
function parseToken(token) {
    return jwt.verify(token.split(' ')[1],'secret');
    
}


