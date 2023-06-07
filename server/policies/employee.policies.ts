import { Request, Response, NextFunction } from "express";
import * as employeeValidations from "@/validations/employee.validations";
import { ValidationError } from 'joi';

export const registerEmployeePolicy = (request: Request, response: Response, next: NextFunction) => {
    try {
        const { error, value } = employeeValidations.registerValidationSchema.validate(request.body);
        if (error) throw new ValidationError(error.message, error.details, error._original);

        next();
    } catch (error) {
        console.error("[employee.policies.ts][fetchByIdCustomerAddressPolicy][error]: ", error);
        if (error instanceof ValidationError) {
            response.status(422).json({ errors: error.details });
        } else {
            response.status(500).json({ message: 'Error registering employee.' });
        }
    }
};
