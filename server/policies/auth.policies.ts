import { ValidationError } from 'joi';
import { Request, Response, NextFunction } from "express";

import * as customerValidations from "@/validations/customer.validations";

export const authenticationPolicy = (request: Request, response: Response, next: NextFunction) => {
    try {
        const { error } = customerValidations.authSchema.validate(request.body);
        if (error) throw new ValidationError(error.message, error.details, error._original);

        return next();
    } catch (error) {
        console.error("[auth.policies.ts][authenticationPolicy][error]: ", error);
        if (error instanceof ValidationError) {
            response.status(422).json({ errors: error.details });
        } else {
            response.status(500).json({ message: 'Error signing up.' });
        }
    }
};
