const Joi = require("joi")
const mongoose = require("mongoose")
const Schema = mongoose.Schema

const recipeSchema = new Schema({
    _id: {
        type: String,
        required: true
    },

    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    ingredients: [{
        type: String,
        required: true
    }],
    category: {
        type: String,
        enum: ["Desserts", "Soups", "Appetizers", "Beef", "Beverages"],
        required: true
    },
    imageUrl: {
        type: String
    },
    user: {
        type: Schema.Types.String,
        ref: "User"
    },
    rating: [{
        user: {
            type: Schema.Types.String,
            ref: "User"
        },
        rating: {
            type: Number,
        }
    }],
    approved: {
        type: Boolean,
        default: false
    },
    creadtedAt: {
        type: Date,
        default: Date.now
    }
})

const Recipe =  mongoose.model("recipe", recipeSchema)


// joi validator schema
const recipeValidatorSchema = Joi.object({
    title: Joi.string()
            .max(100)
            .required(),
    description: Joi.string()
            .required(),
    ingredients: Joi.array()
            .items(Joi.string())
            .required(),
    category: Joi.string()
            .required(),
    imageUrl: Joi.string(),
    
})

module.exports = { Recipe, recipeValidatorSchema }