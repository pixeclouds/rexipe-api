require("dotenv").config()
require("./src/config/keys")
const express = require('express')
const { connectToDB } = require('./src/config/database')
const app = express()
const userRouter = require('./src/modules/user/routes')
const recipeRouter = require('./src/modules/recipe/routes')

app.use(express.json())


app.use(userRouter)
app.use(recipeRouter)

app.get('/', (req, res) => {
    res.json("REXIPII is live... ")
})

connectToDB()
const PORT = process.env.PORT
app.listen(PORT, ()=> {
    console.log(`App is running on port ${PORT}`)
})