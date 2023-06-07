import { Request, Response, NextFunction } from "express";
import { ValidationError } from 'joi';
import * as locationValidations from "@/validations/location.validations";

export const storeLocationPolicy = (request: Request, response: Response, next: NextFunction) => {
    try {
        const { error, value } = locationValidations.storeValidationSchema.validate(request.body);
        if (error) throw new ValidationError(error.message, error.details, error._original);
        
        next();
    } catch (error) {
        console.error("[location.policies.ts][storeLocationPolicy][error]: ", error);
        if (error instanceof ValidationError) {
            response.status(422).json({ errors: error.details });
        } else {
            response.status(500).json({ message: 'Error storing location.' });
        }
    }
};

export const updateLocationPolicy = (request: Request, response: Response, next: NextFunction) => { 
    try {
        const { error, value } = locationValidations.updateByIdValidationSchema.validate({...request.params, ...request.body});
        if (error) throw new ValidationError(error.message, error.details, error._original);

        next();
    } catch (error) {
        console.error("[location.policies.ts][updateLocationPolicy][error]: ", error);
        if (error instanceof ValidationError) {
            response.status(422).json({ errors: error.details });
        } else {
            response.status(500).json({ message: 'Error updating location.' });
        }
    }
};