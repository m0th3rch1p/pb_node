import { mysql_db_execute } from "@/database/mysql/mysql.database";
import { IReservation } from "@/models/Reservation.model";
import reservationQueries from "@/queries/mysql/reservation.queries";

export const fetchAll = (): Promise<IReservation[][] | null> => {
    try {
        return mysql_db_execute<Promise<IReservation[][]>>(reservationQueries.selectAll, []);
    } catch (error) {
        console.error("[reservation.services.ts][fetchAll][error]: ", error);
        return Promise.reject(null);
    }
};

export const fetchByLocationId = (locationId: number): Promise<IReservation[][] | null> => {
    try {
        return mysql_db_execute<Promise<IReservation[][]>>(reservationQueries.selectAllByLocationId, [locationId]);
    } catch (error) {
        console.error("[reservation.services.ts][fetchByLocationId][error]: ", error);
        return Promise.reject(null);
    }
};

export const store = (reservation: IReservation): Promise<{affectedRows: number} | null> => {
    try {
        return mysql_db_execute<Promise<{affectedRows: number}>>(reservationQueries.insert, 
            [reservation.customer_id, reservation.location_id, reservation.date_time]);
    } catch (error) {
        console.error("[reservation.services.ts][fetchByLocationId][error]: ", error);
        return Promise.reject(null);
    }
};