import { Request } from "express";
import * as core from 'express-serve-static-core';

export interface IEmployee {
    id?: number,
    employee_no: number,
    first_name: string,
    last_name: string,
    email: string,
    password?: string,
    phone_number: string,
    role: 'waiter' | 'chef' | 'manager',
    location_id: number,
    created_at?: string,
    updated_at?: string
};

export interface IGetEmployeeReq extends Request<{id: IEmployee["id"]}, any, any> {};
export interface IAddEmployeeReq extends Request<core.Params, IEmployee, any> {};
export interface IUpdateEmployeeReq extends Request <{id: IEmployee["id"]}, IEmployee, any>{};
      