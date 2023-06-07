import { Request } from "express";
import * as core from 'express-serve-static-core';

export interface ILocation {
    id?: number,
    name: string,
    phone_number: string,
    city: string,
    country: string
};

export interface IGetLocationReq extends Request<{id: ILocation["id"]}, any, any> {};
export interface IAddLocationReq extends Request<core.Params, ILocation, any> {};
export interface IUpdateLocationReq extends Request <{id: ILocation["id"]}, ILocation, any>{};
