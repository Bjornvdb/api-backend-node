// Validation
const Joi = require('@hapi/joi')

const registerValidation = (data) => {
  const schema = {
    email: Joi.string().required().email(),
    password: Joi.string().min(8).required()
  }
  return Joi.validate(data, schema)
}

const loginValidation = (data) => {
  const schema = {
    email: Joi.string().required().email(),
    password: Joi.string().min(8).required()
  }
  return Joi.validate(data, schema)
}

module.exports.registerValidation = registerValidation
module.exports.loginValidation = loginValidation