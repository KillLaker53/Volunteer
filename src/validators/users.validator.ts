import Joi from 'joi'

export const userValidationSchema = Joi.object({
    username: Joi.string().min(3).max(30).required(),
    password: Joi.string().min(8).required(),
    email: Joi.string().email().required(),
    firstName: Joi.string().min(1).required(),
    lastName: Joi.string().min(1).required(),
    phone: Joi.string().pattern(/^[0-9]{10}$/).required(),
    role: Joi.string().valid('user', 'volunteer', 'admin').required()

});