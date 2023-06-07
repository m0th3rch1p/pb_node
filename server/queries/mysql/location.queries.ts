export default {
    selectAll:
    `SELECT name, phone_number, city, country FROM locations`,
    insert: 
    `INSERT INTO locations (name, phone_number, city, country) VALUES (?,?,?,?)`,
    updateById:
    `UPDATE locations l SET 
        l.name=?, 
        l.phone_number=?, 
        l.city=?, 
        l.country=?
    WHERE l.id=?`,
    deleteById:
    `DELETE FROM locations l WHERE l.id=?`
};