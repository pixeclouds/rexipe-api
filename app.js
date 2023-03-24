require("dotenv").config()
require("./src/config/keys")
const express = require('express')
const { connectToDB } = require('./src/config/database')
const app = express()
const recipeRouter = require('./src/modules/recipe/routes')

const userRouter = require('./src/modules/user/routes')
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./src/docs/rexipe-api.json');


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(express.json())

app.use(recipeRouter)

app.use(userRouter)

app.get('/', (req, res) => {
    res.redirect("/api-docs")

})

connectToDB()
const PORT = process.env.PORT
app.listen(PORT, ()=> {
    console.log(`App is running on port ${PORT}`)
})