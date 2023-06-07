import { Request } from "express";
import * as core from 'express-serve-static-core';

export interface IOnlineOrder {
    id?: number,
    customer_id?: number,
    customer_address_id?: number,
    status?: 'payment_pending' | 'pending' | 'dispatched' | 'delivered',
    total?: number,
    payment_method?: 'mpesa' | 'paypal',
    payment_status?: 'paid' | 'unpaid',
    created_at?: string,
    updated_at?: string
};

export interface IGetOnlineOrderReq extends Request<{id: IOnlineOrder["id"]}, any, any> {};
export interface IAddOnlineOrderReq extends Request<core.Params, IOnlineOrder, any> {};
export interface IUpdateOnlineOrderReq extends Request <{id: IOnlineOrder["id"]}, IOnlineOrder, any>{};