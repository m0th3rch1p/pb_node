import { ValidationError } from 'joi';
import { Request, Response, NextFunction } from 'express';
import { storeValidationSchema, updateValidationSchema } from '@/validations/reservation.validations';

export const storeReservationPolicy = (request: Request, response: Response, next: NextFunction) => {
    try {
        const { error, value } = storeValidationSchema.validate(request.body);
        if (error) throw new ValidationError(error.message, error.details, error._original);

        next();   
    } catch (error) {
        console.error(`[reservation.policies.ts][storeReservationPolicy][error]: `, error);
        if (error instanceof ValidationError) {
            response.status(422).json({ errors: error.details })
        } else {
            response.status(500).json({message: `Error storing menu. Policy failed`})
        }
    }
};

export const updateReservationPolicy = (request: Request, response: Response, next: NextFunction) => {
    try {
        const { error, value } = updateValidationSchema.validate({...request.params, ...request.body});
        if (error) throw new ValidationError(error.message, error.details, error._original);
        
        next();
    } catch (error) {
        console.error("[reservation.policies.ts][updateReservationPolicy][error]: ", error);
        if (error instanceof ValidationError) {
            response.status(422).json({ errors: error.details });
        } else {
            response.status(500).json({ message: 'Error updating reservation.' });
        }
    }
};