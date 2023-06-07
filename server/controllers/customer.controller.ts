import bcrypt from "bcrypt";
import { IAddCustomerReq, IGetCustomerReq, IUpdateCustomerReq } from "@/models/Customer.model";
import { Request, Response, RequestHandler } from "express";

import { AuthenticationError } from "@/exceptions/AuthenticationError";
import * as customerServices from "@/services/customer.services";
import { IEmployee } from "@/models/Employee.model";

export const index: RequestHandler = async (request: Request, response: Response) => {
    try {
        const results = await customerServices.fetchAll();    
        if (results == null) response.status(200).json({});
        else {
            const [ customers ] = results;
            response.status(200).json({ customers });
        }
    } catch (error) {
        console.error("[customer.controller.ts][index][error]: ", error);
        response.status(500).json({message: 'Error fetching customers'});
    }
};

export const register: RequestHandler = async (request: IAddCustomerReq, response: Response) => {
    try {
        const employee: IEmployee = request.body;
        employee.password = bcrypt.hashSync(<string>employee.password, 10);

        const { affectedRows } = await customerServices.register(employee);
        response.status(200).json({ results: affectedRows });
    } catch (error) {
        console.error("[customer.controller.ts][register][error]: ", error);
        response.status(500).json({message: 'Error registering customer'});
    }
};

export const authenticate: RequestHandler = async (request: IAddCustomerReq, response: Response) => {
    try {
        const employee: IEmployee = request.body;

        const results = await customerServices.authenticate(employee);
        if (!results) throw new AuthenticationError();

        const [ customerArr ] = results;
        const match = bcrypt.compareSync(<string>employee.password, <string>customerArr[0].password);
        
        if (!match) throw new AuthenticationError();

        request.session.user_id = customerArr[0].id;
        request.session.role = 'customer';

        response.status(200).json({ status: true });
    } catch (error) {
        console.error("[customer.controller.ts][authenticate][error]: ", error);
        if (error instanceof AuthenticationError) {
            response.status(401).json({ message: error.message });
        } else {
            response.status(500).json({message: 'Error authenticating customer'});
        }
    }
};

//@ts-expect-error
export const updateById: RequestHandler = async (request: IUpdateCustomerReq, response: Response) => {
    try {
        
        
    } catch (error) {
        console.error("[customer.controller.ts][updateById][error]: ", error);
        response.status(500).json({message: 'Error updating customers'});
    }
};

//@ts-expect-error
export const destroy: RequestHandler = (request: IGetCustomerReq, response: Response) => {
    try {
        
    } catch (error) {
        console.error("[customer.controller.ts][destroy][error]: ", error);
        response.status(500).json({message: 'Error destroying customer'});
    }
};