import { Request, Response, NextFunction } from "express";
import { ValidationError } from "joi";
import { storeValidationSchema, updateValidationSchema } from "@/validations/onlineOrder.validations";

export const storeReservationPolicy = (request: Request, response: Response, next: NextFunction) => {
    try {
        const { error, value } = storeValidationSchema.validate(request.body);
        if (error) throw new ValidationError(error.message, error.details, error._original);

        next();   
    } catch (error) {
        console.error(`[onlineOrder.policies.ts][storeOnlineOrderPolicy][error]: `, error);
        if (error instanceof ValidationError) {
            response.status(422).json({ errors: error.details })
        } else {
            response.status(500).json({message: `Error storing online order. Policy failed`})
        }
    }
};

export const updateReservationPolicy = (request: Request, response: Response, next: NextFunction) => {
    try {
        const { error, value } = updateValidationSchema.validate({...request.params, ...request.body});
        if (error) throw new ValidationError(error.message, error.details, error._original);
        
        next();
    } catch (error) {
        console.error("[onlineOrder.policies.ts][updateOnlineOrderPolicy][error]: ", error);
        if (error instanceof ValidationError) {
            response.status(422).json({ errors: error.details });
        } else {
            response.status(500).json({ message: 'Error updating online order.' });
        }
    }
};