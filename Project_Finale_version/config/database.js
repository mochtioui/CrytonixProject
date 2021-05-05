const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://test:test1234@cluster0-hnliw.gcp.mongodb.net//*crytonix*/?authSource=admin&replicaSet=Cluster0-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }, () =>
    console.log('connected to DB!')
)
