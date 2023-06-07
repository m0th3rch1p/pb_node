import { Request } from "express";
import * as core from 'express-serve-static-core';

export interface IOnlineOrderItem {
    id?: number,
    online_order_id?: number,
    menu_item_id?: number,
    quantity: number,
    price: number,
    created_at?: string,
    updated_at?: string
};

export interface IGetOnlineOrderItemReq extends Request<{id: IOnlineOrderItem["id"]}, any, any> {};
export interface IAddOnlineOrderItemReq extends Request<core.Params, IOnlineOrderItem, any> {};
export interface IUpdateOnlineOrderItemReq extends Request <{id: IOnlineOrderItem["id"]}, IOnlineOrderItem, any>{};