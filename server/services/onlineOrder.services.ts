import { mysql_db_execute } from "@/database/mysql/mysql.database";
import { IOnlineOrder } from "@/models/OnlineOrder.model";
import onlineOrderQueries from "@/queries/mysql/onlineOrder.queries";

export const fetchAll = () => {
    try {
        return mysql_db_execute<Promise<IOnlineOrder[][]>>(onlineOrderQueries.selectAll, []);
    } catch (error) {
        console.log("[onlineOrder.services.ts][store][error]: ", error);
        return Promise.reject(null);
    }
}

export const store = (onlineOrder: IOnlineOrder) : Promise<{affectedRows: number, insertId: number} | null> => {
    try {
        return mysql_db_execute<Promise<{affectedRows: number, insertId: number}>>(onlineOrderQueries.insert, 
            [onlineOrder.customer_id, onlineOrder.customer_address_id]);
    } catch (error) {
        console.log("[onlineOrder.services.ts][store][error]: ", error);
        return Promise.reject(null);
    }
};