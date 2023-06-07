import { mysql_db_execute } from "@/database/mysql/mysql.database";
import { IHouseOrderItem } from "@/models/HouseOrderItem.model";
import houseOrderItemQueries from "@/queries/mysql/houseOrderItem.queries";

export const fetchAllByHouseOrderId = (houseOrderId: number): Promise<IHouseOrderItem[][] | null> => {
    try {
        return mysql_db_execute<Promise<IHouseOrderItem[][]>>(houseOrderItemQueries.selectAllByHouseOrderId, [houseOrderId]);
    } catch (error) {
        console.error("[houseOrderItems.services.ts][fetchByHouseOrderId][error]: ", error);
        return Promise.reject(null);
    }
};

export const store = (houseOrderItems: [[IHouseOrderItem["id"], IHouseOrderItem["house_order_id"], IHouseOrderItem["menu_item_id"], IHouseOrderItem["price"], IHouseOrderItem["quantity"]]]): Promise<{affectedRows: number} | null> => {
    try {
        return mysql_db_execute<Promise<{affectedRows: number}>>(houseOrderItemQueries.insert, houseOrderItems);
    } catch (error) {
        console.error("[houseOrderItems.services.ts][store][error]: ", error);
        return Promise.reject(null);
    }
};