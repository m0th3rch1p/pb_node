import { IAddHouseOrderReq, IGetHouseOrderReq, IHouseOrder, IUpdateHouseOrderReq } from "@/models/HouseOrder.model";
import { Request, Response, RequestHandler } from "express";
import * as houseOrderServices from "@/services/houseOrder.services";
import * as houseOrderItemServices from "@/services/houseOrderItems.services";

export const index: RequestHandler = async (request: Request, response: Response) => {
    try {
        const results = await houseOrderServices.fetchAll();
        response.status(200).json({ houseOrders: results });
    } catch (error) {
        console.error("[houseOrder.controller.ts][index][error]: ", error);
        response.status(500).json({message: 'Error fetching houseOrder'});
    }
};

export const store: RequestHandler = async (request: IAddHouseOrderReq, response: Response) => {
    try {
        const houseOrder: IHouseOrder = request.body;

        let results = await houseOrderServices.store(houseOrder);
        
        // Insert House Order Items
        let order_items = new Array();
        request.body.house_order_items.forEach((item: []) => {
            order_items.push([results?.insertId, ...item]);
        });

        await houseOrderItemServices.store(<[[number, number, number, number, number]]>order_items);
        response.status(200).json({status: results?.affectedRows});
    } catch (error) {
        console.error("[houseOrder.controller.ts][store][error]: ", error);
        response.status(500).json({message: 'Error storing houseOrder'});
    }
};

//@ts-expect-error
export const updateById: RequestHandler = async (request: IUpdateHouseOrderReq, response: Response) => {
    try {

    } catch (error) {
        console.error("[houseOrder.controller.ts][update][error]: ", error);
        response.status(500).json({message: 'Error updating houseOrder'});
    }
};

//@ts-expect-error
export const destroyById: RequestHandler = async (request: IGetHouseOrderReq, response: Response) => {
    try {
        
    } catch (error) {
        console.error("[houseOrder.controller.ts][destroy][error]: ", error);
        response.status(500).json({message: 'Error destroying houseOrder'});
    }
};