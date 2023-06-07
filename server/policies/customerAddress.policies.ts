import { Request, Response, NextFunction } from "express";
import { ValidationError } from 'joi';
import * as customerAddressValidations from "@/validations/customerAddress.validations";

export const storeCustomerAddressPolicy = (request: Request, response: Response, next: NextFunction) => {
    try {
        const { error, value } = customerAddressValidations.storeValidationSchema.validate(request.body);
        if (error) throw new ValidationError(error.message, error.details, error._original);
       
        next();
    } catch (error) {
        console.error("[customerAddress.policies.ts][storeCustomerAddressPolicy][error]: ", error);
        if (error instanceof ValidationError) {
            response.status(422).json({ errors: error.details });
        } else {
            response.status(500).json({ message: 'Error saving customer address.' });
        }
    }
};

export const fetchByIdCustomerAddressPolicy = (request: Request, response: Response, next: NextFunction) => {
    try {
        const { error, value } = customerAddressValidations.idValidationSchema.validate(request.params);
        if (error) throw new ValidationError(error.message, error.details, error._original);
        
        next();
    } catch (error) {
        console.error("[customerAddress.policies.ts][fetchByIdCustomerAddressPolicy][error]: ", error);
        if (error instanceof ValidationError) {
            response.status(422).json({ errors: error.details });
        } else {
            response.status(500).json({ message: 'Error fetching customer address.' });
        }
    }
};

export const updateCustomerAddressPolicy = (request: Request, response: Response, next: NextFunction) => {
    try {
        const { error, value } = customerAddressValidations.updateValidationSchema.validate({...request.params, ...request.body});
        if (error) throw new ValidationError(error.message, error.details, error._original);

        next();
    } catch (error) {
        console.error("[customerAddress.policies.ts][updateCustomerAddressPolicy][error]: ", error);
        if (error instanceof ValidationError) {
            response.status(422).json({ errors: error.details });
        } else {
            response.status(500).json({ message: 'Error updating customer address.' });
        }      
    }
};