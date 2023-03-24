const mongoose = require("mongoose")
const { v4 } = require("uuid")
const Joi = require("joi")

//database schema
const Schema = mongoose.Schema
const userShema = new Schema({
    _id: {
        type: String,
        default: v4()
    },
    username: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    }, 
    userType: {
        type: String,
        enum: ["User", "Admin"],
        default: "User"
    },
    recipeBook: [{
        type: Schema.Types.String,
        ref: 'recipe'
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }

})

const User = mongoose.model('user', userShema)


// joi validator schema
const userValidatorSchema = Joi.object({
    username: Joi.string()
                .min(5)
                .max(20)
                .required(),

    password: Joi.string()
                .alphanum()
                .min(8)
                .required()
})

module.exports = { User, userValidatorSchema }
// module.exports = User