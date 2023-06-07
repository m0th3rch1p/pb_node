import Joi from "joi";

export const authSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(3).max(35)
});

export const idValidationSchema = Joi.object({
    id: Joi.number().min(1)
});

export const updateByIdValidationSchema = Joi.object({
    id: Joi.number().min(1),
    email: Joi.string().email().required(),
    password: Joi.string().min(3).max(35)
});