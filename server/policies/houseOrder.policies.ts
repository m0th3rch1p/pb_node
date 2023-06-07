import { Request, Response, NextFunction } from "express";
import { ValidationError } from 'joi';
import * as houseOrderValidations from "@/validations/houseOrder.validations";

export const storeHouseOrderPolicy = (request: Request, response: Response, next: NextFunction) => {
    try {
        const { error, value } = houseOrderValidations.storeValidationSchema.validate(request.body);
        if (error) throw new ValidationError(error.message, error.details, error._original);

        next();
    } catch (error) {
        console.error("[houseOrder.policies.ts][storeHouseOrderPolicy][error]: ", error);
        if (error instanceof ValidationError) {
            response.status(422).json({ errors: error.details });
        } else {
            response.status(500).json({ message: 'Error storing house order.' });
        }
    }
};