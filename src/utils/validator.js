const Joi = require("joi")

exports.validateInput = async (schema, data) => {
    try {
        let valid = await schema.validateAsync(data)
        return valid
    } catch (err) {
        throw err
    }
}