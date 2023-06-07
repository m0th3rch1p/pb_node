
import { Request } from "express";
import * as core from 'express-serve-static-core';

export interface IMenu {
    id?: number,
    name: string,
    description: string,
    image_uri: string,
    location_id?: number,
    created_at?: string,
    updated_at?: string
};

export interface IGetMenuReq extends Request<{id: IMenu["id"]}, any, any> {};
export interface IAddMenuReq extends Request<core.Params, IMenu, any> {};
export interface IUpdateMenuReq extends Request <{id: IMenu["id"]}, IMenu, any>{};