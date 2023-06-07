import { ILocation } from '@/models/Location.model';
import { mysql_db_execute } from '@/database/mysql/mysql.database';
import locationQueries from '@/queries/mysql/location.queries';

export const fetchAll = (): Promise<ILocation[][] | null> => {
    try {
        return mysql_db_execute<Promise<ILocation[][]>>(locationQueries.selectAll, []);
    } catch (error) {
        console.error("[location.services.ts][fetchAll][error]: ", error);
        return Promise.reject(null);
    }
};

export const store = (location: ILocation): Promise<{affectedRows: number} | null> => {
    try {
        return mysql_db_execute<Promise<{affectedRows: number}>>(locationQueries.insert, 
            [location.name, location.phone_number, location.city, location.country]);
    } catch (error) {
        console.error("[location.services.ts][store][error]: ", error);
        return Promise.reject(null);
    }
};

export const updateById = (location: ILocation): Promise<{affectedRows: number} | null> => {
    try {
        return mysql_db_execute<Promise<{affectedRows: number}>>(locationQueries.updateById, 
            [location.name, location.phone_number, location.city, location.country, location.id]);
    } catch (error) {
        console.error("[location.services.ts][updateById][error]: ", error);
        return Promise.reject(null);
    }
};