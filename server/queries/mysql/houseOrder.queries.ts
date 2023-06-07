export default {
    insert:
    `INSERT INTO house_orders (
        table_id,
        employee_id,
        location_id,
    ) VALUES (?, ?, ?)`,
    selectAll: 
    `SELECT 
        ho.total, 
        ho.payment_method, 
        ho.payment_status,
        l.name as house_location,
        e.first_name as waiter_first_name,
        e.last_name as waiter_last_name, 
    FROM house_orders ho
    INNER JOIN (locations l, employees e) ON (
        l.id = ho.location_id,
        e.id = ho.employee_id
    )`,
    selectAllByLocationId: 
    `SELECT 
        ho.total, 
        ho.payment_method, 
        ho.payment_status,
        l.name as house_location,
        e.first_name as waiter_first_name,
        e.last_name as waiter_last_name, 
    FROM house_orders ho
    INNER JOIN (locations l, employees e) ON (
        l.id = ho.location_id,
        e.id = ho.employee_id
    ) WHERE l.id = ?`,
    updateStatusById: 
    `UPDATE house_orders ho SET ho.status=? WHERE ho.id=?`
};