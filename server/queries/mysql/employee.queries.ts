export default {
    selectAll: 
    `SELECT 
        e.employee_no, 
        e.first_name, 
        e.last_name, 
        e.email, 
        e.phone_number, 
        e.role,
        l.name 
    FROM employees e
    INNER JOIN locations l ON l.id = e.location_id`,
    selectById:
    `SELECT 
        e.employee_no, 
        e.first_name, 
        e.last_name, 
        e.email, 
        e.phone_number, 
        e.role,
        l.name 
    FROM employees e
    INNER JOIN locations l ON l.id = e.location_id
    WHERE e.id = ?`,
    register: 
    `INSERT INTO employees (
        employee_no, 
        first_name, 
        last_name, 
        email, 
        phone_number, 
        password, 
        role, 
        location_id
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    authenticate:
    `SELECT id, password, role FROM employees e`,
};