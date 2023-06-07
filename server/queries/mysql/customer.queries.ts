export default {
    selectAll: `SELECT email, created_at FROM customers c`,
    authenticate: 'SELECT id, password FROM customers c WHERE c.email = ?',
    register: 'INSERT INTO customers (email, password) VALUES (?, ?)'
};