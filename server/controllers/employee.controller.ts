import bcrypt from "bcrypt";
import { IAddEmployeeReq, IEmployee, IGetEmployeeReq, IUpdateEmployeeReq } from "@/models/Employee.model";
import { Request, Response, RequestHandler } from "express";
import * as employeeServices from "@/services/employee.services";
import { AuthenticationError } from "@/exceptions/AuthenticationError";

export const index: RequestHandler = async (request: Request, response: Response) => {
    try {
        const results = await employeeServices.fetchAll();
        if (!results) throw new Error();

        response.status(200).json({ employees: results[0] });
    } catch (error) {
        console.error("[employee.controller.ts][index][error]: ", error);
        response.status(500).json({message: 'Error fetching employee'});
    }
};

export const register: RequestHandler = async (request: IAddEmployeeReq, response: Response) => {
    try {
        const employee: IEmployee = request.body;

        employee.password = bcrypt.hashSync(<string>employee.password, 10);
        const results = await employeeServices.register(employee);

        response.status(299).json({status: results?.affectedRows});
    } catch (error) {
        console.error("[employee.controller.ts][register][error]: ", error);
        response.status(500).json({message: 'Error registering employee'});
    }
};

export const authenticate: RequestHandler = async (request: Request, response: Response) => {
    try {
        const employee: IEmployee = request.body;

        const results = await employeeServices.authenticate(employee);
        if (!results) throw new AuthenticationError();

        const match = bcrypt.compareSync(<string>employee.password, <string>results[0].password);
        if (!match) throw new AuthenticationError();

        request.session.user_id = results[0].id;
        request.session.role = results[0].role;

        response.status(200).json({status: 1});
    } catch (error) {
        console.error("[employee.controller.ts][authenticate][error]: ", error);
        if (error instanceof AuthenticationError) {
            response.status(401).json({message: error.message});
        } else {
            response.status(500).json({message: 'Error authenticating employee'});
        }
    }
};

//@ts-expect-error
export const updateById: RequestHandler = async (request: IUpdateEmployeeReq, response: Response) => {
    try {
        
    } catch (error) {
        console.error("[employee.controller.ts][update][error]: ", error);
        response.status(500).json({message: 'Error updating employee'});
    }
};

//@ts-expect-error
export const destroyById: RequestHandler = async (request: IGetEmployeeReq, response: Response) => {
    try {
        
    } catch (error) {
        console.error("[employee.controller.ts][destroy][error]: ", error);
        response.status(500).json({message: 'Error destroying employee'});
    }
};