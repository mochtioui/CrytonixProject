const mongoose = require('mongoose')

mongoose.connect("mongodb+srv://miyade:*****@cluster0.bj4za.mongodb.net/myFirstDatabase?authSource=admin&replicaSet=atlas-nh5axh-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }, () =>
    console.log('connected to DB!')
)
