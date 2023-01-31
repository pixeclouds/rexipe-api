const { Recipe } = require("./schema")
const { v4 } = require("uuid")
const { User } = require("../user/schema")


//
exports.getAllRecipes= async(page) => {
    let limit = 10
    let totalPages = await Recipe.find({ approved: true})
                        .count()
    let recipes =  await Recipe.find({approved: true})
                    .limit(10)
                    .skip((page - 1) * limit)
    //filter result    
    return {
        recipes,
        totalPages
    }
}

//
exports.getFiltered = async(page, query) =>{

    let limit = 10
    let totalPages = await Recipe.find(query)
                        .count()
    let recipes = await  Recipe.find(query)
                    .limit(10)
                    .skip((page - 1) * limit)
    return {
        recipes,
        page,
        totalPages
    }
}


exports.addRecipe = async(user, recipeId) => {
    user = await User.findById(user)
    user.recipeBook.push(recipeId)
    await user.save()
    
    return {
        _id: user._id,
        recipeBook: user.recipeBook
    }
}

exports.getPersonal = async(user) => {
    let result
    User.findById(user)
                        .populate("recipeBook")
                        .exec((err, book) => {
                            if (err){ return err}
                            result = book
                        })

    console.log("persoanl book from repo", result)
    return result
}

exports.approveARecipe = async(recipeId) => {

    let recipe = await Recipe.findById(recipeId)
    recipe.approved = true

    await recipe.save()

    return {
        approved : recipe.approved
    }
}

exports.postARecipe= async (user, recipe) => {
    let _id = v4()
    let newRecipe = new Recipe({_id,user, ...recipe})
    newRecipe.save()
    
    return {
        _id: newRecipe._id,
        title: newRecipe.title,
        description: newRecipe.description,
        ingredients: newRecipe.ingredients,
        category: newRecipe.category
    }
}

exports.rateARecipe = async (newRating, recipe) => {
    recipe = await Recipe.findById(recipe)
    recipe.rating.push(newRating)
    await recipe.save()

    console.log("rate saved", recipe)

    return {
        _id : recipe._id,
        ratings: recipe.rating
    }

}