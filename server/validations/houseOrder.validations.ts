import Joi from "joi";

export const idValidationSchema = Joi.object({
    id: Joi.number().min(1).required()
});

export const storeValidationSchema = Joi.object({
    table_id: Joi.number().required(),
    employee_id: Joi.number().required(),
    location_id: Joi.number().required(),
    house_order_items: Joi.array().min(1).required(),
});
