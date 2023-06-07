import { Request } from "express";
import * as core from 'express-serve-static-core';

export interface ICustomer {
    id?: number,
    email: string,
    password?: string, 
    created_at?: string,
    updated_at?: string
};




export interface IGetCustomerReq extends Request<{id: ICustomer["id"]}, any, any> {};
export interface IAddCustomerReq extends Request<core.Params, ICustomer, any> {};
export interface IUpdateCustomerReq extends Request <{id: ICustomer["id"]}, ICustomer, any>{};