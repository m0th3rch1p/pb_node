
import { Request } from "express";
import * as core from 'express-serve-static-core';

export interface IHouseOrder {
    id?: number,
    table_id?: number,
    employee_id?: number,
    location_id?: number,
    status: boolean,
    total: number,
    payment_method: 'mpesa' | 'paypal' | 'cash',
    payment_status?: 'queue' | 'pending' | 'complete',
    created_at?: string,
    updated_at?: string
};

export interface IGetHouseOrderReq extends Request<{id: IHouseOrder["id"]}, any, any> {};
export interface IAddHouseOrderReq extends Request<core.Params, IHouseOrder, any> {};
export interface IUpdateHouseOrderReq extends Request <{id: IHouseOrder["id"]}, IHouseOrder, any>{};