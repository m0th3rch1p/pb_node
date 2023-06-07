import { mysql_db_execute } from "@/database/mysql/mysql.database";
import { ICustomer } from "@/models/Customer.model";
import customerQueries from "@/queries/mysql/customer.queries";

export const fetchAll = (): Promise<ICustomer[][] | null> => {
    try {
        return mysql_db_execute<Promise<ICustomer[][]>>(customerQueries.selectAll, []);
    } catch (error) {
        console.error(`[customer.services.ts][fetchAll][error]: `, error);
        return Promise.reject(null);
    }
};

export const register = (customer: ICustomer): Promise<{affectedRows: number}> => {
    try {
        return mysql_db_execute<Promise<{affectedRows: number}>>(customerQueries.register, [customer.email, customer.password]);        
    } catch (error) {
        console.error(`[customer.services.ts][register][error]: `, error);
        return Promise.reject(null);
    }
};

export const authenticate = (customer: ICustomer): Promise<ICustomer[][] | null> => {
    try {
        return mysql_db_execute<Promise<ICustomer[][]>>(customerQueries.register, [customer.email]);        
    } catch (error) {
        console.error(`[customer.services.ts][authenticate][error]: `, error);
        return Promise.reject(null);
    }
};