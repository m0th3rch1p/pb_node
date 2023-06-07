
import { Request } from "express";
import * as core from 'express-serve-static-core';

export interface IMenuItem {
    id?: number,
    menu_id?: number,
    name: string,
    description: string,
    image_uri: string,
    price: number,
    created_at?: string,
    updated_at?: string
};

export interface IGetMenuItemReq extends Request<{id: IMenuItem["id"]}, any, any> {};
export interface IAddMenuItemReq extends Request<core.Params, IMenuItem, any> {};
export interface IUpdateMenuItemReq extends Request <{id: IMenuItem["id"]}, IMenuItem, any>{};