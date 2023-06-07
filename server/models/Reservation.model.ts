
import { Request } from "express";
import * as core from 'express-serve-static-core';

export interface IReservation {
    id?: number,
    customer_id?: number,
    location_id?: number,
    date_time: string,
    created_at?: string,
    updated_at?: string
};

export interface IGetReservationReq extends Request<{id: IReservation["id"]}, any, any> {};
export interface IAddReservationReq extends Request<core.Params, IReservation, any> {};
export interface IUpdateReservationReq extends Request <{id: IReservation["id"]}, IReservation, any>{};