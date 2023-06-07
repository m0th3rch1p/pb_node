
import { Request } from "express";
import * as core from 'express-serve-static-core';

export interface ITable {
    id?: number,
    locaation_id?: number,
    table_number: number,
    occupants: number,
    status: 'open' | 'occupied' | 'reserved',
    created_at?: string,
    updated_at?: string
};

export interface IGetTableReq extends Request<{id: ITable["id"]}, any, any> {};
export interface IAddTableReq extends Request<core.Params, ITable, any> {};
export interface IUpdateTableReq extends Request <{id: ITable["id"]}, ITable, any>{};