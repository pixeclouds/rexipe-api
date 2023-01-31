const userRouter = require('express').Router()
const { signup, login} = require("./controller.js")

userRouter.get('/user', login)
userRouter.post('/user', signup)

module.exports = userRouter