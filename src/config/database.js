const mongoose = require('mongoose')

const dbUrl = AppConfig.DB_URL

exports.connectToDB = () => {

    mongoose.connect(dbUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log("Database connection established")
    }).catch(err => console.log(err))
}