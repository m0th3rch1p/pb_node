import { mysql_db_execute } from "@/database/mysql/mysql.database";
import { IEmployee } from "@/models/Employee.model";
import employeeQueries from "@/queries/mysql/employee.queries";

export const fetchAll = (): Promise<IEmployee[] | null> => {
    try {
        return mysql_db_execute<Promise<IEmployee[]>>(employeeQueries.selectAll, []);
    } catch (error) {
        console.error("[employee.services.ts][fetchAll][error]: ", error);
        return Promise.reject(null);
    }
};

export const fetchById = (id: number): Promise<IEmployee[] | null> => {
    try {
        return mysql_db_execute<Promise<IEmployee[]>>(employeeQueries.selectById, [id]);
    } catch (error) {
        console.error("[employee.services.ts][fetchById][error]: ", error);
        return Promise.reject(null);
    }
};

export const register = (employee: IEmployee): Promise<{affectedRows: number} | null> => {
    try {
        return mysql_db_execute<Promise<{affectedRows: number}>>(employeeQueries.register, 
            [employee.employee_no, employee.first_name, employee.last_name, employee.email, employee.phone_number, employee.password, employee.role, employee.location_id]);
    } catch (error) {
        console.error("[employee.services.ts][register][error]: ", error);
        return Promise.reject(null);
    }
};

export const authenticate = (employee: IEmployee) => {
    try {
        return mysql_db_execute<Promise<IEmployee[]>>(employeeQueries.authenticate, [employee.email]);
    } catch (error) {
        console.error("[employee.services.ts][authenticate][error]: ", error);
        return Promise.reject(null);
    }
};