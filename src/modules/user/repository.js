const { User}  = require('./schema.js')
const { v4 } = require('uuid')


exports.getUser = async (username) => {
    return await User.findOne({ username })
}



exports.checkIfUserExists = async (username) => {
    return User.findOne({ username })
}

exports.createNewUser = async (username, password) => {
    let _id = v4()
    let newUser = new User({_id, username, password})
    // let newUser = new User({ username, password })
    await newUser.save()
    
    //filter result
    newUser = {
        _id: newUser._id,
        username: newUser.username
    }
    return newUser
}