import { ValidationError } from 'joi';
import { Request, Response, NextFunction } from "express";

import * as customerValidations from "@/validations/customer.validations";

export const authCustomerPolicy = (request: Request, response: Response, next: NextFunction) => {
    try {
        const { error } = customerValidations.authSchema.validate(request.body);
        if (error) throw new ValidationError(error.message, error.details, error._original);

        return next();
    } catch (error) {
        console.error("[customer.policies.ts][authCustomerPolicy][error]: ", error);
        if (error instanceof ValidationError) {
            response.status(422).json({ errors: error.details });
        } else {
            response.status(500).json({ message: 'Error signing up.' });
        }
    }
};

export const updateCustomerPolicy = (request: Request, response: Response, next: NextFunction) => {
    try {
        
    } catch (error) {
        console.error("[customer.policies.ts][updateCustomerPolicy][error]: ", error);
        if (error instanceof ValidationError) {
            response.status(422).json({ errors: error.details });
        } else {
            response.status(500).json({ message: 'Error updating customer' });
        }
    }
};