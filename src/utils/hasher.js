const bcrypt = require("bcrypt")

exports.hashPassword = async(password) => {
    saltRounds = 10
    return await bcrypt.hash(password, saltRounds)
}

exports.comparePasswords = async (password1, password2) => {
    return await bcrypt.compare(password1, password2)
}