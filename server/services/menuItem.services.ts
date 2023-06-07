import { mysql_db_execute } from "@/database/mysql/mysql.database";
import { IMenuItem } from "@/models/MenuItem.model";
import menuItemsQueries from "@/queries/mysql/menuItems.queries";

export const fetchById = (id: number) : Promise<IMenuItem[][] | null> => {
    try {
        return mysql_db_execute<Promise<IMenuItem[][]>>(menuItemsQueries.selectById, [id]);
    } catch (error) {
        console.error('[menuItem.services.ts][fetchById][error]:', error);
        return Promise.reject(null);
    }
};

export const store = (menuItem: IMenuItem): Promise<{affectedRows: number} | null> => {
    try {
        return mysql_db_execute<Promise<{affectedRows: number}>>(menuItemsQueries.insert, 
            [menuItem.menu_id, menuItem.name, menuItem.description, menuItem.image_uri, menuItem.price]);
    } catch (error) {
        console.error("[menuItem.services.ts][store][error]:", error);
        return Promise.reject(null);
    }
};

export const updateById = (menuItem: IMenuItem): Promise<{affectedRows: number} | null> => {
    try {
        return mysql_db_execute<Promise<{affectedRows: number}>>(menuItemsQueries.updateById, 
            [menuItem.menu_id, menuItem.name, menuItem.description, menuItem.image_uri, menuItem.price, menuItem.id]);
    } catch (error) {
        console.error("[menuItem.services.ts][updateById][error]:", error);
        return Promise.reject(null);
    }
};

export const deleteById = (id: number): Promise<{affectedRows: number} | null> => {
    try {
        return mysql_db_execute<Promise<{affectedRows: number}>>(menuItemsQueries.deleteById, [id]);
    } catch (error) {
        console.error("[menuItem.services.ts][deleteById][error]:", error);
        return Promise.reject(null);
    }
};