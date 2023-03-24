
const recipeRouter =  require("express").Router()
const { userAuthorized, adminAuthorized } = require("../user/middleware")
const { getRecipes,
        filterRecipe,
        addRecipeToBook,
        approveRecipe,
        rateRecipe,
        getPersonalBook,
        postRecipe  } = require("./controller")



// recipes routes
recipeRouter.get("/recipes/:page", getRecipes)
recipeRouter.get("/recipes/:category/:page", filterRecipe)
recipeRouter.post("/recipes",  userAuthorized, postRecipe)


// rating
recipeRouter.post("/rate/:id/", userAuthorized, rateRecipe)


// personal book routes
recipeRouter.get("/personal-book", userAuthorized, getPersonalBook)
recipeRouter.post("/personal-book/:id",  userAuthorized, addRecipeToBook)

// admin route
recipeRouter.put("/admin/recipes", adminAuthorized, approveRecipe)
recipeRouter.put("/admin/approve/:id", adminAuthorized, approveRecipe)




module.exports = recipeRouter

