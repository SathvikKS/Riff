const mongoose = require('mongoose')

mongoose.connect(process.env.mongooseURL, {
    useNewUrlParser: true,
})