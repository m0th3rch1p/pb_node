import { mysql_db_execute } from "@/database/mysql/mysql.database";
import { ICustomerAddress } from "@/models/CustomerAddress.model";
import customerAddressQueries from "@/queries/mysql/customerAddress.queries";

export const fetchAll = (): Promise<ICustomerAddress[] | null> => {
    try {
        return mysql_db_execute<Promise<ICustomerAddress[]>>(customerAddressQueries.selectAll, []);
    } catch (error) {
        console.error("[customerAddress][fetchAll][error]: ", error);
        return Promise.reject(null);
    }
};

export const fetchById = (id: number): Promise<ICustomerAddress[] | null> => {
    try {
        return mysql_db_execute<Promise<ICustomerAddress[]>>(customerAddressQueries.selectById, [id]);
    } catch (error) {
        console.error("[customerAddress][fetchById][error]: ", error);
        return Promise.reject(null);
    }
};

export const fetchByCustomerId = (customerId: number): Promise<ICustomerAddress[] | null> => {
    try {
        return mysql_db_execute<Promise<ICustomerAddress[]>>(customerAddressQueries.selectByCustomerId, [customerId]);
    } catch (error) {
        console.error("[customerAddress][fetchByCustomerId][error]: ", error);
        return Promise.reject(null);
    }
};

export const store = (customerAddress: ICustomerAddress): Promise<{affectedRows: number} | null> => {
    try {
        return mysql_db_execute<Promise<{affectedRows: number}>>(customerAddressQueries.insert, [customerAddress.customer_id, customerAddress.city, customerAddress.address]);
    } catch (error) {
        console.error("[customerAddress][store][error]: ", error);
        return Promise.reject(null);
    }
};

export const deleteById = (id: number): Promise<{affectedRows: number} | null> => {
    try {
        return mysql_db_execute<Promise<{affectedRows: number}>>(customerAddressQueries.deleteById, [id]);
    } catch (error) {
        console.error("[customerAddress][deleteById][error]: ", error);
        return Promise.reject(null);
    }
};