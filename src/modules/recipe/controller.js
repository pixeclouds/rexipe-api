const { validateInput } = require("../../utils/validator")
const  { getAllRecipes, 
        postARecipe, 
        getFiltered,
        addRecipe,
        getPersonal,
        approveARecipe ,
        rateARecipe } = require("./repository")
const { recipeValidatorSchema } = require("./schema")


//get recipe catalog
exports.getRecipes =  async(req, res) => {
    let page = req.params.page || 1

    try {
        //get recipes
        let result = await getAllRecipes(page)
        
        res.status(200).json({
            "meta": {
                "page": page,
                "total": result.totalPages
            },
            "recipes": result.recipes
        })
        
    } catch (err) {
        res.status(400).json({
            "Error": err.message
        })
    }
}


// get filtered recipes
exports.filterRecipe = async(req, res) => {
    let page = req.params.page || 1
    
    //query definition
    let query = { approved: true}
    if (req.query.category){
        query.category = req.query.category
    }

    try {
        let result = await getFiltered(page, query)

        res.status(200).json({
            "meta": {
                "page": result.page,
                "total": result.totalPages
            },
            "Recipes": result.recipes
        })
    } catch (err) {
        res.status(400).json({
            "Error": err.message
        })
    }

}


// add a recipe to personal book
exports.addRecipeToBook = async(req, res) => {
    //retrieve auth user from auth middleware 
    let user = req.user

    let recipeId = req.params.id
    try {
        let result = await addRecipe(user, recipeId)
        res.status(200).json({
            "Message": "Recipe added to your personal book"
        })
    } catch (err) {
        res.status(400).json({
            "Error": err.message
        })
    }
}


// retrieve all recipes in personal book
exports.getPersonalBook = async(req, res) => {
    let user = req.user

    try {
        let { recipeBook } = await getPersonal(user)

        res.status(200).json({
            "Recipes": recipeBook
        })
    } catch (error) {
        
    }
}

// approve a submitted recipe before its added to the catalog
exports.approveRecipe = async(req, res) => {
    let recipeId = req.params.id
    try {
        let result = await approveARecipe(recipeId)
        if (result){
            res.status(200).json({
                "Message": "Recipe Approved."
            })
        }
        
    } catch (err) {
        res.status(400).json({
            "Error": err.message
        })
    }
}

//  rate a recipe
exports.rateRecipe = async(req, res) => {
    let user = req.user
    let recipeId = req.params.id
    let rating = req.params.rating 

    let newRating = {
        user,
        rating
    }

    try {
        let ratings = await rateARecipe(newRating, recipeId)
        res.status(200).json({
            "Message": "Rating Success",
            "recipeId": ratings._id,
            "ratings": ratings.ratings
        })
        
    } catch (err) {
        res.status(400).json({
            "Error": err.message
        })
    }
}


// submit a recipe for approval
exports.postRecipe = async(req, res) => {

    let user = req.user
    let recipe = req.body

    try {
        //validate inputs
        let isValid = await validateInput(recipeValidatorSchema, recipe)
        if(!isValid){
            throw Error
        }

        let newRecipe = await postARecipe(user, recipe)
        
        res.status(200).json({
            "Message": "Recipe submitted. Kindly wait for approval ",
            "user": user,
            "Recipe": newRecipe
        })

    } catch (err) {
        res.status(400).json({
            "Error": err.message

        })
    }

}