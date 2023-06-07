import { IAddMenuReq, IGetMenuReq, IUpdateMenuReq } from "@/models/Menu.model";
import { Request, Response, RequestHandler } from "express";

import * as menuServices from '@/services/menu.services';
export const index: RequestHandler = async (request: Request, response: Response) => {
    try {
        const menus  = await menuServices.fetchAll();
        response.status(200).json({ menus })        
    } catch (error) {
        console.error("[menu.controller.ts][index][error]: ", error);
        response.status(500).json({message: 'Error fetching menu'});
    }
};

export const store: RequestHandler = async (request: IAddMenuReq, response: Response) => {
    try {
        const results = await menuServices.store(request.body);
        response.status(200).json({ status: results?.affectedRows });
    } catch (error) {
        console.error("[menu.controller.ts][store][error]: ", error);
        response.status(500).json({message: 'Error storing menu'});
    }
};

//@ts-expect-error
export const updateById: RequestHandler = async (request: IUpdateMenuReq, response: Response) => {
    try {
        const results = await menuServices.updateById({...request.params, ...request.body});
        response.status(200).json({ status: results?.affectedRows })
    } catch (error) {
        console.error("[menu.controller.ts][update][error]: ", error);
        response.status(500).json({message: 'Error updating menu'});
    }
};

//@ts-expect-error
export const destroyById: RequestHandler = async (request: IGetMenuReq, response: Response) => {
    try {
        const results = await menuServices.deleteById(<number>(<unknown>request.params.id))
        response.status(200).json({ status: results?.affectedRows })
    } catch (error) {
        console.error("[menu.controller.ts][destroy][error]: ", error);
        response.status(500).json({message: 'Error destroying menu'});
    }
};