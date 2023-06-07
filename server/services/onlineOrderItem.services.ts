import { mysql_db_execute } from "@/database/mysql/mysql.database";
import { IOnlineOrderItem } from "@/models/OnlineOrderItem.model";
import onlineOrderItemQueries from "@/queries/mysql/onlineOrderItem.queries";

export const store = (onlineOrderItems: [[IOnlineOrderItem["online_order_id"], IOnlineOrderItem["menu_item_id"], IOnlineOrderItem["quantity"], IOnlineOrderItem["price"]]]) => {
    try {
        return mysql_db_execute<Promise<{affectedRows: number}>>(onlineOrderItemQueries.insert, onlineOrderItems);      
    } catch (error) {
        console.error("[onlineOrderItem.services.ts][store][error]: ", error);
        Promise.reject(null);  
    }
};