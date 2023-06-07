import { Request } from "express";
import * as core from 'express-serve-static-core';

export interface IHouseOrderItem {
    id?: number,
    house_order_id?: number,
    menu_item_id?: number,
    quantity: number,
    price: number,
    created_at?: string,
    updated_at?: string
};

export interface IGetHouseOrderItemReq extends Request<{id: IHouseOrderItem["id"]}, any, any> {};
export interface IAddHouseOrderItemReq extends Request<core.Params, IHouseOrderItem, any> {};
export interface IUpdateHouseOrderItemReq extends Request <{id: IHouseOrderItem["id"]}, IHouseOrderItem, any>{};