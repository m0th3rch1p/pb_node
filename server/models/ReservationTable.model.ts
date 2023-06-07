import { Request } from "express";
import * as core from 'express-serve-static-core';

export interface IReservationTable {
    id?: number,
    reservation_id?: number,
    table_id?: number,
    created_at?: string,
    updated_at?: string
};

export interface IGetReservationTableReq extends Request<{id: IReservationTable["id"]}, any, any> {};
export interface IAddReservationTableReq extends Request<core.Params, IReservationTable, any> {};
export interface IUpdateReservationTableReq extends Request <{id: IReservationTable["id"]}, IReservationTable, any>{};