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
                console.log("token error", err)
                throw err
            }
            console.log("payload", payload)
            user = payload
        })
    } catch (err) {
        throw err
    }

    return user
}