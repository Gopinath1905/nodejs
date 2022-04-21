const joi = require('@hapi/joi')
 
const authSchema = joi.object({
    firstname:joi.string().required(),
    lastname:joi.string().required(),
    techstack:joi.string().required(),
    email:joi.string().email().lowercase().required(),
    password:joi.string().min(4).max(8).required()
})

module.exports = {
    authSchema
}