import { IAddMenuItemReq, IGetMenuItemReq, IUpdateMenuItemReq } from "@/models/MenuItem.model";
import { Request, Response, RequestHandler } from "express";

import * as menuItemServices from '@/services/menuItem.services';

export const index: RequestHandler = async (request: Request, response: Response) => {
    try {
        
    } catch (error) {
        console.error("[menuItem.controller.ts][index][error]: ", error);
        response.status(500).json({message: 'Error fetching menuItem'});
    }
};

export const store: RequestHandler = async (request: IAddMenuItemReq, response: Response) => {
    try {
        const results = await menuItemServices.store(request.body);
        response.status(200).json({ status: results?.affectedRows })
    } catch (error) {
        console.error("[menuItem.controller.ts][store][error]: ", error);
        response.status(500).json({message: 'Error storing menuItem'});
    }
};

//@ts-expect-error
export const updateById: RequestHandler = async (request: IUpdateMenuItemReq, response: Response) => {
    try {
        const results = await menuItemServices.updateById({...request.params, ...request.body});
        response.status(200).json({ status: results?.affectedRows })
    } catch (error) {
        console.error("[menuItem.controller.ts][update][error]: ", error);
        response.status(500).json({message: 'Error updating menuItem'});
    }
};

//@ts-expect-error
export const destroyById: RequestHandler = async (request: IGetMenuItemReq, response: Response) => {
    try {
        const results = await menuItemServices.deleteById(<number>(<unknown>request.params.id))
        response.status(200).json({ status: results?.affectedRows })
    } catch (error) {
        console.error("[menuItem.controller.ts][destroy][error]: ", error);
        response.status(500).json({message: 'Error destroying menuItem'});
    }
};