import { mysql_db_execute } from "@/database/mysql/mysql.database";
import { IHouseOrder } from "@/models/HouseOrder.model";
import houseOrderQueries from "@/queries/mysql/houseOrder.queries";

export const fetchAll = (): Promise<IHouseOrder[][] | null> => {
    try {
        return mysql_db_execute<Promise<IHouseOrder[][]>>(houseOrderQueries.selectAll, []);
    } catch (error) {
        console.error("[houseOrder.services.ts][fetchAll][error]: ", error);
        return Promise.reject(null);
    }
};

export const fetchByLocationId = (locationId: number): Promise<IHouseOrder[][] | null> => {
    try {
        return mysql_db_execute<Promise<IHouseOrder[][]>>(houseOrderQueries.selectAllByLocationId, [locationId]);
    } catch (error) {
        console.error("[houseOrder.services.ts][fetchByLocationId][error]: ", error);
        return Promise.reject(null);
    }
};

export const store = (houseOrder: IHouseOrder): Promise<{affectedRows: number, insertId: number} | null> => {
    try {
        return mysql_db_execute<Promise<{affectedRows: number, insertId: number}>>(houseOrderQueries.insert, 
            [houseOrder.table_id, houseOrder.employee_id, houseOrder.location_id]);
    } catch (error) {
        console.error("[houseOrder.services.ts][store][error]: ", error);
        return Promise.reject(null);
    }
};

export const updateStatus = (id: number, status: 'queue' | 'pending' |'complete'): Promise<{affectedRows: number} | null> => {
    try {
        return mysql_db_execute<Promise<{affectedRows: number}>>(houseOrderQueries.updateStatusById, 
            [status, id]);
    } catch (error) {
        console.error("[houseOrder.services.ts][updateStatus][error]: ", error);
        return Promise.reject(null);
    }
};