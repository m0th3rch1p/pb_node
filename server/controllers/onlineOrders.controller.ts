import { IAddOnlineOrderReq, IGetOnlineOrderReq, IOnlineOrder, IUpdateOnlineOrderReq } from "@/models/OnlineOrder.model";
import { Request, Response, RequestHandler } from "express";
import * as onlineOrderServices from '@/services/onlineOrder.services';
import { store as storeOnlineOrderItem } from "@/services/onlineOrderItem.services";
import { fetchById as fetchByIdMenuItem } from "@/services/menuItem.services";

export const index: RequestHandler = async (request: Request, response: Response) => {
    try {
        const results = await onlineOrderServices.fetchAll();
        if (!results) throw new Error();
        
        const [ onlineOrders ] = results;
        response.status(200).json({ onlineOrders });
    } catch (error) {
        console.error("[onlineOrders.controller.ts][index][error]: ", error);
        response.status(500).json({message: 'Error fetching onlineOrders'});
    }
};

export const store: RequestHandler = async (request: IAddOnlineOrderReq, response: Response) => {
    try {
        const onlineOrder: IOnlineOrder = {
            customer_id: <number>request.session.user_id,
            customer_address_id: request.body.customer_address_id
        };

        const results = await onlineOrderServices.store(onlineOrder);
        if (results?.affectedRows) {
            // menu items input [{ menuItemId, quantity }]
            //@ts-expect-error
            const orderItems: [[number, number, number, number]] = [];
            request.body.orderItems.forEach(async (item: {menuItemId: number, quantity: number}) => {
                const menuItemResults = await fetchByIdMenuItem(item.menuItemId);
                if (menuItemResults) {
                    const [ menuItemArr ] = menuItemResults;
                    const price = menuItemArr[0].price;

                    orderItems.push([results.insertId, item.menuItemId, item.quantity, item.quantity * price]);    
                }
            });

            await storeOnlineOrderItem(orderItems);
            response.status(200).json({ status: results.affectedRows });
        } else throw new Error();
    } catch (error) {
        console.error("[onlineOrders.controller.ts][store][error]: ", error);
        response.status(500).json({message: 'Error storing onlineOrders'});
    }
};

//@ts-expect-error
export const updateById: RequestHandler = async (request: IUpdateOnlineOrderReq, response: Response) => {
    try {
        
    } catch (error) {
        console.error("[onlineOrders.controller.ts][update][error]: ", error);
        response.status(500).json({message: 'Error updating onlineOrders'});
    }
};

//@ts-expect-error
export const destroyById: RequestHandler = async (request: IGetOnlineOrderReq, response: Response) => {
    try {
        
    } catch (error) {
        console.error("[onlineOrders.controller.ts][destroy][error]: ", error);
        response.status(500).json({message: 'Error destroying onlineOrders'});
    }
};