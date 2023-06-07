import { Request } from "express";
import * as core from 'express-serve-static-core';

export interface ICustomerAddress {
    id?: number,
    customer_id?:number,
    city: string,
    address: string,
    created_at?: string,
    updated_at?: string
};

export interface IGetCustomerAddressReq extends Request<{id: ICustomerAddress["id"]}, any, any> {};
export interface IAddCustomerAddressReq extends Request<core.Params, ICustomerAddress, any> {};
export interface IUpdateCustomerAddressReq extends Request <{id: ICustomerAddress["id"]}, ICustomerAddress, any>{};