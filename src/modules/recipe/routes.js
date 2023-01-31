
const recipeRouter =  require("express").Router()
const { userAuthorized, adminAuthorized } = require("../user/middleware")
const { getRecipes,
        filterRecipe,
        addRecipeToBook,
        approveRecipe,
        rateRecipe,
        getPersonalBook,
        postRecipe  } = require("./controller")



// unprotected routes
recipeRouter.get("/recipes/filter/:category", filterRecipe)

recipeRouter.get("/recipes/:page", getRecipes)

// protected routes
recipeRouter.get("/recipes/personalbook", userAuthorized, getPersonalBook)

recipeRouter.post("/recipes/personalbook/:id",  userAuthorized, addRecipeToBook)

recipeRouter.post("/recipes",  userAuthorized, postRecipe)

recipeRouter.post("/recipes/rating/:id/:rating", userAuthorized, rateRecipe)

recipeRouter.put("/recipes/approve/:id", adminAuthorized, approveRecipe)



module.exports = recipeRouter

