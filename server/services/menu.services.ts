import { mysql_db_execute } from "@/database/mysql/mysql.database";
import { IMenu } from "@/models/Menu.model";
import menuQueries from "@/queries/mysql/menu.queries";

export const fetchAll = (): Promise<IMenu[][] | null> => {
    try {
        return mysql_db_execute<Promise<IMenu[][]>>(menuQueries.selectAll, []);
    } catch (error) {
        console.error("[menu.services.ts][fetchAll][error]:", error);
        return Promise.reject(null);
    }
};

export const fetchByLocationId = (locationId: number): Promise<IMenu[][] | null> => {
    try {
        return mysql_db_execute<Promise<IMenu[][]>>(menuQueries.selectAllByLocationId, [locationId]);
    } catch (error) {
        console.error("[menu.services.ts][fetchByLocationId][error]:", error);
        return Promise.reject(null);
    }
};

export const store = (menu: IMenu): Promise<{affectedRows: number} | null> => {
    try {
        return mysql_db_execute<Promise<{affectedRows: number}>>(menuQueries.insert, 
            [menu.name, menu.description, menu.image_uri]);
    } catch (error) {
        console.error("[menu.services.ts][store][error]:", error);
        return Promise.reject(null);
    }
};

export const updateById = (menu: IMenu): Promise<{affectedRows: number} | null> => {
    try {
        return mysql_db_execute<Promise<{affectedRows: number}>>(menuQueries.updateById, 
            [menu.name, menu.description, menu.image_uri, menu.id]);
    } catch (error) {
        console.error("[menu.services.ts][updateById][error]:", error);
        return Promise.reject(null);
    }
};

export const deleteById = (id: number): Promise<{affectedRows: number} | null> => {
    try {
        return mysql_db_execute<Promise<{affectedRows: number}>>(menuQueries.deleteById, [id]);
    } catch (error) {
        console.error("[menu.services.ts][deleteById][error]:", error);
        return Promise.reject(null);
    }
};