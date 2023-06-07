import Joi from 'joi';

export const storeValidationSchema = Joi.object({
    customer_id: Joi.number().required(),
    customer_address_id: Joi.number().required(),
    status: Joi.string().required(),
    total: Joi.number().required(),
    payment_method: Joi.string().required(),
});

export const updateValidationSchema = Joi.object({
    id: Joi.number().required(),
    customer_id: Joi.number().required(),
    customer_address_id: Joi.number().required(),
    status: Joi.string().required(),
    total: Joi.number().required(),
    payment_method: Joi.string().required(),
})