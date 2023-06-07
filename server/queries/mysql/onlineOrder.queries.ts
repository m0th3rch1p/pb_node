export default {
    selectAll: `
    SELECT c.email, ca.city, ca.address FROM online_orders oo
    INNER JOIN customers c ON c.id = oo.customer_id
    INNER JOIN customer_addresses cs ON cs.id = oo.customer_address_id`,
    insert: `
    INSERT INTO online_orders (customer_id, customer_address_id) VALUES (?,?)`,
};