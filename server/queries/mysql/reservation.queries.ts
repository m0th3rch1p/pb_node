export default {
    selectAll: `
    SELECT c.email, l.name, l.location, r.date_time FROM reservations r
    INNER JOIN (customers c, locations l) ON (c.id = r.customer_id, l.id = r.location_id)`,
    selectAllByLocationId: `
    SELECT c.email, l.name, l.location, r.date_time FROM reservations r
    INNER JOIN (customers c, locations l) ON (c.id = r.customer_id, l.id = r.location_id)
    WHERE r.location_id = ?`,
    insert: `INSERT INTO reservations (customer_id, location_id, date_time) VALUES (?, ?, ?)`,
};