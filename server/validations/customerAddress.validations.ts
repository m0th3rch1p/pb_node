import Joi from "joi";

export const idValidationSchema = Joi.object({
    id: Joi.number().min(1).required()
});

export const storeValidationSchema = Joi.object({
   customer_id: Joi.number().required(),
   city: Joi.string().required(),
   address: Joi.string().required() 
});

export const updateValidationSchema = Joi.object({
    id: Joi.number().min(1).required(),
    customer_id: Joi.number().required(),
    city: Joi.string().required(),
    address: Joi.string().required()
});