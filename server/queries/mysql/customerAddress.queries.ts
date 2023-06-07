export default {
    selectAll: 
    `SELECT ca.city, ca.address, c.email as customer_email FROM customer_addresses ca 
    INNER JOIN customers c ON c.id = ca.customer_id`,
    selectById:
    `SELECT ca.city, ca.address FRLM customer_addresses ca WHERE ca.id=?`,
    selectByCustomerId: 
    'SELECT city, address FROM customer_addresses ca WHERE ca.customer_id=?',
    insert: 
    'INSERT INTO customer_addresses (customer_id, city, address) VALUES (?, ?, ?)',
    deleteById: 
    'DELETE FROM customer_addresses ca WHERE ca.id=?'
};