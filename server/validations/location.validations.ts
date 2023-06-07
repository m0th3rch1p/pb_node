import Joi from "joi";

export const storeValidationSchema = Joi.object({
    name: Joi.string().required(),
    phone_number: Joi.string().required(),
    city: Joi.string().required(),
    country: Joi.string().required()
});

export const updateByIdValidationSchema = Joi.object({
    id: Joi.number().min(1).required(),
    name: Joi.string().required(),
    phone_number: Joi.string().required(),
    city: Joi.string().required(),
    country: Joi.string().required() 
});

export const idValidationSchema = Joi.object({
    id: Joi.number().min(1).required(),
});