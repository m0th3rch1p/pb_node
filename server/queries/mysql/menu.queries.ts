export default {
    insert: `INSERT INTO menus (name, description, image_uri) VALUES (?,?,?)`,
    selectAll: `SELECT name, description, image_uri FROM menus m`,
    selectAllByLocationId: `SELECT name, description, image_uri FROM menus m WHERE m.id=?`,
    updateById: `UPDATE menus m SET m.name=?, m.description=? WHERE m.id=?`,
    deleteById: `DELETE FROM menus m WHERE m.id=?`,
    updateMenuImageById: `UPDATE menus m SET m.image_uri=? WHERE m.id=?`
};