import Joi from 'joi';

export const storeValidationSchema = Joi.object({
    customer_id: Joi.number().required(),
    location_id: Joi.number().required(),
    date_time: Joi.string().required(),
    reservation_tables: Joi.array().required()
});

export const updateValidationSchema = Joi.object({
    id: Joi.number().required(),
    customer_id: Joi.number().required(),
    location_id: Joi.number().required(),
    date_time: Joi.string().required(),
})