import { ValidationError } from 'joi';
import { Request, Response, NextFunction } from "express";

import { storeValidationSchema, updateValidationSchema } from '@/validations/menuItem.validations';

export const storeMenuItemPolicy = (req: Request, res: Response, next: NextFunction) => {
    try {
        const { error, value } = storeValidationSchema.validate(req.body);
        if (error) throw new ValidationError(error.message, error.details, error._original);

        next();
    } catch (error) {
        console.log(`[menuItem.policies.ts][storeMenuItemPolicy][error]: `, error);
        if (error instanceof ValidationError) {
            res.status(422).json({ errors: error.details })
        } else {
            res.status(500).json({message: `Error storing menu. Policy failed`})
        }
    }
};

export const updateMenuItemPolicy = (request: Request, response: Response, next: NextFunction) => {
    try {
        const { error, value } = updateValidationSchema.validate({...request.params, ...request.body});
        if (error) throw new ValidationError(error.message, error.details, error._original);
        
        next();
    } catch (error) {
        console.error("[menuItem.policies.ts][updateMenuItemPolicy][error]: ", error);
        if (error instanceof ValidationError) {
            response.status(422).json({ errors: error.details });
        } else {
            response.status(500).json({ message: 'Error updating menu item.' });
        }
    }
};