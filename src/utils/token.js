const jwt = require('jsonwebtoken')

const SECRET = AppConfig.JWT_SECRET

exports.generateToken = async (user) => {
    token = jwt.sign(user, SECRET, { expiresIn: "3h"})
    return token
}

exports.verifyToken = async(token) => {
    let user
    try {
        jwt.verify(token, SECRET, (err, payload)=> {
            if (err){
                console.log("token error", err.message)
                throw Error(err.message)
            }
            user = payload
        })
    } catch (err) {
        throw Error(err)
    }

    return user
}