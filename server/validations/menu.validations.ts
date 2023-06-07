import Joi from "joi";

export const storeValidationSchema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    location_id: Joi.number().min(1).required()
});

export const updateValidationSchema = Joi.object({
    id: Joi.number().min(1).required(),
    name: Joi.string().required(),
    description: Joi.string().required(),
    location_id: Joi.number().min(1).required()
});