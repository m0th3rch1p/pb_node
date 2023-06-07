import { ValidationError } from 'joi';
import { IAddCustomerAddressReq, ICustomerAddress, IGetCustomerAddressReq, IUpdateCustomerAddressReq } from "@/models/CustomerAddress.model";
import { Request, Response, RequestHandler } from "express";
import * as customerAddressServices from "@/services/customerAddress.services";

export const index: RequestHandler = async (request: Request, response: Response) => {
    try {
        const results = await customerAddressServices.fetchAll();
        if (!results) throw new Error("Error fetching customer addresses");

        const [ customerAddresses ] = results;
        response.status(200).json({ customerAddresses });
    } catch (error) {
        console.error("[customerAddress.controller.ts][index][error]: ", error);
        response.status(500).json({message: 'Error fetching customerAddress'});
    }
};

export const fetchById = async (request: IGetCustomerAddressReq, response: Response) => {
    try {
        const results = await customerAddressServices.fetchById(<number>request.params.id);
        if (!results) throw new Error();
        response.status(200).json({ customerAddress: results[0] });
    } catch (error) {
        console.error("[customerAddress.controller.ts][fetchById][error]: ", error);
        if (error instanceof ValidationError) {
            response.status(422).json({message: error.message});
        } else {
            response.status(500).json({message: 'Error fetching customer address by id'});
        }
    }
};

export const fetchByCustomerId = async (request: IGetCustomerAddressReq, response: Response) => {
    try {
        const results = await customerAddressServices.fetchByCustomerId(<number>request.params.id);
        if (!results) throw new Error();

        response.status(200).json({ customer: results[0] });
    } catch (error) {
        console.error("[customerAddress.controller.ts][fetchCustomerById][error]: ", error);
        if (error instanceof ValidationError) {
            response.status(422).json({message: error.message});
        } else {
            response.status(500).json({message: 'Error fetching customer address by customer id'});
        }
    }
};

export const store: RequestHandler = async (request: IAddCustomerAddressReq, response: Response) => {
    try {
        const customerAddress: ICustomerAddress = request.body;

        const results = await customerAddressServices.store(customerAddress);
        response.status(200).json({ status: results?.affectedRows });
    } catch (error) {
        console.error("[customerAddress.controller.ts][store][error]: ", error);
        if (error instanceof ValidationError) {
            response.status(422).json({message: error.message});
        } else {
            response.status(500).json({message: 'Error storing customer address'});
        }
    }
};

//@ts-expect-error
export const updateById: RequestHandler = async (request: IUpdateCustomerAddressReq, response: Response) => {
    try {
        
    } catch (error) {
        console.error("[customerAddress.controller.ts][updateById][error]: ", error);
        if (error instanceof ValidationError) {
            response.status(422).json({message: error.message});
        } else {
            response.status(500).json({message: 'Error updating customer address'});
        }
    }
};

//@ts-expect-error
export const destroyById: RequestHandler = async (request: IGetCustomerAddressReq, response: Response) => {
    try {
        const results = await customerAddressServices.deleteById(<number>request.params.id);
        response.status(200).json({status: results?.affectedRows});
    } catch (error) {
        console.error("[customerAddress.controller.ts][destroyById][error]: ", error);
        if (error instanceof ValidationError) {
            response.status(422).json({message: error.message});
        } else {
            response.status(500).json({message: 'Error deleting customer address'});
        }
    }
};