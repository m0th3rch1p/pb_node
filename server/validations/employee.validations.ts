import Joi from "joi";

export const idValidationSchema = Joi.object({
    id: Joi.number().min(1).required()
});

export const registerValidationSchema = Joi.object({
   first_name: Joi.string().required(),
   last_name: Joi.string().required(),
   email: Joi.string().email().required(),
   phone_number: Joi.string().required(),
   password: Joi.string().required() 
});

export const authValidationSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required().min(4).max(35)
});